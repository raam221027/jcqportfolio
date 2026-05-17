import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import f1 from "@/assets/f1.png";
import f2 from "@/assets/f2.png";
import f3 from "@/assets/f3.png";
import f4 from "@/assets/f4.png";
import f5 from "@/assets/f5.png";

const FRAMES = [f1, f2, f3, f4, f5];
const LIGHT_PATH = [0, 1, 2, 3, 4];
const DARK_PATH = [4, 3, 2, 0];
const FRAME_MS = 220;
const F2_HOLD_MS = 1000;

export default function ThemedAvatar({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [frame, setFrame] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const clear = () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    if (!mounted) return clear;
    clear();

    const isLight = resolvedTheme === "light";
    const path = isLight ? LIGHT_PATH : DARK_PATH;
    const finalFrame = path[path.length - 1];

    if (frame === finalFrame) return clear;

    let pathIdx = path.indexOf(frame);
    if (pathIdx === -1) {
      pathIdx = 0;
      setFrame(path[0]);
    }

    const tick = () => {
      pathIdx++;
      const next = path[pathIdx];
      setFrame(next);
      if (pathIdx < path.length - 1) {
        const delay = isLight && next === 1 ? F2_HOLD_MS : FRAME_MS;
        timerRef.current = window.setTimeout(tick, delay);
      }
    };

    timerRef.current = window.setTimeout(tick, FRAME_MS);

    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedTheme, mounted]);

  const isLight = mounted && resolvedTheme === "light";
  const inF1F2Phase = isLight && frame <= 1;

  return (
    <div
      className={cn(
        "relative flex aspect-square w-full max-w-[500px] items-center justify-center overflow-hidden rounded-2xl border border-surface-2 bg-bg-elevated",
        className,
      )}
    >
      <img
        src={f1}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full scale-0 object-cover opacity-60 blur-2xl"
      />
      <span className="absolute inset-0 bg-bg/420" />

      <div className="relative h-full w-full">
        {FRAMES.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt={idx === 0 ? "Joemar Questadio" : ""}
            aria-hidden={idx !== frame}
            draggable={false}
            style={{
              transition: "opacity 380ms ease-out, filter 380ms ease-out",
              willChange: "opacity, filter",
            }}
            className={cn(
              "absolute inset-0 h-full w-full object-contain object-center",
              idx === frame || (inF1F2Phase && idx === 0)
                ? "opacity-100"
                : "opacity-0",
              idx === frame || (inF1F2Phase && idx <= 1)
                ? "blur-0"
                : "blur-[6px]",
            )}
          />
        ))}
      </div>
    </div>
  );
}