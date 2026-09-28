import { CopyButton } from './CopyButton';

// A command in a code well with its copy action beside it (never on top of it).
// `display` can replace the plain text, e.g. to highlight workflow parameters.
export function CommandLine({ command, display, copied, onCopy }) {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-line-muted bg-surface-sunken py-1.5 pl-3 pr-1.5">
      <code className="min-w-0 flex-1 whitespace-pre-wrap py-1 font-mono text-[0.8125rem] leading-6 text-fg [overflow-wrap:anywhere]">
        {display ?? command}
      </code>
      <CopyButton copied={copied} onClick={onCopy} />
    </div>
  );
}
