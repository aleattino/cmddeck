import { useEffect, useId, useRef, useState } from 'react';
import { EditIcon, QuestionIcon, StarIcon, StarOutlineIcon, UndoIcon } from './Icons';
import { DISTROS } from '../lib/os';
import { hasCustomValues, resolveCommand } from '../lib/commands';
import { CommandLine } from './CommandLine';
import { CustomizeDialog } from './CustomizeDialog';
import { DangerBadge } from './DangerBadge';
import { DistroLogo } from './DistroLogo';
import { Segmented } from './Segmented';
import { pop } from '../lib/motion';
import { usePreferences } from '../lib/preferences';

const SHORT_LABELS = { ubuntu: 'Ubuntu', fedora: 'Fedora', arch: 'Arch' };
const FULL_LABELS = { ubuntu: 'Ubuntu / Debian', fedora: 'Fedora / RHEL', arch: 'Arch Linux' };

const DISTRO_OPTIONS = DISTROS.map((distro) => ({
  value: distro,
  label: SHORT_LABELS[distro],
  title: FULL_LABELS[distro],
  icon: <DistroLogo distro={distro} size={12} />,
}));

export function CommandCard({ snippet, os, showCategory, isFavorite, onToggleFavorite, copiedKey, onCopy, transitionName }) {
  const { explanationsOpen, density } = usePreferences();
  const compact = density === 'compact';
  const [distro, setDistro] = useState(os);
  const [values, setValues] = useState({});
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [explainOpen, setExplainOpen] = useState(explanationsOpen);
  const starRef = useRef(null);
  const explanationId = useId();
  const closeTimer = useRef();
  const customizeRef = useRef(null);

  // Follow the global distro whenever the visitor changes it.
  useEffect(() => setDistro(os), [os]);
  useEffect(() => setExplainOpen(explanationsOpen), [explanationsOpen]);

  // Settle the star once it has switched to the filled icon.
  const wasFavorite = useRef(isFavorite);
  useEffect(() => {
    if (isFavorite && !wasFavorite.current) pop(starRef.current);
    wasFavorite.current = isFavorite;
  }, [isFavorite]);
  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const command = resolveCommand(snippet, distro, values);
  const customized = Boolean(snippet.commandTemplate) && hasCustomValues(values);
  const copied = copiedKey === snippet.id;
  const note = snippet.variants ? snippet.variantNotes?.[distro] : null;

  const copy = () => onCopy(snippet, command);

  const copyFromDialog = async () => {
    const ok = await onCopy(snippet, command);
    if (ok) {
      clearTimeout(closeTimer.current);
      closeTimer.current = setTimeout(() => setCustomizeOpen(false), 450);
    }
  };

  return (
    <article
      style={transitionName ? { viewTransitionName: transitionName } : undefined}
      className={`flex flex-col rounded-xl border border-line-muted bg-surface transition-colors duration-150 hover:border-line ${
        compact ? 'p-3' : 'p-4'
      }`}
    >
      <header className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-[0.9375rem] font-semibold leading-snug text-fg">{snippet.title}</h3>
          {(showCategory || snippet.dangerLevel) && (
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              {showCategory && <span className="text-xs text-fg-subtle">{snippet.category}</span>}
              <DangerBadge level={snippet.dangerLevel} />
            </div>
          )}
        </div>
        <div className="-mr-1.5 -mt-1 flex items-center">
          {snippet.explanation && (
            <button
              type="button"
              onClick={() => setExplainOpen((open) => !open)}
              aria-expanded={explainOpen}
              aria-controls={explanationId}
              aria-label="Explain this command"
              title="Explain this command"
              className={`rounded-md p-1.5 transition-colors hover:bg-surface-raised ${
                explainOpen ? 'text-accent' : 'text-fg-subtle hover:text-fg'
              }`}
            >
              <QuestionIcon size={17} aria-hidden="true" />
            </button>
          )}
          <button
            type="button"
            onClick={() => onToggleFavorite(snippet.id)}
            aria-pressed={isFavorite}
            aria-label={isFavorite ? `Remove “${snippet.title}” from favorites` : `Add “${snippet.title}” to favorites`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className="rounded-md p-1.5 transition-colors hover:bg-surface-raised"
          >
{isFavorite ? (
              <StarIcon ref={starRef} className="text-caution" />
            ) : (
              <StarOutlineIcon ref={starRef} className="text-fg-muted" />
            )}
          </button>
        </div>
      </header>

      {!compact && <p className="mt-2 text-sm leading-relaxed text-fg-muted">{snippet.description}</p>}

      {snippet.explanation && (
        <div
          className="disclosure"
          data-open={explainOpen}
          {...(explainOpen ? {} : { inert: '' })}
        >
          <div>
            <dl
              id={explanationId}
              className="mt-3 grid grid-cols-[auto_1fr] items-baseline gap-x-4 gap-y-2 rounded-lg border border-line-muted bg-surface-sunken/60 px-3 py-2.5"
            >
              {snippet.explanation.parts.map((part) => (
                <div key={part.text} className="contents">
                  <dt className="whitespace-nowrap font-mono text-[0.78125rem] text-accent">{part.text}</dt>
                  <dd className="text-[0.8125rem] leading-snug text-fg-muted">{part.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}

      <div className={`mt-auto space-y-2.5 ${compact ? 'pt-3' : 'pt-4'}`}>
        {snippet.variants && (
          <Segmented label="Distribution" value={distro} options={DISTRO_OPTIONS} onChange={setDistro} />
        )}
        <CommandLine command={command} copied={copied} onCopy={copy} />
        {note && <p className="text-xs leading-relaxed text-fg-subtle">{note}</p>}
        {snippet.interactive && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <button
              ref={customizeRef}
              type="button"
              onClick={() => setCustomizeOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-md py-1 text-sm font-medium text-fg-muted transition-colors hover:text-accent"
            >
              <EditIcon size={14} aria-hidden="true" />
              {customized ? 'Edit values' : 'Customize'}
            </button>
            {customized && (
              <button
                type="button"
                onClick={() => setValues({})}
                className="inline-flex items-center gap-1.5 rounded-md py-1 text-sm text-fg-subtle transition-colors hover:text-fg"
              >
                <UndoIcon size={13} aria-hidden="true" />
                Back to example
              </button>
            )}
          </div>
        )}
      </div>

      {snippet.interactive && (
        <CustomizeDialog
          open={customizeOpen}
          onClose={() => setCustomizeOpen(false)}
          snippet={snippet}
          values={values}
          onChange={(param, value) => setValues((current) => ({ ...current, [param]: value }))}
          onReset={() => setValues({})}
          command={command}
          copied={copied}
          onCopy={copyFromDialog}
          returnFocusRef={customizeRef}
        />
      )}
    </article>
  );
}
