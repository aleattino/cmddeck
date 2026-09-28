import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { CloseIcon, SearchIcon } from './Icons';
import { Modal } from './Modal';
import { Kbd } from './Kbd';
import { DangerBadge } from './DangerBadge';
import { matchingDistro, matches, queryTerms, score } from '../lib/search';
import { resolveCommand } from '../lib/commands';
import { DISTRO_LABELS } from '../lib/os';

function buildGroups(snippets, query, recentIds) {
  const terms = queryTerms(query);
  if (terms.length === 0) {
    const recent = recentIds.map((id) => snippets.find((s) => s.id === id)).filter(Boolean);
    const recentSet = new Set(recent.map((s) => s.id));
    const rest = snippets.filter((s) => !recentSet.has(s.id));
    return [
      ...(recent.length ? [{ label: 'Recent', items: recent }] : []),
      { label: recent.length ? 'All commands' : null, items: rest },
    ];
  }
  const found = snippets
    .map((snippet, order) => ({ snippet, order }))
    .filter(({ snippet }) => matches(snippet, terms))
    .sort((a, b) => score(b.snippet, terms) - score(a.snippet, terms) || a.order - b.order)
    .map(({ snippet }) => snippet);
  return [{ label: null, items: found }];
}

export function CommandPalette({ open, onClose, snippets, recentIds, os, onCopy, showHints }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const optionRefs = useRef([]);
  const titleId = useId();
  const listId = useId();

  // Every opening starts fresh.
  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
    }
  }, [open]);

  const groups = useMemo(() => buildGroups(snippets, query, recentIds), [snippets, query, recentIds]);
  const flat = useMemo(() => groups.flatMap((group) => group.items), [groups]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    optionRefs.current[active]?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const terms = useMemo(() => queryTerms(query), [query]);
  const distroFor = (snippet) => matchingDistro(snippet, terms, os);

  const choose = (snippet) => {
    if (!snippet) return;
    onCopy(snippet, resolveCommand(snippet, distroFor(snippet)));
    onClose();
  };

  const onKeyDown = (event) => {
    if (flat.length === 0) return;
    const last = flat.length - 1;
    const moves = {
      ArrowDown: active >= last ? 0 : active + 1,
      ArrowUp: active <= 0 ? last : active - 1,
      PageDown: Math.min(active + 8, last),
      PageUp: Math.max(active - 8, 0),
    };
    if (event.key in moves) {
      event.preventDefault();
      setActive(moves[event.key]);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      choose(flat[active]);
    }
  };

  let index = -1;

  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy={titleId}
      initialFocusRef={inputRef}
      placement="top"
      className="max-w-2xl"
    >
      <div className="flex max-h-[inherit] flex-col">
        <h2 id={titleId} className="sr-only">
          Quick copy
        </h2>
        <div className="flex items-center gap-3 border-b border-line-muted px-4">
          <SearchIcon size={18} className="shrink-0 text-fg-subtle" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={flat.length ? `${listId}-${active}` : undefined}
            aria-autocomplete="list"
            aria-label="Search commands"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search commands, then press Enter to copy"
            className="h-14 min-w-0 flex-1 bg-transparent text-base text-fg placeholder:text-fg-subtle focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 rounded-md p-1.5 text-fg-subtle transition-colors hover:bg-surface-raised hover:text-fg"
          >
            <CloseIcon size={18} aria-hidden="true" />
          </button>
        </div>

        <div id={listId} role="listbox" aria-label="Commands" className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2">
          {flat.length === 0 && (
            <div className="px-4 py-10 text-center">
              <p className="text-sm text-fg">No commands match “{query.trim()}”.</p>
              <p className="mt-1 text-sm text-fg-subtle">Try a command name like tar, or what you want to do, like “disk space”.</p>
            </div>
          )}
          {groups.map((group) => (
            <div key={group.label ?? 'results'} role="presentation">
              {group.label && group.items.length > 0 && (
                <p role="presentation" className="px-2.5 pb-1 pt-2 text-xs font-medium text-fg-subtle">
                  {group.label}
                </p>
              )}
              {group.items.map((snippet) => {
                index += 1;
                const i = index;
                const selected = i === active;
                const distro = distroFor(snippet);
                return (
                  <div
                    key={`${group.label}-${snippet.id}`}
                    id={`${listId}-${i}`}
                    ref={(node) => {
                      optionRefs.current[i] = node;
                    }}
                    role="option"
                    aria-selected={selected}
                    onMouseMove={() => !selected && setActive(i)}
                    onClick={() => choose(snippet)}
                    className={`flex cursor-pointer items-start gap-3 rounded-lg px-2.5 py-2 ${
                      selected ? 'bg-accent/10' : ''
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium text-fg">
                          {snippet.title}
                        </span>
                        <DangerBadge level={snippet.dangerLevel} compact />
                      </div>
                      <code className="mt-0.5 block truncate font-mono text-xs text-fg-subtle">
                        {resolveCommand(snippet, distro)}
                        {snippet.variants && distro !== os && (
                          <span className="ml-2 font-sans text-fg-muted">({DISTRO_LABELS[distro]})</span>
                        )}
                      </code>
                    </div>
                    <span className="hidden shrink-0 pt-0.5 text-xs text-fg-subtle sm:block">{snippet.category}</span>
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 shrink-0 font-mono text-[0.6875rem] text-accent ${selected ? 'opacity-100' : 'opacity-0'}`}
                    >
                      Enter
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-line-muted px-4 py-2.5 text-xs text-fg-subtle">
          {showHints ? (
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5">
                <Kbd>↑</Kbd>
                <Kbd>↓</Kbd>
                Navigate
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Kbd>Enter</Kbd>
                Copy
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Kbd>Esc</Kbd>
                Close
              </span>
            </div>
          ) : (
            <span>Tap a command to copy it</span>
          )}
          <span className="tabular-nums">
            {flat.length} {flat.length === 1 ? 'command' : 'commands'}
          </span>
        </div>
      </div>
    </Modal>
  );
}
