// Motion system: short, quiet moves. Ease-out for things that arrive or
// move, a faster ease-in for things that leave. Reduced motion swaps
// movement for plain fades.

export const ease = {
  out: 'cubic-bezier(0.22, 1, 0.36, 1)',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
};

export const reducedMotion = () => document.documentElement.dataset.motion === 'reduced';

// Remembers where the last click happened, so windows can grow out of it.
let lastPointer = null;
if (typeof document !== 'undefined') {
  document.addEventListener(
    'pointerdown',
    (event) => {
      lastPointer = { x: event.clientX, y: event.clientY, time: performance.now() };
    },
    { capture: true, passive: true }
  );
}

export function openingOrigin(fallbackElement) {
  if (lastPointer && performance.now() - lastPointer.time < 1000) return lastPointer;
  const rect = fallbackElement?.getBoundingClientRect?.();
  return rect && rect.width ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : null;
}

// Element.animate that resolves when done (or immediately if it can't run).
// Background tabs pause animations, so a timer makes sure exits still finish.
export function play(element, keyframes, options) {
  if (!element?.animate) return Promise.resolve();
  try {
    const animation = element.animate(keyframes, { fill: 'none', ...options });
    const limit = (options.duration ?? 0) + (options.delay ?? 0) + 150;
    return Promise.race([
      animation.finished.catch(() => {}),
      new Promise((resolve) => setTimeout(resolve, limit)),
    ]);
  } catch {
    return Promise.resolve();
  }
}

// A small settle for confirmations (star, check): noticeable, not bouncy.
export function pop(element) {
  if (reducedMotion()) return;
  play(element, [{ transform: 'scale(0.85)' }, { transform: 'scale(1)' }], { duration: 200, easing: ease.out });
}

// Runs a DOM update as a view transition when the browser supports it.
export function withViewTransition(update) {
  if (reducedMotion() || typeof document.startViewTransition !== 'function') {
    update();
    return;
  }
  document.startViewTransition(update);
}
