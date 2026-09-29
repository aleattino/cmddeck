import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  BackIcon,
  BackupIcon,
  CheckIcon,
  ForwardIcon,
  ImportantIcon,
  LockIcon,
  NetworkActivityIcon,
  GaugeIcon,
  PackageIcon,
  RevertIcon,
  TrashIcon,
  UndoIcon,
  WorkflowIcon,
} from './Icons';
import { Modal, ModalHeader } from './Modal';
import { CommandLine } from './CommandLine';
import { CopyButton } from './CopyButton';
import { DangerBadge } from './DangerBadge';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { shellArg } from '../lib/shell';
import { paramStates, resolveCommand } from '../lib/workflow';
import { ease, play, pop, reducedMotion } from '../lib/motion';
import { SelectionGlide } from './SelectionGlide';

// Workflow data names its icon; these are the Adwaita glyphs behind each name.
const ICONS = {
  Activity: GaugeIcon,
  AlertCircle: ImportantIcon,
  Archive: BackupIcon,
  Container: PackageIcon,
  Globe: NetworkActivityIcon,
  Lock: LockIcon,
  Save: RevertIcon,
  Trash2: TrashIcon,
};
const DIFFICULTY = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' };
const NO_VALUES = {};
const NO_ITEMS = [];

function WorkflowMeta({ workflow, done }) {
  const total = workflow.steps.length;
  return (
    <span className="text-xs text-fg-subtle">
      {DIFFICULTY[workflow.difficulty] ?? workflow.difficulty} · {total} steps
      {done > 0 && <span className={done === total ? 'text-accent' : ''}> · {done === total ? 'all done' : `${done} done`}</span>}
    </span>
  );
}

// Filled values in accent, defaults underlined, gaps as dashed chips.
function CommandDisplay({ segments }) {
  return segments.map((segment, index) => {
    if (segment.type === 'text') return <span key={index}>{segment.value}</span>;
    if (segment.status === 'filled') {
      return (
        <span key={index} className="text-accent">
          {shellArg(segment.value)}
        </span>
      );
    }
    if (segment.status === 'default') {
      return (
        <span key={index} className="underline decoration-fg-subtle decoration-dotted underline-offset-4">
          {shellArg(segment.value)}
        </span>
      );
    }
    const invalid = segment.status === 'invalid';
    return (
      <span
        key={index}
        className={`rounded border border-dashed px-1 ${invalid ? 'border-danger/60 text-danger' : 'border-caution/60 text-caution'}`}
      >
        &lt;{segment.key}&gt;
      </span>
    );
  });
}

function ParamFields({ workflow, values, states, flagged, onChange, inputRefs }) {
  const prefix = useId();
  return (
    <section aria-labelledby={`${prefix}-title`} className="mt-5 rounded-xl border border-line-muted bg-surface-sunken/50 p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
        <h4 id={`${prefix}-title`} className="text-sm font-semibold text-fg">
          Your values
        </h4>
        <p className="text-xs text-fg-subtle">Filled into every step below</p>
      </div>
      <div className="mt-3 grid gap-x-4 gap-y-3 sm:grid-cols-2">
        {workflow.params.map((param) => {
          const id = `${prefix}-${param.key}`;
          const state = states[param.key];
          const error =
            state.status === 'invalid'
              ? param.invalid ?? 'This value can’t be used here'
              : state.status === 'missing' && flagged.includes(param.key)
                ? 'Needed by the command you tried to copy'
                : null;
          return (
            <div key={param.key}>
              <label htmlFor={id} className="mb-1 block text-sm font-medium text-fg">
                {param.label}
                {param.default === undefined && <span className="font-normal text-fg-subtle"> · required</span>}
              </label>
              <input
                ref={(node) => {
                  inputRefs.current[param.key] = node;
                }}
                id={id}
                type="text"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
                inputMode={param.numeric ? 'numeric' : undefined}
                placeholder={param.default ?? param.example}
                value={values[param.key] ?? ''}
                onChange={(event) => onChange(param.key, event.target.value)}
                aria-invalid={error ? 'true' : undefined}
                aria-describedby={`${id}-help`}
                className={`w-full rounded-lg border bg-surface px-3 py-2 font-mono text-[0.8125rem] text-fg placeholder:text-fg-subtle focus:outline-none focus:ring-2 ${
                  error
                    ? 'border-danger/60 focus:ring-danger/25'
                    : 'border-line focus:border-accent/60 focus:ring-accent/25'
                }`}
              />
              <p id={`${id}-help`} className={`mt-1 text-xs leading-snug ${error ? 'text-danger' : 'text-fg-subtle'}`}>
                {error ?? param.hint}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// `progress` ({ [workflowId]: doneStepIndexes[] }) lives in App so Settings can export and reset it.
export function WorkflowsDialog({ open, onClose, workflows, copiedKey, onCopy, progress, setProgress }) {
  const titleId = useId();
  const isWide = useMediaQuery('(min-width: 768px)');
  const [selectedId, setSelectedId] = useState(null);
  const [valuesById, setValuesById] = useState({});
  const [flaggedById, setFlaggedById] = useState({});
  const detailRef = useRef(null);
  const listRef = useRef(null);
  const inputRefs = useRef({});
  const previousId = useRef(null);

  useEffect(() => {
    if (open) setSelectedId(window.matchMedia('(min-width: 768px)').matches ? workflows[0]?.id ?? null : null);
  }, [open, workflows]);

  // Switching workflows: a quick cross-fade on wide screens, a push/pop
  // navigation (like a phone settings app) on narrow ones.
  useLayoutEffect(() => {
    const from = previousId.current;
    previousId.current = selectedId;
    detailRef.current?.scrollTo({ top: 0 });
    if (!open || from === selectedId) return;
    const target = selectedId ? detailRef.current : listRef.current;
    if (!target) return;
    if (reducedMotion() || isWide) {
      play(target, [{ opacity: 0 }, { opacity: 1 }], { duration: 120, easing: ease.out });
      return;
    }
    const offset = selectedId ? '16px' : '-16px';
    play(target, [{ transform: `translateX(${offset})`, opacity: 0 }, { transform: 'none', opacity: 1 }], {
      duration: 220,
      easing: ease.out,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  const selected = workflows.find((workflow) => workflow.id === selectedId) ?? (isWide ? workflows[0] : null);
  const showList = isWide || !selected;

  const values = (selected && valuesById[selected.id]) ?? NO_VALUES;
  const flagged = (selected && flaggedById[selected.id]) ?? NO_ITEMS;
  const done = (selected && progress[selected.id]) ?? NO_ITEMS;

  const states = useMemo(() => (selected ? paramStates(selected, values) : {}), [selected, values]);
  const resolved = useMemo(
    () => (selected ? selected.steps.map((step) => resolveCommand(step.command, states)) : []),
    [selected, states]
  );

  const setValue = (key, value) => {
    setValuesById((current) => ({ ...current, [selected.id]: { ...current[selected.id], [key]: value } }));
    setFlaggedById((current) => ({ ...current, [selected.id]: (current[selected.id] ?? []).filter((k) => k !== key) }));
  };

  // Instead of a disabled button: point at the value that's missing or wrong.
  const flag = (keys) => {
    setFlaggedById((current) => ({ ...current, [selected.id]: keys }));
    inputRefs.current[keys[0]]?.focus();
  };

  const copyStep = (result, key) => {
    if (result.blocking.length) flag(result.blocking);
    else onCopy(null, result.text, key);
  };

  const copyAll = () => {
    const blocking = [...new Set(resolved.flatMap((result) => result.blocking))];
    if (blocking.length) flag(blocking);
    else onCopy(null, resolved.map((result) => result.text).join('\n'), `wf:${selected.id}:all`);
  };

  const toggleStep = (index, button) => {
    if (!done.includes(index)) pop(button);
    setProgress((current) => {
      const list = current[selected.id] ?? [];
      const next = list.includes(index) ? list.filter((i) => i !== index) : [...list, index].sort((a, b) => a - b);
      return { ...current, [selected.id]: next };
    });
  };

  const startOver = () => {
    setProgress((current) => {
      const next = { ...current };
      delete next[selected.id];
      return next;
    });
    setValuesById((current) => ({ ...current, [selected.id]: {} }));
    setFlaggedById((current) => ({ ...current, [selected.id]: [] }));
  };

  const doneCount = (workflow) =>
    (progress[workflow.id] ?? []).filter((index) => index < workflow.steps.length).length;
  const hasStarted = done.length > 0 || Object.values(values).some((value) => value.trim() !== '');

  return (
    <Modal open={open} onClose={onClose} labelledBy={titleId} className="max-w-5xl">
      <div className="flex h-[min(88vh,50rem)] flex-col">
        <ModalHeader
          id={titleId}
          icon={WorkflowIcon}
          title="Workflows"
          subtitle="Step-by-step command sequences for common tasks"
          onClose={onClose}
        />

        <div className="grid min-h-0 flex-1 md:grid-cols-[17.5rem_1fr]">
          {showList && (
            <nav
              ref={listRef}
              aria-label="Workflows"
              className="relative min-h-0 overflow-y-auto border-line-muted p-2 md:border-r"
            >
              <SelectionGlide selector='[aria-current="true"]' className="rounded-lg bg-surface-raised" />
              <ul className="space-y-0.5">
                {workflows.map((workflow) => {
                  const Icon = ICONS[workflow.icon] ?? WorkflowIcon;
                  const current = isWide && selected?.id === workflow.id;
                  return (
                    <li key={workflow.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(workflow.id)}
                        aria-current={current ? 'true' : undefined}
                        className={`relative flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors duration-150 ${
                          current ? '' : 'hover:bg-surface-raised/50'
                        }`}
                      >
                        <Icon
                          size={16}
                          aria-hidden="true"
                          className={`mt-0.5 shrink-0 ${current ? 'text-accent' : 'text-fg-subtle'}`}
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium text-fg">{workflow.title}</span>
                          <span className="mt-0.5 block text-xs leading-snug text-fg-muted">{workflow.description}</span>
                          <span className="mt-1 block">
                            <WorkflowMeta workflow={workflow} done={doneCount(workflow)} />
                          </span>
                        </span>
                        {!isWide && <ForwardIcon size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-fg-subtle" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}

          {selected && (
            <section
              ref={detailRef}
              aria-labelledby={`${titleId}-detail`}
              className="min-h-0 overflow-y-auto px-5 py-5 sm:px-6"
            >
              {!isWide && (
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="-ml-1.5 mb-3 inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-sm text-fg-muted transition-colors hover:text-fg"
                >
                  <BackIcon size={16} aria-hidden="true" />
                  All workflows
                </button>
              )}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 id={`${titleId}-detail`} className="text-lg font-semibold text-fg">
                    {selected.title}
                  </h3>
                  <p className="mt-1 text-sm text-fg-muted">{selected.description}</p>
                  <div className="mt-1.5">
                    <WorkflowMeta workflow={selected} done={doneCount(selected)} />
                  </div>
                </div>
                {hasStarted && (
                  <button
                    type="button"
                    onClick={startOver}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-sm text-fg-subtle transition-colors hover:text-fg"
                  >
                    <UndoIcon size={13} aria-hidden="true" />
                    Start over
                  </button>
                )}
              </div>

              {selected.params?.length > 0 && (
                <ParamFields
                  workflow={selected}
                  values={values}
                  states={states}
                  flagged={flagged}
                  onChange={setValue}
                  inputRefs={inputRefs}
                />
              )}

              <ol className="mt-6 space-y-5">
                {selected.steps.map((step, index) => {
                  const key = `wf:${selected.id}:${index}`;
                  const isDone = done.includes(index);
                  const result = resolved[index];
                  return (
                    <li key={key} className="flex gap-3">
                      <button
                        type="button"
                        onClick={(event) => toggleStep(index, event.currentTarget)}
                        aria-pressed={isDone}
                        aria-label={`Mark step ${index + 1} as done`}
                        title={isDone ? 'Mark as not done' : 'Mark as done'}
                        className={`mt-px flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs transition-colors ${
                          isDone
                            ? 'border-accent bg-accent text-canvas'
                            : 'border-line bg-surface-raised text-fg-muted hover:border-accent/60 hover:text-fg'
                        }`}
                      >
                        {isDone ? <CheckIcon aria-hidden="true" /> : index + 1}
                      </button>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 pt-0.5">
                          <h4 className={`text-sm font-semibold ${isDone ? 'text-fg-muted' : 'text-fg'}`}>{step.title}</h4>
                          <DangerBadge level={step.dangerLevel} />
                        </div>
                        <p className="mb-2 mt-0.5 text-sm leading-relaxed text-fg-muted">{step.description}</p>
                        <CommandLine
                          command={step.command}
                          display={<CommandDisplay segments={result.segments} />}
                          copied={copiedKey === key}
                          onCopy={() => copyStep(result, key)}
                        />
                      </div>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-6 flex flex-col gap-3 rounded-lg border border-line-muted bg-surface-sunken/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-fg-muted">
                  Copies all {selected.steps.length} commands
                  {selected.params?.length ? ' with your values' : ''}, one per line. Review them before you press Enter.
                </p>
                <CopyButton
                  copied={copiedKey === `wf:${selected.id}:all`}
                  onClick={copyAll}
                  label="Copy all"
                  ariaLabel={`Copy all ${selected.steps.length} commands`}
                  variant="primary"
                />
              </div>
            </section>
          )}
        </div>
      </div>
    </Modal>
  );
}
