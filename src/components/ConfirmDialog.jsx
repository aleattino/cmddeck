import { useId, useRef } from 'react';
import { DangerIcon } from './Icons';
import { Modal } from './Modal';

// Small alert dialog. Focus starts on Cancel so Enter never confirms by accident.
export function ConfirmDialog({ open, title, body, detail, confirmLabel, onConfirm, onCancel }) {
  const titleId = useId();
  const cancelRef = useRef(null);
  return (
    <Modal
      open={open}
      onClose={onCancel}
      labelledBy={titleId}
      initialFocusRef={cancelRef}
      role="alertdialog"
      className="max-w-md"
    >
      <div className="px-5 pb-4 pt-5">
        <div className="flex gap-3">
          <DangerIcon size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-danger" />
          <div className="min-w-0">
            <h2 id={titleId} className="font-semibold text-fg">
              {title}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-fg-muted">{body}</p>
            {detail && (
              <code className="mt-3 block whitespace-pre-wrap rounded-lg border border-line-muted bg-surface-sunken px-3 py-2 font-mono text-[0.8125rem] text-fg [overflow-wrap:anywhere]">
                {detail}
              </code>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 border-t border-line-muted px-5 py-3.5">
        <button
          ref={cancelRef}
          type="button"
          onClick={onCancel}
          className="h-9 rounded-md border border-line px-3.5 text-sm font-medium text-fg transition-colors hover:border-fg-subtle"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="h-9 rounded-md border border-danger/50 bg-danger/15 px-3.5 text-sm font-semibold text-danger transition-colors hover:bg-danger/25"
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
