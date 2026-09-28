import { useCallback, useEffect, useState } from 'react';

// Keeps an element mounted while it plays its exit animation.
// `closing` is true between `open` turning false and `done()` being called.
export function usePresence(open) {
  const [mounted, setMounted] = useState(open);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setClosing(false);
    } else {
      setClosing((wasClosing) => wasClosing || mounted);
    }
    // `mounted` is read, not tracked: only `open` drives the transition.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const done = useCallback(() => {
    setMounted(false);
    setClosing(false);
  }, []);

  return { mounted, closing, done };
}
