export function Kbd({ children, className = '' }) {
  return (
    <kbd
      className={`inline-flex min-w-[1.5rem] items-center justify-center rounded border border-line bg-surface-raised px-1.5 py-px text-[0.6875rem] font-medium leading-4 text-fg-muted ${className}`}
    >
      {children}
    </kbd>
  );
}
