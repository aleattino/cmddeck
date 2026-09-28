import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { CloseIcon, RecentIcon, SearchIcon, SettingsIcon, StarIcon, WorkflowIcon } from './components/Icons';
import {
  allSnippets,
  categoryBySlug,
  dataCategories,
  migrateLegacyCommands,
  slugify,
  snippetsById,
  workflows,
} from './data';
import { DISTROS, detectOS, modKeyLabel } from './lib/os';
import { matchingDistro, matches, queryTerms } from './lib/search';
import { copyText } from './lib/clipboard';
import { readJSON, readString, removeKey, writeJSON, writeString } from './lib/storage';
import { getConsent, setConsent as persistConsent } from './lib/analytics';
import { withViewTransition } from './lib/motion';
import {
  DEFAULT_PREFERENCES,
  PREFERENCES_KEY,
  PreferencesContext,
  SETTINGS_SECTION_IDS,
  loadPreferences,
  sanitizePreferences,
} from './lib/preferences';
import { useMediaQuery } from './hooks/useMediaQuery';
import { CommandCard } from './components/CommandCard';
import { CommandPalette } from './components/CommandPalette';
import { WorkflowsDialog } from './components/WorkflowsDialog';
import { SettingsDialog } from './components/SettingsDialog';
import { ConfirmDialog } from './components/ConfirmDialog';
import { OSSelector } from './components/OSSelector';
import { CategorySelect, CategorySidebar } from './components/CategoryNav';
import { CookieConsent } from './components/CookieConsent';
import { LegalDialog } from './components/LegalDialog';
import { SiteFooter } from './components/SiteFooter';
import { Toast } from './components/Toast';
import { Kbd } from './components/Kbd';

const FAVORITES_KEY = 'cmddeckFavorites';
const RECENT_KEY = 'cmddeckRecent';
const PROGRESS_KEY = 'cmddeckWorkflowProgress';
const OS_KEY = 'selectedOS';
const RECENT_LIMIT = 12;
const SPECIAL = ['All', 'Favorites', 'Recent'];
// Only the first cards get their own view transition: enough to cover the
// viewport without snapshotting the whole list.
const MORPHING_CARDS = 24;

function loadIds(key, legacyKey) {
  const stored = readJSON(key, null);
  if (Array.isArray(stored)) return stored.filter((id) => typeof id === 'string');
  const migrated = migrateLegacyCommands(readJSON(legacyKey, []));
  writeJSON(key, migrated);
  removeKey(legacyKey);
  return migrated;
}

function loadProgress() {
  const stored = readJSON(PROGRESS_KEY, {});
  return stored && typeof stored === 'object' && !Array.isArray(stored) ? stored : {};
}

function readUrl() {
  const params = new URLSearchParams(window.location.search);
  const settings = params.get('settings');
  return {
    category: categoryBySlug.get(params.get('category') ?? '') ?? 'All',
    query: params.get('q') ?? '',
    settings: SETTINGS_SECTION_IDS.includes(settings) ? settings : null,
  };
}

function writeUrl({ category, query, settings }, mode) {
  const params = new URLSearchParams();
  if (category !== 'All') params.set('category', slugify(category));
  if (query.trim()) params.set('q', query.trim());
  if (settings) params.set('settings', settings);
  const search = params.toString();
  const url = `${window.location.pathname}${search ? `?${search}` : ''}`;
  if (url === `${window.location.pathname}${window.location.search}`) return;
  window.history[mode === 'push' ? 'pushState' : 'replaceState'](null, '', url);
}

const isTypingTarget = (element) =>
  element instanceof HTMLElement &&
  (element.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName));

const transitionNameFor = (id) => `card-${id.replace(/[^a-z0-9-]/gi, '-')}`;

function mergeProgress(current, incoming) {
  const result = { ...current };
  for (const [id, steps] of Object.entries(incoming ?? {})) {
    if (!Array.isArray(steps)) continue;
    const valid = steps.filter((step) => Number.isInteger(step) && step >= 0);
    result[id] = [...new Set([...(result[id] ?? []), ...valid])].sort((a, b) => a - b);
  }
  return result;
}

export default function App() {
  const initial = useMemo(readUrl, []);
  const [category, setCategory] = useState(initial.category);
  const [query, setQuery] = useState(initial.query);
  const [settingsSection, setSettingsSection] = useState(initial.settings);
  const [favorites, setFavorites] = useState(() => loadIds(FAVORITES_KEY, 'favorites'));
  const [recent, setRecent] = useState(() => loadIds(RECENT_KEY, 'recentCommands'));
  const [progress, setProgress] = useState(loadProgress);
  const [prefs, setPrefs] = useState(loadPreferences);

  const detected = useMemo(detectOS, []);
  const [osChoice, setOsChoice] = useState(() => {
    const saved = readString(OS_KEY);
    return DISTROS.includes(saved) ? saved : null;
  });
  const selectedOS = osChoice ?? (DISTROS.includes(detected) ? detected : null);
  const commandOS = selectedOS ?? 'ubuntu';

  const [paletteOpen, setPaletteOpen] = useState(false);
  const [workflowsOpen, setWorkflowsOpen] = useState(false);
  const [legalDoc, setLegalDoc] = useState(null);
  const [consent, setConsent] = useState(getConsent);
  const [confirm, setConfirm] = useState({ open: false });

  const [toast, setToast] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);
  const toastTimer = useRef();
  const copiedTimer = useRef();

  const hasKeyboard = useMediaQuery('(hover: hover) and (pointer: fine)');
  const systemReduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const searchRef = useRef(null);
  const settingsButtonRef = useRef(null);

  const motionReduced = prefs.motion === 'off' || (prefs.motion === 'system' && systemReduced);

  // Before paint, so the first frame already uses the right motion and text size.
  useLayoutEffect(() => {
    document.documentElement.dataset.motion = motionReduced ? 'reduced' : 'full';
    document.documentElement.dataset.text = prefs.textSize;
  }, [motionReduced, prefs.textSize]);

  useEffect(() => writeJSON(FAVORITES_KEY, favorites), [favorites]);
  useEffect(() => writeJSON(RECENT_KEY, recent), [recent]);
  useEffect(() => writeJSON(PROGRESS_KEY, progress), [progress]);
  useEffect(() => writeJSON(PREFERENCES_KEY, prefs), [prefs]);

  useEffect(() => {
    document.title = category === 'All' ? 'CmdDeck: Linux command reference' : `${category} · CmdDeck`;
  }, [category]);

  useEffect(() => {
    const onPopState = () => {
      const next = readUrl();
      withViewTransition(() =>
        flushSync(() => {
          setCategory(next.category);
          setQuery(next.query);
        })
      );
      setSettingsSection(next.settings);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((open) => !open);
        return;
      }
      if (
        event.key === '/' &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey &&
        !isTypingTarget(event.target) &&
        !document.querySelector('dialog[open]')
      ) {
        event.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(
    () => () => {
      clearTimeout(toastTimer.current);
      clearTimeout(copiedTimer.current);
    },
    []
  );

  // List changes run as view transitions: cards glide to their new places.
  const selectCategory = (next) => {
    if (next === category) return;
    withViewTransition(() =>
      flushSync(() => {
        setCategory(next);
        if (window.scrollY > 0) window.scrollTo({ top: 0 });
      })
    );
    writeUrl({ category: next, query, settings: settingsSection }, 'push');
  };

  const changeQuery = (next, { animate = false } = {}) => {
    const apply = () => setQuery(next);
    if (animate) withViewTransition(() => flushSync(apply));
    else apply();
    writeUrl({ category, query: next, settings: settingsSection }, 'replace');
  };

  const openSettings = (section) => {
    setSettingsSection(section);
    writeUrl({ category, query, settings: section }, 'replace');
  };

  const showToast = useCallback((message, tone = 'success') => {
    clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), message, tone });
    toastTimer.current = setTimeout(() => setToast(null), tone === 'error' ? 4000 : 2200);
  }, []);

  const askToConfirm = (snippet, text) =>
    new Promise((resolve) => setConfirm({ open: true, snippet, text, resolve }));

  const closeConfirm = (answer) => {
    confirm.resolve?.(answer);
    setConfirm((current) => ({ ...current, open: false, resolve: null }));
  };

  // Returns whether the text reached the clipboard, so callers can react.
  const handleCopy = useCallback(
    async (snippet, text, key = snippet?.id) => {
      if (prefs.confirmDanger && snippet?.dangerLevel === 'danger' && !(await askToConfirm(snippet, text))) {
        return false;
      }
      const ok = await copyText(text);
      if (!ok) {
        showToast('Couldn’t copy. Select the command and copy it manually.', 'error');
        return false;
      }
      clearTimeout(copiedTimer.current);
      setCopiedKey(key);
      copiedTimer.current = setTimeout(() => setCopiedKey(null), 1800);
      showToast('Copied to clipboard');
      if (snippet) setRecent((current) => [snippet.id, ...current.filter((id) => id !== snippet.id)].slice(0, RECENT_LIMIT));
      return true;
    },
    [prefs.confirmDanger, showToast]
  );

  const toggleFavorite = useCallback(
    (id) => {
      const update = () =>
        setFavorites((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
      // In the Favorites view the card leaves the list, so let the rest close the gap.
      if (category === 'Favorites') withViewTransition(() => flushSync(update));
      else update();
    },
    [category]
  );

  const chooseOS = (distro) => {
    setOsChoice(distro);
    writeString(OS_KEY, distro);
  };

  const resetOS = () => {
    setOsChoice(null);
    removeKey(OS_KEY);
  };

  const answerConsent = (value) => {
    persistConsent(value);
    setConsent(value);
  };

  const setPref = (key, value) => setPrefs((current) => sanitizePreferences({ ...current, [key]: value }));

  const exportData = () => {
    const payload = {
      app: 'cmddeck',
      format: 1,
      exportedAt: new Date().toISOString(),
      favorites,
      recent,
      workflowProgress: progress,
      preferences: prefs,
      distro: osChoice,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cmddeck-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const importData = async (file) => {
    try {
      const data = JSON.parse(await file.text());
      if (data?.app !== 'cmddeck') return { tone: 'error', text: 'That file isn’t a CmdDeck export.' };
      const known = (ids) => (Array.isArray(ids) ? ids.filter((id) => snippetsById.has(id)) : []);
      const newFavorites = known(data.favorites).filter((id) => !favorites.includes(id));
      setFavorites((current) => [...current, ...newFavorites]);
      setRecent((current) => [...new Set([...known(data.recent), ...current])].slice(0, RECENT_LIMIT));
      setProgress((current) => mergeProgress(current, data.workflowProgress));
      if (data.preferences) setPrefs(sanitizePreferences(data.preferences));
      if (DISTROS.includes(data.distro)) chooseOS(data.distro);
      return {
        tone: 'success',
        text: `Imported. ${newFavorites.length} new favorite${newFavorites.length === 1 ? '' : 's'}, settings and progress merged.`,
      };
    } catch {
      return { tone: 'error', text: 'Couldn’t read that file. Choose a JSON file exported from CmdDeck.' };
    }
  };

  const clearData = (kind) => {
    if (kind === 'recent' || kind === 'all') setRecent([]);
    if (kind === 'favorites' || kind === 'all') setFavorites([]);
    if (kind === 'progress' || kind === 'all') setProgress({});
    if (kind === 'all') {
      setPrefs({ ...DEFAULT_PREFERENCES });
      resetOS();
    }
    const labels = { recent: 'Recent commands cleared', favorites: 'Favorites removed', progress: 'Workflow progress reset', all: 'Everything reset' };
    showToast(labels[kind]);
  };

  const favoriteSnippets = useMemo(() => favorites.map((id) => snippetsById.get(id)).filter(Boolean), [favorites]);
  const recentSnippets = useMemo(() => recent.map((id) => snippetsById.get(id)).filter(Boolean), [recent]);
  const favoriteSet = useMemo(() => new Set(favorites), [favorites]);

  const counts = useMemo(() => {
    const result = { All: allSnippets.length, Favorites: favoriteSnippets.length, Recent: recentSnippets.length };
    for (const name of dataCategories) result[name] = 0;
    for (const snippet of allSnippets) result[snippet.category] += 1;
    return result;
  }, [favoriteSnippets, recentSnippets]);

  const terms = useMemo(() => queryTerms(query), [query]);
  const inCategory = useMemo(() => {
    if (category === 'All') return allSnippets;
    if (category === 'Favorites') return favoriteSnippets;
    if (category === 'Recent') return recentSnippets;
    return allSnippets.filter((snippet) => snippet.category === category);
  }, [category, favoriteSnippets, recentSnippets]);
  const visible = useMemo(() => inCategory.filter((snippet) => matches(snippet, terms)), [inCategory, terms]);

  const searching = terms.length > 0;
  const showCategory = SPECIAL.includes(category);
  const categoryLabel = category === 'All' ? 'All commands' : category;
  const countLabel = searching
    ? `${visible.length} of ${inCategory.length} ${inCategory.length === 1 ? 'command' : 'commands'}`
    : `${inCategory.length} ${inCategory.length === 1 ? 'command' : 'commands'}`;
  const stats = {
    favorites: favoriteSnippets.length,
    recent: recentSnippets.length,
    workflows: Object.values(progress).filter((steps) => steps.length > 0).length,
  };

  return (
    <PreferencesContext.Provider value={prefs}>
      <div className={`flex min-h-screen flex-col ${consent === null ? 'pb-48 sm:pb-32' : ''}`}>
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-accent px-3 py-2 text-sm font-semibold text-canvas focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
        >
          Skip to commands
        </a>

        <header className="sticky top-0 z-20 border-b border-line-muted bg-canvas">
          <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6">
            <a
              href="./"
              onClick={(event) => {
                event.preventDefault();
                selectCategory('All');
                if (query) changeQuery('');
              }}
              className="shrink-0 rounded font-mono text-lg font-bold tracking-tight text-accent"
              aria-label="CmdDeck, show all commands"
            >
              <span className="text-fg-muted">&gt;</span> CmdDeck
              <span className="blinking-cursor" aria-hidden="true">
                _
              </span>
            </a>
            <p className="hidden truncate text-sm text-fg-subtle xl:block">Your deck of ready-to-use Linux commands</p>

            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPaletteOpen(true)}
                className="hidden h-9 w-60 items-center gap-2 rounded-lg border border-line bg-surface px-3 text-sm text-fg-subtle transition-colors hover:border-fg-subtle hover:text-fg-muted md:inline-flex"
              >
                <SearchIcon size={15} aria-hidden="true" />
                <span className="flex-1 text-left">Quick copy…</span>
                <span className="flex items-center gap-1" aria-hidden="true">
                  <Kbd>{modKeyLabel()}</Kbd>
                  <Kbd>K</Kbd>
                </span>
              </button>
              <OSSelector selected={selectedOS} detected={detected} onSelect={chooseOS} />
              <button
                type="button"
                onClick={() => setWorkflowsOpen(true)}
                aria-label="Workflows"
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-line px-2.5 text-sm text-fg transition-colors hover:border-fg-subtle"
              >
                <WorkflowIcon size={16} aria-hidden="true" className="text-fg-muted" />
                <span className="hidden sm:inline">Workflows</span>
              </button>
              <button
                ref={settingsButtonRef}
                type="button"
                onClick={() => openSettings('system')}
                aria-label="Settings"
                title="Settings"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-fg-muted transition-colors hover:border-fg-subtle hover:text-fg"
              >
                <SettingsIcon size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </header>

        <div className="mx-auto flex w-full max-w-7xl flex-1 gap-8 px-4 sm:px-6">
          <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 overflow-y-auto py-6 pr-1 md:block">
            <CategorySidebar selected={category} counts={counts} onSelect={selectCategory} />
          </aside>

          <main id="main" className="min-w-0 flex-1 pb-12 pt-5 md:pt-6">
            <div className="mb-4 md:hidden">
              <CategorySelect selected={category} counts={counts} onSelect={selectCategory} />
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h1
                style={{ viewTransitionName: 'page-title' }}
                className="sr-only md:not-sr-only md:text-2xl md:font-semibold md:tracking-tight md:text-fg"
              >
                {categoryLabel}
              </h1>
              <div className="flex items-center gap-3">
                <p className="text-sm tabular-nums text-fg-subtle" aria-live="polite">
                  {countLabel}
                </p>
                {category === 'Recent' && recentSnippets.length > 0 && !searching && (
                  <button
                    type="button"
                    onClick={() => withViewTransition(() => flushSync(() => setRecent([])))}
                    className="rounded text-sm text-fg-subtle underline-offset-4 transition-colors hover:text-fg hover:underline"
                  >
                    Clear history
                  </button>
                )}
              </div>
            </div>

            <div className="relative mt-3 md:mt-4">
              <SearchIcon
                size={17}
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-fg-subtle"
              />
              <input
                ref={searchRef}
                type="text"
                inputMode="search"
                enterKeyHint="search"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
                aria-label={`Filter ${categoryLabel}`}
                placeholder={`Filter ${category === 'All' ? 'commands' : category}…`}
                value={query}
                onChange={(event) => changeQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Escape' && query) {
                    event.preventDefault();
                    changeQuery('');
                  }
                }}
                className="h-11 w-full rounded-lg border border-line bg-surface pl-10 pr-10 text-[0.9375rem] text-fg placeholder:text-fg-subtle focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/25"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    changeQuery('', { animate: true });
                    searchRef.current?.focus();
                  }}
                  aria-label="Clear filter"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-fg-subtle transition-colors hover:bg-surface-raised hover:text-fg"
                >
                  <CloseIcon size={16} aria-hidden="true" />
                </button>
              )}
            </div>

            {visible.length > 0 ? (
              <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
                {visible.map((snippet, index) => (
                  <CommandCard
                    key={snippet.id}
                    transitionName={index < MORPHING_CARDS ? transitionNameFor(snippet.id) : undefined}
                    snippet={snippet}
                    os={matchingDistro(snippet, terms, commandOS)}
                    showCategory={showCategory}
                    isFavorite={favoriteSet.has(snippet.id)}
                    onToggleFavorite={toggleFavorite}
                    copiedKey={copiedKey}
                    onCopy={handleCopy}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                category={category}
                query={query}
                searching={searching}
                onClearQuery={() => changeQuery('', { animate: true })}
                onSearchAll={() => selectCategory('All')}
              />
            )}
          </main>
        </div>

        <SiteFooter
          onAbout={() => openSettings('about')}
          onSettings={() => openSettings('system')}
          onPrivacy={() => setLegalDoc('privacy')}
          onCookies={() => setLegalDoc('cookies')}
        />

        <CookieConsent
          open={consent === null}
          onAccept={() => answerConsent('accepted')}
          onDecline={() => answerConsent('declined')}
          onLearnMore={() => setLegalDoc('cookies')}
        />

        <CommandPalette
          open={paletteOpen}
          onClose={() => setPaletteOpen(false)}
          snippets={allSnippets}
          recentIds={recent}
          os={commandOS}
          onCopy={handleCopy}
          showHints={hasKeyboard}
        />
        <WorkflowsDialog
          open={workflowsOpen}
          onClose={() => setWorkflowsOpen(false)}
          workflows={workflows}
          copiedKey={copiedKey}
          onCopy={handleCopy}
          progress={progress}
          setProgress={setProgress}
        />
        <SettingsDialog
          section={settingsSection}
          onSectionChange={openSettings}
          onClose={() => openSettings(null)}
          prefs={prefs}
          setPref={setPref}
          systemReduced={systemReduced}
          selectedOS={selectedOS}
          detected={detected}
          osIsChosen={osChoice !== null}
          onChooseOS={chooseOS}
          onResetOS={resetOS}
          stats={stats}
          onExport={exportData}
          onImport={importData}
          onClear={clearData}
          consent={consent}
          onConsentChange={answerConsent}
          onOpenLegal={setLegalDoc}
          commandCount={allSnippets.length}
          workflowCount={workflows.length}
        />
        <ConfirmDialog
          open={confirm.open}
          title={`Copy “${confirm.snippet?.title ?? ''}”?`}
          body="This command is marked Danger: it can delete data or change your system with no undo."
          detail={confirm.text}
          confirmLabel="Copy anyway"
          onConfirm={() => closeConfirm(true)}
          onCancel={() => closeConfirm(false)}
        />
        <LegalDialog document={legalDoc} onClose={() => setLegalDoc(null)} />
        <Toast toast={toast} />
      </div>
    </PreferencesContext.Provider>
  );
}

function EmptyState({ category, query, searching, onClearQuery, onSearchAll }) {
  let Icon = SearchIcon;
  let title = `No commands match “${query.trim()}”`;
  let body = category === 'All' ? 'Try another word, or describe the task, like “free space”.' : `Nothing in ${category} matches.`;

  if (!searching && category === 'Favorites') {
    Icon = StarIcon;
    title = 'No favorites yet';
    body = 'Tap the star on any command to keep it here.';
  } else if (!searching && category === 'Recent') {
    Icon = RecentIcon;
    title = 'Nothing copied yet';
    body = 'Commands you copy show up here, most recent first.';
  }

  return (
    <div className="mt-5 flex flex-col items-center rounded-xl border border-dashed border-line px-6 py-14 text-center">
      <Icon size={22} aria-hidden="true" className="text-fg-subtle" />
      <p className="mt-3 font-medium text-fg">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-fg-muted">{body}</p>
      {searching && (
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {category !== 'All' && (
            <button
              type="button"
              onClick={onSearchAll}
              className="h-9 rounded-md border border-line bg-surface-raised px-3.5 text-sm font-medium text-fg transition-colors hover:border-fg-subtle"
            >
              Search all categories
            </button>
          )}
          <button
            type="button"
            onClick={onClearQuery}
            className="h-9 rounded-md px-3.5 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
          >
            Clear filter
          </button>
        </div>
      )}
    </div>
  );
}
