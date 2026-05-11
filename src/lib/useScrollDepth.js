import { useEffect, useRef } from 'react';

/**
 * useScrollDepth — Apple-style depth scroll on a card.
 * As the element travels through the viewport, scale + opacity + translateY
 * are interpolated from a soft "deep" state at the edges to a focused state
 * when centered. Uses requestAnimationFrame + transform (no layout thrash).
 *
 * @param {object} opts
 * @param {number} opts.minScale  Scale at the viewport edges (default 0.92)
 * @param {number} opts.minOpacity Opacity at the viewport edges (default 0.55)
 * @param {number} opts.maxOffset translateY (px) at the edges (default 24)
 */
export default function useScrollDepth({ minScale = 0.92, minOpacity = 0.55, maxOffset = 24 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;
    let frame = 0;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 when centered, 1 at the very top/bottom edge of viewport relative to half-height
      const distance = Math.min(1, Math.abs(rect.top + rect.height / 2 - vh / 2) / (vh / 2));
      const eased = distance * distance; // smoother falloff
      const scale = 1 - (1 - minScale) * eased;
      const opacity = 1 - (1 - minOpacity) * eased;
      const offset = maxOffset * eased * (rect.top + rect.height / 2 < vh / 2 ? -1 : 1);
      el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
      el.style.opacity = opacity.toFixed(3);
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
  }, [minScale, minOpacity, maxOffset]);

  return ref;
}
