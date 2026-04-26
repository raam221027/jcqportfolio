import { useEffect, useRef } from "react";

type RGB = { r: number; g: number; b: number };

function hex(h: string): RGB {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
  return m
    ? { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) }
    : { r: 0, g: 0, b: 0 };
}

interface DotPatternProps {
  baseColor?: string;
  glowColor?: string;
  dotSize?: number;
  gap?: number;
  proximity?: number;
}

export default function DotPattern({
  baseColor = "#042158",
  glowColor = "#00c3ff",
  dotSize = 2,
  gap = 13,
  proximity = 250,
}: DotPatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<{ x: number; y: number; o: number }[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const baseRgb = hex(baseColor);
    const glowRgb = hex(glowColor);

    const fit = () => {
      const r = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      canvas.style.width = `${r.width}px`;
      canvas.style.height = `${r.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cell = dotSize + gap;
      const cols = Math.ceil(r.width / cell) + 1;
      const rows = Math.ceil(r.height / cell) + 1;
      const offX = (r.width - (cols - 1) * cell) / 2;
      const offY = (r.height - (rows - 1) * cell) / 2;
      const dots: { x: number; y: number; o: number }[] = [];
      for (let row = 0; row < rows; row++)
        for (let col = 0; col < cols; col++)
          dots.push({
            x: offX + col * cell,
            y: offY + row * cell,
            o: 0.3 + Math.random() * 0.2,
          });
      dotsRef.current = dots;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(container);

    let raf = 0;
    const draw = () => {
      const r = container.getBoundingClientRect();
      ctx.clearRect(0, 0, r.width, r.height);
      const { x: mx, y: my } = mouseRef.current;
      const proxSq = proximity * proximity;
      for (const d of dotsRef.current) {
        const dx = d.x - mx,
          dy = d.y - my,
          ds = dx * dx + dy * dy;
        let R = baseRgb.r,
          G = baseRgb.g,
          B = baseRgb.b,
          op = d.o,
          sc = 1;
        if (ds < proxSq) {
          const dist = Math.sqrt(ds);
          const t = 1 - dist / proximity;
          const e = t * t * (2 - 2 * t);
          R = Math.round(baseRgb.r + (glowRgb.r - baseRgb.r) * e);
          G = Math.round(baseRgb.g + (glowRgb.g - baseRgb.g) * e);
          B = Math.round(baseRgb.b + (glowRgb.b - baseRgb.b) * e);
          op = Math.min(1, d.o + e * 0.1);
          sc = 1 + e * 0.8;
        }
        ctx.fillStyle = `rgba(${R},${G},${B},${op})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, (dotSize / 2) * sc, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [baseColor, glowColor, dotSize, gap, proximity]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 bg-bg-deep"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
