import { useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react';

const same = (a, b) => a && b && a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;

// One highlight that glides to the selected item of its parent (which must
// be positioned), instead of every item painting its own background.
// Rendered inside the list, it mounts with it and re-measures on each render.
export function SelectionGlide({ selector, className = '' }) {
  const ref = useRef(null);
  const [box, setBox] = useState(null);
  const placed = useRef(false);
  const [, remeasure] = useReducer((count) => count + 1, 0);

  // Runs after every render on purpose; setBox bails out when nothing moved.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    const container = ref.current?.parentElement;
    const active = container?.querySelector(selector);
    if (!active) {
      setBox((current) => (current === null ? current : null));
      return;
    }
    // Layout offsets, not getBoundingClientRect: a dialog that is still
    // scaling in would otherwise shift the highlight by a few pixels.
    let x = 0;
    let y = 0;
    let node = active;
    while (node && node !== container) {
      x += node.offsetLeft;
      y += node.offsetTop;
      node = node.offsetParent;
    }
    if (node !== container) return;
    const next = { x, y, width: active.offsetWidth, height: active.offsetHeight };
    setBox((current) => (same(current, next) ? current : next));
  });

  // Fonts loading or the window resizing move items without a re-render.
  useEffect(() => {
    const container = ref.current?.parentElement;
    if (!container) return undefined;
    const observer = new ResizeObserver(remeasure);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // No glide on the very first placement, only between items.
  const animate = placed.current;
  if (box) placed.current = true;

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute left-0 top-0 ${animate ? 'glide' : ''} ${box ? '' : 'invisible'} ${className}`}
      style={box ? { width: box.width, height: box.height, transform: `translate(${box.x}px, ${box.y}px)` } : undefined}
    />
  );
}
