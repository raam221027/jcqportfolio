import { useState } from "react";
import { ChevronsLeftRight } from "lucide-react";

interface CompareSliderProps {
  first: string;
  second: string;
  firstLabel?: string;
  secondLabel?: string;
}

export default function CompareSlider({
  first,
  second,
  firstLabel = "profile.js",
  secondLabel = "skills.js",
}: CompareSliderProps) {
  const [pct, setPct] = useState(50);
  return (
    <div
      className="relative aspect-square w-full cursor-ew-resize overflow-hidden rounded-xl border border-surface-2 bg-bg-elevated"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPct(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)));
      }}
      onMouseLeave={() => setPct(50)}
    >
      <img src={first} alt={firstLabel} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pct}%)` }}>
        <img src={second} alt={secondLabel} className="h-full w-full object-cover" />
      </div>
      <div
        className="absolute bottom-0 top-0 w-0.5 shadow-[0_0_12px_#22d3ee]"
        style={{
          left: `${pct}%`,
          background: "linear-gradient(180deg, transparent, #22d3ee, transparent)",
        }}
      >
        <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-brand-cyan shadow-[0_0_16px_hsl(190_95%_39%)]">
          <ChevronsLeftRight className="h-3.5 w-3.5 text-[#031218]" strokeWidth={3} />
        </div>
      </div>
      <div className="absolute left-3 top-3 rounded-full border border-brand-cyan400/30 bg-black/60 px-2 py-0.5 font-mono text-[10px] text-brand-cyan400">
        {firstLabel}
      </div>
      <div className="absolute right-3 top-3 rounded-full border border-brand-indigo400/30 bg-black/60 px-2 py-0.5 font-mono text-[10px] text-brand-indigo400">
        {secondLabel}
      </div>
    </div>
  );
}
