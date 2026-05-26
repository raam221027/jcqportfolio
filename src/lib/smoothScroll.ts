const DEFAULT_DURATION = 800;
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function smoothScrollTo(targetY: number, duration = DEFAULT_DURATION): void {
  const clampedTarget = Math.max(0, targetY);

  if (prefersReducedMotion()) {
    window.scrollTo(0, clampedTarget);
    return;
  }

  const startY = window.scrollY;
  const distance = clampedTarget - startY;
  if (Math.abs(distance) < 2) {
    window.scrollTo(0, clampedTarget);
    return;
  }

  const startTime = performance.now();
  let cancelled = false;
  const cancel = () => {
    cancelled = true;
  };
  window.addEventListener("wheel", cancel, { once: true, passive: true });
  window.addEventListener("touchmove", cancel, { once: true, passive: true });

  const step = (now: number) => {
    if (cancelled) {
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchmove", cancel);
      return;
    }
    const t = Math.min(1, (now - startTime) / duration);
    window.scrollTo(0, startY + distance * easeOutQuart(t));
    if (t < 1) {
      requestAnimationFrame(step);
    } else {
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchmove", cancel);
    }
  };
  requestAnimationFrame(step);
}

export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  const header = document.querySelector("header");
  const offset = (header?.offsetHeight ?? 60) + 12;
  const targetY = el.getBoundingClientRect().top + window.scrollY - offset;
  smoothScrollTo(targetY);
}
