import { useEffect, useLayoutEffect, useRef } from 'react';
import { PrivacyIcon } from './Icons';
import { usePresence } from '../hooks/usePresence';
import { ease, play, reducedMotion } from '../lib/motion';

// Accept and Decline carry equal weight: refusing must be as easy as agreeing.
// Later changes happen in Settings → Privacy.
export function CookieConsent({ open, onAccept, onDecline, onLearnMore }) {
  const { mounted, closing, done } = usePresence(open);
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (!mounted || closing || !ref.current) return;
    if (reducedMotion()) return;
    play(ref.current, [{ transform: 'translateY(12px)', opacity: 0 }, { transform: 'none', opacity: 1 }], {
      duration: 240,
      easing: ease.out,
      delay: 300,
      fill: 'backwards',
    });
  }, [mounted, closing]);

  useEffect(() => {
    if (!closing) return undefined;
    let cancelled = false;
    const frames = reducedMotion()
      ? [{ opacity: 1 }, { opacity: 0 }]
      : [
          { transform: 'none', opacity: 1 },
          { transform: 'translateY(8px)', opacity: 0 },
        ];
    play(ref.current, frames, { duration: 150, easing: ease.in, fill: 'forwards' }).then(() => {
      if (!cancelled) done();
    });
    return () => {
      cancelled = true;
    };
  }, [closing, done]);

  if (!mounted) return null;

  return (
    <section
      ref={ref}
      aria-label="Cookie consent"
      className={`fixed inset-x-3 bottom-3 z-30 mx-auto max-w-3xl rounded-xl border border-line bg-surface-raised p-4 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.75)] sm:inset-x-4 sm:bottom-4 sm:p-5 ${
        closing ? 'pointer-events-none' : ''
      }`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-1 gap-3">
          <PrivacyIcon size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
          <div className="text-sm leading-relaxed">
            <p className="font-medium text-fg">Analytics cookies</p>
            <p className="mt-0.5 text-fg-muted">
              With your consent, we use Google Analytics to understand how CmdDeck is used. Nothing is loaded until
              you accept. You can change this later in Settings.{' '}
              <button
                type="button"
                onClick={onLearnMore}
                className="text-accent underline decoration-accent/40 hover:decoration-accent"
              >
                Cookie Policy
              </button>
            </p>
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={onDecline}
            className="h-9 flex-1 rounded-md border border-line bg-surface px-4 text-sm font-medium text-fg transition-colors hover:border-fg-subtle sm:flex-none"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={onAccept}
            className="h-9 flex-1 rounded-md border border-line bg-surface px-4 text-sm font-medium text-fg transition-colors hover:border-fg-subtle sm:flex-none"
          >
            Accept
          </button>
        </div>
      </div>
    </section>
  );
}
