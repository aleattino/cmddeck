import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { CheckIcon, ChevronDownIcon, ComputerIcon } from './Icons';
import { DISTROS, DISTRO_LABELS } from '../lib/os';
import { DistroLogo } from './DistroLogo';
import { usePresence } from '../hooks/usePresence';
import { ease, play, reducedMotion } from '../lib/motion';

// selected is a distro id, or null when the visitor hasn't picked one yet
// (not on Linux, or a Linux distro we can't recognize from the browser).
export function OSSelector({ selected, detected, onSelect }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const itemRefs = useRef([]);
  const menuId = useId();
  const menuRef = useRef(null);
  const { mounted, closing, done } = usePresence(open);

  // Popovers unfold from their button and fold back into it.
  useLayoutEffect(() => {
    const menu = menuRef.current;
    if (!menu || closing) return;
    if (reducedMotion()) {
      play(menu, [{ opacity: 0 }, { opacity: 1 }], { duration: 120, easing: ease.out });
      return;
    }
    play(menu, [{ transform: 'translateY(-4px)' }, { transform: 'none' }], { duration: 160, easing: ease.out });
    play(menu, [{ opacity: 0 }, { opacity: 1 }], { duration: 120, easing: ease.out });
  }, [mounted, closing]);

  useEffect(() => {
    if (!closing) return undefined;
    let cancelled = false;
    const frames = reducedMotion()
      ? [{ opacity: 1 }, { opacity: 0 }]
      : [
          { opacity: 1, transform: 'none' },
          { opacity: 0, transform: 'translateY(-2px)' },
        ];
    play(menuRef.current, frames, { duration: 100, easing: ease.in, fill: 'forwards' }).then(() => {
      if (!cancelled) done();
    });
    return () => {
      cancelled = true;
    };
  }, [closing, done]);

  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    const current = Math.max(0, DISTROS.indexOf(selected));
    itemRefs.current[current]?.focus();
    return () => document.removeEventListener('pointerdown', onPointer);
  }, [open, selected]);

  const choose = (distro) => {
    onSelect(distro);
    setOpen(false);
    rootRef.current?.querySelector('button')?.focus();
  };

  const onMenuKeyDown = (event) => {
    const index = itemRefs.current.indexOf(document.activeElement);
    const moves = { ArrowDown: 1, ArrowUp: -1 };
    if (event.key in moves) {
      event.preventDefault();
      itemRefs.current[(index + moves[event.key] + DISTROS.length) % DISTROS.length]?.focus();
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      itemRefs.current[event.key === 'Home' ? 0 : DISTROS.length - 1]?.focus();
    } else if (event.key === 'Escape' || event.key === 'Tab') {
      if (event.key === 'Escape') event.preventDefault();
      setOpen(false);
      if (event.key === 'Escape') rootRef.current?.querySelector('button')?.focus();
    }
  };

  const hint = selected
    ? null
    : detected === 'not-linux'
      ? 'You’re not on Linux right now. Pick the system you’ll paste commands into.'
      : detected === 'unknown'
        ? 'Your browser doesn’t say which distro you run. Pick it once and it’s remembered.'
        : null;

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={`Distribution for package commands: ${selected ? DISTRO_LABELS[selected] : 'not chosen'}`}
        className={`inline-flex h-9 items-center gap-2 rounded-lg border px-2.5 text-sm transition-colors ${
          selected
            ? 'border-line text-fg hover:border-fg-subtle'
            : 'border-caution/40 text-caution hover:border-caution/70'
        }`}
      >
        {selected ? (
          <DistroLogo distro={selected} size={16} />
        ) : (
          <ComputerIcon size={16} aria-hidden="true" />
        )}
        {selected ? (
          <>
            <span className="hidden sm:inline">{DISTRO_LABELS[selected]}</span>
            <span className="sr-only sm:hidden">{DISTRO_LABELS[selected]}</span>
          </>
        ) : (
          <>
            <span className="hidden sm:inline">Choose distro</span>
            <span className="sm:hidden">Distro</span>
          </>
        )}
        <ChevronDownIcon size={14} aria-hidden="true" className="text-fg-subtle" />
      </button>

      {mounted && (
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          aria-label="Distribution"
          onKeyDown={onMenuKeyDown}
          className={`absolute right-0 top-full z-40 mt-2 w-64 origin-top-right space-y-0.5 rounded-xl border border-line bg-surface-raised p-1.5 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.7)] ${
            closing ? 'pointer-events-none' : ''
          }`}
        >
          {hint && <p className="px-2.5 pb-2 pt-1.5 text-xs leading-relaxed text-fg-muted">{hint}</p>}
          {DISTROS.map((distro, index) => {
            const checked = selected === distro;
            return (
              <button
                key={distro}
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                type="button"
                role="menuitemradio"
                aria-checked={checked}
                tabIndex={-1}
                onClick={() => choose(distro)}
                // One highlight only: hovering moves focus, so pointer and keyboard share a cursor.
                onMouseEnter={(event) => event.currentTarget.focus()}
                className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-fg focus:bg-accent/10 focus:outline-none"
              >
                <DistroLogo distro={distro} size={16} />
                <span className="flex-1">{DISTRO_LABELS[distro]}</span>
                {checked && <CheckIcon size={15} aria-hidden="true" className="text-accent" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
