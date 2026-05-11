import { useEffect, useRef } from 'react';

/**
 * useParallax — applies a translateY transform proportional to the element's
 * distance from the viewport center. Uses requestAnimationFrame for smooth,
 * performant 60fps scroll-linked motion.
 *
 * @param {number} speed  Negative moves slower than scroll (background feel),
 *                        positive moves faster than scroll (foreground feel).
 *                        Suggested range: -0.4 to 0.4
 * @returns ref to attach to any DOM element
 */
export default function useParallax(speed = -0.2) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let frame = 0;
    let ticking = false;

    const update = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // distance of element center from viewport center, normalized
      const center = rect.top + rect.height / 2 - vh / 2;
      const offset = center * speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        frame = window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [speed]);

  return ref;
}
