import { DangerIcon, WarningIcon } from './Icons';

export function DangerBadge({ level, compact = false }) {
  if (level !== 'danger' && level !== 'caution') return null;
  const danger = level === 'danger';
  const Icon = danger ? DangerIcon : WarningIcon;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[0.6875rem] font-semibold uppercase leading-4 tracking-wide ${
        danger ? 'border-danger/40 bg-danger/10 text-danger' : 'border-caution/35 bg-caution/10 text-caution'
      }`}
      title={danger ? 'Destructive: there is no undo' : 'Use with care'}
    >
      <Icon size={12} aria-hidden="true" />
      {compact ? <span className="sr-only">{danger ? 'Danger' : 'Caution'}</span> : danger ? 'Danger' : 'Caution'}
    </span>
  );
}
