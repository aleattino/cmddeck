import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { AppearanceIcon, BackIcon, ComputerIcon, DiskIcon, ForwardIcon, InfoIcon, KeyboardIcon, LinkIcon, SettingsIcon, ShieldIcon, TerminalIcon } from './Icons';
import { Modal, ModalHeader } from './Modal';
import { Segmented } from './Segmented';
import { Switch } from './Switch';
import { Kbd } from './Kbd';
import { DistroLogo } from './DistroLogo';
import { useIndicator } from '../hooks/useIndicator';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { DISTROS, DISTRO_LABELS, modKeyLabel } from '../lib/os';
import { ease, play, reducedMotion } from '../lib/motion';

const SETTINGS_SECTIONS = [
  { id: 'system', label: 'System', icon: ComputerIcon },
  { id: 'commands', label: 'Commands', icon: TerminalIcon },
  { id: 'appearance', label: 'Appearance', icon: AppearanceIcon },
  { id: 'data', label: 'Your data', icon: DiskIcon },
  { id: 'privacy', label: 'Privacy', icon: ShieldIcon },
  { id: 'shortcuts', label: 'Shortcuts', icon: KeyboardIcon },
  { id: 'about', label: 'About', icon: InfoIcon },
];

const DISTRO_OPTIONS = DISTROS.map((distro) => ({
  value: distro,
  label: DISTRO_LABELS[distro],
  icon: <DistroLogo distro={distro} size={14} />,
}));

// ---------- building blocks: GNOME-style boxed lists ----------

function Group({ title, children }) {
  return (
    <section className="mt-6 first:mt-0">
      {title && <h3 className="mb-2 px-1 text-sm font-semibold text-fg">{title}</h3>}
      <div className="divide-y divide-line-muted rounded-xl border border-line-muted bg-surface-sunken/40 px-4">
        {children}
      </div>
    </section>
  );
}

function Row({ title, description, children, stacked = false }) {
  const id = useId();
  return (
    <div
      className={`flex gap-x-6 gap-y-3 py-3.5 ${
        stacked ? 'flex-col' : 'flex-col sm:flex-row sm:items-center sm:justify-between'
      }`}
    >
      <div className="min-w-0">
        <p id={`${id}-title`} className="text-sm font-medium text-fg">
          {title}
        </p>
        {description && (
          <p id={`${id}-desc`} className="mt-0.5 text-[0.8125rem] leading-snug text-fg-muted">
            {description}
          </p>
        )}
      </div>
      <div className="shrink-0">
        {typeof children === 'function' ? children({ labelledBy: `${id}-title`, describedBy: `${id}-desc` }) : children}
      </div>
    </div>
  );
}

function ActionButton({ onClick, children, tone = 'default' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-8 rounded-md border px-3 text-sm font-medium transition-colors duration-150 ${
        tone === 'danger'
          ? 'border-danger/50 bg-danger/15 text-danger hover:bg-danger/25'
          : 'border-line bg-surface text-fg hover:border-fg-subtle'
      }`}
    >
      {children}
    </button>
  );
}

// Destructive actions ask twice: the first click arms, the second acts.
function ConfirmButton({ label, confirmLabel, onConfirm }) {
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    if (!armed) return undefined;
    const timer = setTimeout(() => setArmed(false), 4000);
    return () => clearTimeout(timer);
  }, [armed]);
  return (
    <ActionButton
      tone={armed ? 'danger' : 'default'}
      onClick={() => {
        if (armed) {
          setArmed(false);
          onConfirm();
        } else {
          setArmed(true);
        }
      }}
    >
      {armed ? confirmLabel : label}
    </ActionButton>
  );
}

// ---------- sections ----------

function SystemSection({ selectedOS, detected, osIsChosen, onChooseOS, onResetOS }) {
  const detectedLabel =
    detected === 'not-linux'
      ? 'Not Linux (macOS, Windows, phone or tablet)'
      : detected === 'unknown'
        ? 'Linux, distribution not reported by the browser'
        : DISTRO_LABELS[detected];
  return (
    <Group>
      <Row title="Distribution" description="Package commands in every card follow this. The menu in the header changes it too." stacked>
        <Segmented label="Distribution" value={selectedOS} options={DISTRO_OPTIONS} onChange={onChooseOS} size="md" />
      </Row>
      <Row title="Detected system" description={detectedLabel}>
        {osIsChosen ? <ActionButton onClick={onResetOS}>Use automatic</ActionButton> : <span className="text-sm text-fg-subtle">In use</span>}
      </Row>
    </Group>
  );
}

function CommandsSection({ prefs, setPref }) {
  return (
    <Group>
      <Row title="Ask before copying dangerous commands" description="Shows a confirmation for commands marked Danger, like rm -rf.">
        {(ids) => <Switch checked={prefs.confirmDanger} onChange={(value) => setPref('confirmDanger', value)} {...ids} />}
      </Row>
      <Row title="Open explanations by default" description="Command breakdowns start expanded on the cards that have one.">
        {(ids) => (
          <Switch checked={prefs.explanationsOpen} onChange={(value) => setPref('explanationsOpen', value)} {...ids} />
        )}
      </Row>
      <Row title="Card density" description="Compact hides descriptions, so more commands fit on screen.">
        <Segmented
          label="Card density"
          value={prefs.density}
          onChange={(value) => setPref('density', value)}
          options={[
            { value: 'comfortable', label: 'Comfortable' },
            { value: 'compact', label: 'Compact' },
          ]}
        />
      </Row>
    </Group>
  );
}

function AppearanceSection({ prefs, setPref, systemReduced }) {
  const motionHelp = {
    system: systemReduced
      ? 'Following your system, which asks for reduced motion: only quick fades.'
      : 'Following your system: windows, menus and lists animate.',
    on: 'Windows, menus and lists always animate, even if your system asks for less motion.',
    off: 'Only quick fades. Nothing moves or scales.',
  }[prefs.motion];
  return (
    <Group>
      <Row title="Motion" description={motionHelp}>
        <Segmented
          label="Motion"
          value={prefs.motion}
          onChange={(value) => setPref('motion', value)}
          options={[
            { value: 'system', label: 'System' },
            { value: 'on', label: 'On' },
            { value: 'off', label: 'Off' },
          ]}
        />
      </Row>
      <Row title="Text size" description="Scales all text and controls.">
        <Segmented
          label="Text size"
          value={prefs.textSize}
          onChange={(value) => setPref('textSize', value)}
          options={[
            { value: 'default', label: 'Default' },
            { value: 'large', label: 'Large' },
          ]}
        />
      </Row>
    </Group>
  );
}

function DataSection({ stats, onExport, onImport, onClear }) {
  const fileRef = useRef(null);
  const [message, setMessage] = useState(null);
  const plural = (count, word) => `${count} ${word}${count === 1 ? '' : 's'}`;

  const importFile = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    setMessage(await onImport(file));
  };

  return (
    <>
      <Group>
        <Row
          title="Saved in this browser"
          description={`${plural(stats.favorites, 'favorite')} · ${plural(stats.recent, 'recent command')} · ${plural(
            stats.workflows,
            'workflow'
          )} in progress`}
        />
        <Row title="Export" description="Downloads favorites, recent commands, workflow progress and settings as a JSON file.">
          <ActionButton onClick={onExport}>Export</ActionButton>
        </Row>
        <Row title="Import" description="Merges a CmdDeck export into what you already have.">
          <>
            <ActionButton onClick={() => fileRef.current?.click()}>Import…</ActionButton>
            <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={importFile} />
          </>
        </Row>
      </Group>
      {message && (
        <p role="status" className={`mt-2 px-1 text-[0.8125rem] ${message.tone === 'error' ? 'text-danger' : 'text-accent'}`}>
          {message.text}
        </p>
      )}
      <Group title="Clear">
        <Row title="Recent commands" description="Empties the Recent list.">
          <ConfirmButton label="Clear" confirmLabel="Clear recent" onConfirm={() => onClear('recent')} />
        </Row>
        <Row title="Favorites" description="Removes every star.">
          <ConfirmButton label="Remove" confirmLabel="Remove all" onConfirm={() => onClear('favorites')} />
        </Row>
        <Row title="Workflow progress" description="Unticks every step you marked as done.">
          <ConfirmButton label="Reset" confirmLabel="Reset progress" onConfirm={() => onClear('progress')} />
        </Row>
        <Row title="Everything" description="Also resets these settings and your distribution. Your cookie choice is kept.">
          <ConfirmButton label="Reset all" confirmLabel="Reset everything" onConfirm={() => onClear('all')} />
        </Row>
      </Group>
    </>
  );
}

function PrivacySection({ consent, onConsentChange, onOpenLegal }) {
  return (
    <>
      <Group>
        <Row
          title="Usage analytics"
          description={`Google Analytics, loaded only while this is on. It tells us which commands are useful.${
            consent === null ? ' You haven’t chosen yet.' : ''
          }`}
        >
          {(ids) => (
            <Switch
              checked={consent === 'accepted'}
              onChange={(value) => onConsentChange(value ? 'accepted' : 'declined')}
              {...ids}
            />
          )}
        </Row>
      </Group>
      <Group title="Policies">
        <Row title="Privacy Policy" description="What we collect, why, and your rights.">
          <ActionButton onClick={() => onOpenLegal('privacy')}>Open</ActionButton>
        </Row>
        <Row title="Cookie Policy" description="Every cookie and browser-storage key CmdDeck uses.">
          <ActionButton onClick={() => onOpenLegal('cookies')}>Open</ActionButton>
        </Row>
      </Group>
    </>
  );
}

function ShortcutsSection() {
  const mod = modKeyLabel();
  const rows = [
    ['Quick copy', [[mod, 'K'], ['/']]],
    ['Move through results', [['↑'], ['↓']]],
    ['Copy the selected command', [['Enter']]],
    ['Close a dialog or menu', [['Esc']]],
    ['Clear the filter field', [['Esc']]],
    ['Switch distro or option', [['←'], ['→']]],
  ];
  return (
    <Group>
      {rows.map(([action, combos]) => (
        <div key={action} className="flex items-center justify-between gap-4 py-3">
          <span className="text-sm text-fg">{action}</span>
          <span className="flex items-center gap-1.5 text-xs text-fg-subtle">
            {combos.map((keys, index) => (
              <span key={keys.join('+')} className="flex items-center gap-1">
                {index > 0 && <span className="mx-0.5">or</span>}
                {keys.map((key) => (
                  <Kbd key={key}>{key}</Kbd>
                ))}
              </span>
            ))}
          </span>
        </div>
      ))}
    </Group>
  );
}

const LINKS = [
  { label: 'Source on GitHub', href: 'https://github.com/aleattino/cmddeck' },
  { label: 'Changelog', href: 'https://github.com/aleattino/cmddeck/blob/main/CHANGELOG.md' },
  { label: 'Report an issue', href: 'https://github.com/aleattino/cmddeck/issues' },
];

function AboutSection({ commandCount, workflowCount }) {
  return (
    <>
      <div className="flex items-center gap-4 rounded-xl border border-line-muted bg-surface-sunken/40 p-4">
        <img src="/favicon.svg" alt="" width="48" height="48" className="shrink-0" />
        <div className="min-w-0">
          <p className="font-mono text-lg font-bold text-accent">
            <span className="text-fg-muted">&gt;</span> CmdDeck
          </p>
          <p className="text-sm text-fg-muted">Your deck of ready-to-use Linux commands.</p>
          <p className="mt-1 text-[0.8125rem] tabular-nums text-fg-subtle">
            Version {__APP_VERSION__} · {commandCount} commands · {workflowCount} workflows
          </p>
        </div>
      </div>
      <Group title="Links">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between py-3 text-sm text-fg transition-colors duration-150 hover:text-accent"
          >
            {link.label}
            <LinkIcon size={14} aria-hidden="true" className="text-fg-subtle" />
          </a>
        ))}
      </Group>
      <Group title="Credits">
        <Row title="Made by Alessandro Attino" description="© 2025, released under the MIT License." />
        <Row title="Typeface" description="Atkinson Hyperlegible Next and Mono, by the Braille Institute." />
        <Row title="Icons" description="Adwaita symbolic icons by the GNOME Project, LGPL-3.0 or CC BY-SA 3.0." />
        <Row title="Logos" description="Ubuntu, Fedora, Arch Linux and Flatpak logos belong to their owners." />
      </Group>
    </>
  );
}

// ---------- dialog ----------

export function SettingsDialog({ section, onSectionChange, onClose, ...props }) {
  const titleId = useId();
  const isWide = useMediaQuery('(min-width: 768px)');
  const open = section !== null;
  // Keep the last section on screen while the window closes.
  const lastSection = useRef('system');
  if (section) lastSection.current = section;
  const [mobileDetail, setMobileDetail] = useState(false);
  const listRef = useRef(null);
  const detailRef = useRef(null);
  const previous = useRef(null);

  const active = section ?? lastSection.current;
  const showList = isWide || !mobileDetail;
  const showDetail = isWide || mobileDetail;

  useEffect(() => {
    if (open) setMobileDetail(window.matchMedia('(min-width: 768px)').matches || section !== 'system');
    // Only when the window opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useLayoutEffect(() => {
    const key = `${active}:${mobileDetail}`;
    const from = previous.current;
    previous.current = key;
    detailRef.current?.scrollTo({ top: 0 });
    if (!open || !from || from === key) return;
    const target = showDetail ? detailRef.current : listRef.current;
    if (!target) return;
    if (reducedMotion() || isWide) {
      play(target, [{ opacity: 0 }, { opacity: 1 }], { duration: 120, easing: ease.out });
      return;
    }
    const offset = mobileDetail ? '16px' : '-16px';
    play(target, [{ transform: `translateX(${offset})`, opacity: 0 }, { transform: 'none', opacity: 1 }], {
      duration: 220,
      easing: ease.out,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, mobileDetail]);

  const { box, animate } = useIndicator(listRef, '[aria-current="page"]', [active, showList, isWide]);
  const current = SETTINGS_SECTIONS.find((item) => item.id === active);

  const select = (id) => {
    onSectionChange(id);
    setMobileDetail(true);
  };

  return (
    <Modal open={open} onClose={onClose} labelledBy={titleId} className="max-w-4xl">
      <div className="flex h-[min(88vh,44rem)] flex-col">
        <ModalHeader id={titleId} icon={SettingsIcon} title="Settings" onClose={onClose} />
        <div className="grid min-h-0 flex-1 md:grid-cols-[13.5rem_1fr]">
          {showList && (
            <nav ref={listRef} aria-label="Settings sections" className="relative min-h-0 overflow-y-auto p-2 md:border-r md:border-line-muted">
              {box && isWide && (
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-0 rounded-lg bg-surface-raised ${animate ? 'glide' : ''}`}
                  style={{ width: box.width, height: box.height, transform: `translate(${box.x}px, ${box.y}px)` }}
                />
              )}
              <ul className="space-y-0.5">
                {SETTINGS_SECTIONS.map((item) => {
                  const isCurrent = isWide && item.id === active;
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => select(item.id)}
                        aria-current={isCurrent ? 'page' : undefined}
                        className={`relative flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors duration-150 ${
                          isCurrent ? 'font-medium text-fg' : 'text-fg-muted hover:bg-surface-raised/50 hover:text-fg'
                        }`}
                      >
                        <Icon size={16} aria-hidden="true" className={isCurrent ? 'text-accent' : 'text-fg-subtle'} />
                        <span className="flex-1">{item.label}</span>
                        {!isWide && <ForwardIcon size={16} aria-hidden="true" className="text-fg-subtle" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}

          {showDetail && (
            <section
              ref={detailRef}
              aria-labelledby={`${titleId}-section`}
              className="min-h-0 overflow-y-auto px-5 py-5 sm:px-6"
            >
              {!isWide && (
                <button
                  type="button"
                  onClick={() => setMobileDetail(false)}
                  className="-ml-1.5 mb-3 inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-sm text-fg-muted transition-colors hover:text-fg"
                >
                  <BackIcon size={16} aria-hidden="true" />
                  Settings
                </button>
              )}
              <h3 id={`${titleId}-section`} className="mb-4 text-lg font-semibold text-fg">
                {current.label}
              </h3>
              {active === 'system' && <SystemSection {...props} />}
              {active === 'commands' && <CommandsSection {...props} />}
              {active === 'appearance' && <AppearanceSection {...props} />}
              {active === 'data' && <DataSection {...props} />}
              {active === 'privacy' && <PrivacySection {...props} />}
              {active === 'shortcuts' && <ShortcutsSection />}
              {active === 'about' && <AboutSection {...props} />}
            </section>
          )}
        </div>
      </div>
    </Modal>
  );
}
