import { useRef } from 'react';
import { useIndicator } from '../hooks/useIndicator';

// Radio group drawn as a segmented control; the thumb slides between options.
export function Segmented({ label, value, options, onChange, size = 'sm' }) {
  const containerRef = useRef(null);
  const refs = useRef({});
  const { box, animate } = useIndicator(containerRef, '[aria-checked="true"]', [value, options.length]);

  const onKeyDown = (event) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const index = options.findIndex((option) => option.value === value);
    const next = options[(index + step + options.length) % options.length].value;
    onChange(next);
    refs.current[next]?.focus();
  };

  const padding = size === 'md' ? 'px-3.5 py-1.5 text-sm' : 'px-2.5 py-1 text-xs';

  return (
    <div
      ref={containerRef}
      role="radiogroup"
      aria-label={label}
      onKeyDown={onKeyDown}
      className="relative inline-flex max-w-full flex-wrap rounded-lg border border-line-muted bg-surface-sunken p-0.5"
    >
      {box && (
        <span
          aria-hidden="true"
          className={`absolute left-0 top-0 rounded-md bg-surface-raised shadow-[0_1px_2px_rgba(0,0,0,0.45)] ${animate ? 'glide' : ''}`}
          style={{ width: box.width, height: box.height, transform: `translate(${box.x}px, ${box.y}px)` }}
        />
      )}
      {options.map((option) => {
        const checked = option.value === value;
        return (
          <button
            key={option.value}
            ref={(node) => {
              refs.current[option.value] = node;
            }}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            title={option.title}
            onClick={() => onChange(option.value)}
            className={`relative inline-flex items-center gap-1.5 rounded-md font-medium transition-colors duration-150 ${padding} ${
              checked ? 'text-fg' : 'text-fg-subtle hover:text-fg'
            }`}
          >
            {option.icon}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
