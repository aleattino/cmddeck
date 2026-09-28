import { useId, useRef } from 'react';
import { EditIcon } from './Icons';
import { Modal, ModalHeader } from './Modal';
import { CopyButton } from './CopyButton';

export function CustomizeDialog({ open, onClose, snippet, values, onChange, onReset, command, copied, onCopy, returnFocusRef }) {
  const titleId = useId();
  const fieldPrefix = useId();
  const firstFieldRef = useRef(null);

  const submit = (event) => {
    event.preventDefault();
    onCopy();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy={titleId}
      initialFocusRef={firstFieldRef}
      returnFocusRef={returnFocusRef}
      className="max-w-xl"
    >
      <form onSubmit={submit} className="flex max-h-[inherit] flex-col">
        <ModalHeader
          id={titleId}
          icon={EditIcon}
          title={`Customize: ${snippet.title}`}
          subtitle="Fill in your values. Anything left empty keeps the example."
          onClose={onClose}
        />

        <div className="space-y-4 overflow-y-auto px-5 py-5">
          {snippet.inputs?.map((input, index) => {
            const fieldId = `${fieldPrefix}-${input.param}`;
            return (
              <div key={input.param}>
                <label htmlFor={fieldId} className="mb-1.5 block text-sm font-medium text-fg">
                  {input.label}
                </label>
                <input
                  ref={index === 0 ? firstFieldRef : undefined}
                  id={fieldId}
                  type="text"
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                  placeholder={input.placeholder}
                  value={values[input.param] ?? ''}
                  onChange={(event) => onChange(input.param, event.target.value)}
                  className="w-full rounded-lg border border-line bg-surface-sunken px-3 py-2 font-mono text-[0.8125rem] text-fg placeholder:text-fg-subtle focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/25"
                />
              </div>
            );
          })}

          <div>
            <p className="mb-1.5 text-sm font-medium text-fg-muted">Result</p>
            <output className="block whitespace-pre-wrap rounded-lg [overflow-wrap:anywhere] border border-line-muted bg-surface-sunken px-3 py-2.5 font-mono text-[0.8125rem] leading-6 text-accent">
              {command}
            </output>
            <p className="mt-1.5 text-xs text-fg-subtle">Values with spaces or special characters are quoted for you.</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-line-muted px-5 py-3.5">
          <button
            type="button"
            onClick={onReset}
            className="rounded-md px-2 py-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
          >
            Reset values
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-9 rounded-md border border-line px-3.5 text-sm font-medium text-fg-muted transition-colors hover:bg-surface-raised hover:text-fg"
            >
              Done
            </button>
            <CopyButton copied={copied} type="submit" label="Copy" variant="primary" />
          </div>
        </div>
      </form>
    </Modal>
  );
}
