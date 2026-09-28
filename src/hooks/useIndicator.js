import { useLayoutEffect, useRef, useState } from 'react';

// Measures the active item inside a container so one highlight element can
// glide between items instead of each item painting its own background.
export function useIndicator(containerRef, activeSelector, deps) {
  const [box, setBox] = useState(null);
  const measured = useRef(false);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    const measure = () => {
      const active = container.querySelector(activeSelector);
      if (!active) {
        setBox(null);
        return;
      }
      const parent = container.getBoundingClientRect();
      const rect = active.getBoundingClientRect();
      setBox({
        x: rect.left - parent.left + container.scrollLeft,
        y: rect.top - parent.top + container.scrollTop,
        width: rect.width,
        height: rect.height,
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  // No glide on the very first placement, only between items.
  const animate = measured.current;
  if (box) measured.current = true;
  return { box, animate };
}
