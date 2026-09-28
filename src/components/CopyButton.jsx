import { CheckIcon, CopyIcon } from './Icons';

const VARIANTS = {
  default: {
    idle: 'h-8 px-2.5 text-xs font-medium border-line bg-surface-raised text-fg-muted hover:border-accent/50 hover:text-fg',
    done: 'h-8 px-2.5 text-xs font-medium border-accent/40 bg-accent/10 text-accent',
  },
  primary: {
    idle: 'h-9 px-3.5 text-sm font-semibold border-accent bg-accent text-canvas hover:bg-accent-strong hover:border-accent-strong',
    done: 'h-9 px-3.5 text-sm font-semibold border-accent/40 bg-accent/10 text-accent',
  },
};

export function CopyButton({ copied, onClick, label = 'Copy', ariaLabel = 'Copy command', variant = 'default', type = 'button' }) {
  const styles = VARIANTS[variant];
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={copied ? 'Copied' : ariaLabel}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-md border transition-colors ${copied ? styles.done : styles.idle}`}
    >
      {copied ? <CheckIcon size={14} aria-hidden="true" className="pop-in" /> : <CopyIcon size={14} aria-hidden="true" />}
      <span>{copied ? 'Copied' : label}</span>
    </button>
  );
}
