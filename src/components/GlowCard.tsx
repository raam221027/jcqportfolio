import type { CSSProperties, ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const RAINBOW =
  "conic-gradient(from 225deg at 50% 50%, #a855f7 0deg, #3b82f6 60deg, #06b6d4 120deg, #10b981 180deg, #eab308 240deg, #f97316 280deg, #ef4444 320deg, #a855f7 360deg)";

export default function GlowCard({ children, className = "", style }: GlowCardProps) {
  return (
    <div
      className={["relative rounded-3xl p-1", className].join(" ")}
      style={{ background: RAINBOW, ...style }}
    >
      <div className="h-full w-full rounded-[18px] bg-black p-6 text-fg">{children}</div>
    </div>
  );
}
