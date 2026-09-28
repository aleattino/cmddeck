// On/off switch with a spring-driven knob.
export function Switch({ checked, onChange, labelledBy, describedBy }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      onClick={() => onChange(!checked)}
      className={`glide relative inline-flex h-6 w-10 shrink-0 items-center rounded-full border ${
        checked ? 'border-accent bg-accent' : 'border-line bg-surface-sunken'
      }`}
    >
      <span
        aria-hidden="true"
        className={`glide absolute left-0.5 h-[18px] w-[18px] rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.5)] ${
          checked ? 'translate-x-4 bg-canvas' : 'translate-x-0 bg-fg-muted'
        }`}
      />
    </button>
  );
}
