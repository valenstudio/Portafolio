// Animated scroll with easing (the browser's native smooth scroll can look instant
// when the operating system has animations turned off)
let cancelSmoothScroll: (() => void) | null = null;

export const smoothScrollTo = (targetY: number, duration = 700) => {
  cancelSmoothScroll?.();
  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 2) return;

  const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  let startTime: number | null = null;
  let frameId = 0;

  // If the user scrolls with the wheel or finger, stop the animation
  const stop = () => {
    cancelAnimationFrame(frameId);
    window.removeEventListener('wheel', stop);
    window.removeEventListener('touchstart', stop);
    cancelSmoothScroll = null;
  };
  window.addEventListener('wheel', stop, { passive: true });
  window.addEventListener('touchstart', stop, { passive: true });
  cancelSmoothScroll = stop;

  const step = (now: number) => {
    if (startTime === null) startTime = now;
    const progress = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) {
      frameId = requestAnimationFrame(step);
    } else {
      stop();
    }
  };
  frameId = requestAnimationFrame(step);
};
