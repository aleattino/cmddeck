import { useEffect, useLayoutEffect, useRef } from 'react';
import { CloseIcon } from './Icons';
import { usePresence } from '../hooks/usePresence';
import { ease, openingOrigin, play, reducedMotion } from '../lib/motion';

let openCount = 0;

function lockScroll() {
  openCount += 1;
  document.documentElement.style.overflow = 'hidden';
}

function unlockScroll() {
  openCount = Math.max(0, openCount - 1);
  if (openCount === 0) document.documentElement.style.overflow = '';
}

function animateBackdrop(dialog, keyframes, options) {
  return play(dialog, keyframes, { ...options, pseudoElement: '::backdrop' });
}

// Windows settle in from the direction of whatever opened them; closing is a quick fade.
function enter(dialog, origin) {
  if (reducedMotion()) {
    play(dialog, [{ opacity: 0 }, { opacity: 1 }], { duration: 160, easing: ease.out });
    animateBackdrop(dialog, [{ opacity: 0 }, { opacity: 1 }], { duration: 160, easing: ease.out });
    return;
  }
  const rect = dialog.getBoundingClientRect();
  if (origin) {
    const x = Math.min(Math.max(origin.x - rect.left, 0), rect.width);
    const y = Math.min(Math.max(origin.y - rect.top, 0), rect.height);
    dialog.style.transformOrigin = `${x}px ${y}px`;
  } else {
    dialog.style.transformOrigin = '50% 30%';
  }
  play(dialog, [{ transform: 'scale(0.97)' }, { transform: 'scale(1)' }], { duration: 220, easing: ease.out });
  play(dialog, [{ opacity: 0 }, { opacity: 1 }], { duration: 150, easing: ease.out });
  animateBackdrop(dialog, [{ opacity: 0 }, { opacity: 1 }], { duration: 180, easing: ease.out });
}

function exit(dialog) {
  const duration = reducedMotion() ? 100 : 120;
  const frames = reducedMotion()
    ? [{ opacity: 1 }, { opacity: 0 }]
    : [
        { opacity: 1, transform: 'scale(1)' },
        { opacity: 0, transform: 'scale(0.98)' },
      ];
  return Promise.all([
    play(dialog, frames, { duration, easing: ease.in, fill: 'forwards' }),
    animateBackdrop(dialog, [{ opacity: 1 }, { opacity: 0 }], { duration, easing: ease.in, fill: 'forwards' }),
  ]);
}

// Native modal <dialog>: the browser handles the focus trap, Esc, inert
// background and top-layer stacking (it always sits above the cookie banner).
export function Modal({
  open,
  onClose,
  labelledBy,
  initialFocusRef,
  returnFocusRef,
  className = '',
  placement = 'center',
  role,
  children,
}) {
  const { mounted, closing, done } = usePresence(open);
  if (!mounted) return null;
  return (
    <ModalDialog
      closing={closing}
      onExited={done}
      onClose={onClose}
      labelledBy={labelledBy}
      initialFocusRef={initialFocusRef}
      returnFocusRef={returnFocusRef}
      className={className}
      placement={placement}
      role={role}
    >
      {children}
    </ModalDialog>
  );
}

function ModalDialog({
  closing,
  onExited,
  onClose,
  labelledBy,
  initialFocusRef,
  returnFocusRef,
  className,
  placement,
  role,
  children,
}) {
  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    // Safari doesn't focus buttons on click, so an explicit return target wins.
    const returnTarget = returnFocusRef?.current ?? document.activeElement;
    const origin = openingOrigin(returnTarget);
    dialog.showModal();
    lockScroll();
    initialFocusRef?.current?.focus();
    enter(dialog, origin);
    return () => {
      unlockScroll();
      if (dialog.open) dialog.close();
      if (returnTarget instanceof HTMLElement && returnTarget.isConnected) returnTarget.focus({ preventScroll: true });
    };
    // Runs once per opening; the focus target is read at mount time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!closing) return undefined;
    let cancelled = false;
    exit(dialogRef.current).then(() => {
      if (!cancelled) onExited();
    });
    return () => {
      cancelled = true;
    };
  }, [closing, onExited]);

  useEffect(() => {
    const dialog = dialogRef.current;
    const onCancel = (event) => {
      event.preventDefault();
      onCloseRef.current();
    };
    dialog.addEventListener('cancel', onCancel);
    return () => dialog.removeEventListener('cancel', onCancel);
  }, []);

  const position = placement === 'top' ? 'mt-[8vh] mb-auto max-h-[80vh]' : 'my-auto max-h-[min(88vh,56rem)]';

  return (
    <dialog
      ref={dialogRef}
      role={role}
      aria-labelledby={labelledBy}
      // Clicks on the ::backdrop target the dialog element itself.
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !closing) onCloseRef.current();
      }}
      className={`mx-auto w-[calc(100%-1.5rem)] overflow-hidden rounded-xl border border-line bg-surface p-0 text-fg shadow-[0_24px_64px_-12px_rgba(0,0,0,0.6)] ${
        closing ? 'pointer-events-none' : ''
      } ${position} ${className}`}
    >
      {children}
    </dialog>
  );
}

export function ModalHeader({ id, icon: Icon, title, subtitle, onClose }) {
  return (
    <div className="flex items-start gap-3 border-b border-line-muted px-5 py-4">
      {Icon && <Icon size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />}
      <div className="min-w-0 flex-1">
        <h2 id={id} className="text-lg font-semibold leading-snug text-fg">
          {title}
        </h2>
        {subtitle && <p className="mt-0.5 text-sm text-fg-muted">{subtitle}</p>}
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="-mr-1.5 -mt-1 rounded-md p-1.5 text-fg-subtle transition-colors hover:bg-surface-raised hover:text-fg"
      >
        <CloseIcon size={18} aria-hidden="true" />
      </button>
    </div>
  );
}
