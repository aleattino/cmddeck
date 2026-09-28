import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CheckIcon, DangerIcon } from './Icons';
import { ease, play, reducedMotion } from '../lib/motion';

const wide = () => window.matchMedia('(min-width: 640px)').matches;

// A desktop-style notification: a short slide and fade in, a fade out. Rendered as a manual popover so it sits in the top
// layer, above any open dialog.
export function Toast({ toast }) {
  const hostRef = useRef(null);
  const cardRef = useRef(null);
  const [shown, setShown] = useState(toast);

  // Keep the last toast on screen while it animates out.
  useEffect(() => {
    if (toast) {
      setShown(toast);
      return undefined;
    }
    const card = cardRef.current;
    if (!card) {
      setShown(null);
      return undefined;
    }
    let cancelled = false;
    const offset = wide() ? 'translateX(6px)' : 'translateY(-6px)';
    const frames = reducedMotion()
      ? [{ opacity: 1 }, { opacity: 0 }]
      : [
          { opacity: 1, transform: 'none' },
          { opacity: 0, transform: offset },
        ];
    play(card, frames, { duration: 150, easing: ease.in, fill: 'forwards' }).then(() => {
      if (!cancelled) setShown(null);
    });
    return () => {
      cancelled = true;
    };
  }, [toast]);

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (host && typeof host.showPopover === 'function') {
      try {
        // Re-showing moves it to the top of the top layer.
        if (host.matches(':popover-open')) host.hidePopover();
        if (shown) host.showPopover();
      } catch {
        // Popover API quirks: the element still renders as a fixed overlay.
      }
    }
    const card = cardRef.current;
    if (!card) return;
    if (reducedMotion()) {
      play(card, [{ opacity: 0 }, { opacity: 1 }], { duration: 140, easing: ease.out });
      return;
    }
    const from = wide() ? 'translateX(12px)' : 'translateY(-8px)';
    play(card, [{ transform: from, opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 220, easing: ease.out });
  }, [shown]);

  const isError = shown?.tone === 'error';
  const Icon = isError ? DangerIcon : CheckIcon;

  return (
    <div
      ref={hostRef}
      popover="manual"
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-auto left-1/2 top-4 m-0 w-max max-w-[calc(100%-2rem)] -translate-x-1/2 overflow-visible border-0 bg-transparent p-0 sm:left-auto sm:right-4 sm:translate-x-0"
    >
      {shown && (
        <div
          ref={cardRef}
          key={shown.id}
          className={`flex items-center gap-2.5 rounded-lg border bg-surface-raised px-3.5 py-2.5 text-sm shadow-[0_12px_32px_-8px_rgba(0,0,0,0.6)] ${
            isError ? 'border-danger/40 text-fg' : 'border-accent/30 text-fg'
          }`}
        >
          <Icon size={16} className={isError ? 'text-danger' : 'pop-in text-accent'} aria-hidden="true" />
          {isError ? (
            <span>{shown.message}</span>
          ) : (
            // Short confirmations are printed like terminal output, ending on the wordmark's cursor.
            <span className="font-mono text-[0.8125rem]">
              <span className="typewriter" style={{ '--chars': shown.message.length }}>
                {shown.message}
              </span>
              <span className="blinking-cursor text-accent" aria-hidden="true">
                _
              </span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
