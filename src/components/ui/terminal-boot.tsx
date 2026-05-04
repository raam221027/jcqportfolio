import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type LineKind =
  | "command"
  | "step"
  | "check"
  | "info"
  | "indent"
  | "success"
  | "ready"
  | "blank";
type ScriptLine = { text: string; kind: LineKind };

const PROMPT = "npm run init:portfolio";

const SCRIPT: ScriptLine[] = [
  { text: "", kind: "blank" },
  { text: "> raam221027@1.0.0 init:portfolio", kind: "command" },
  { text: "", kind: "blank" },
  { text: "[1/6] Initializing Vite + React + TypeScript...", kind: "step" },
  { text: "[2/6] Resolving dependencies...", kind: "step" },
  { text: "[3/6] Compiling source...", kind: "step" },
  { text: "[4/6] Applying Tailwind CSS...", kind: "step" },
  { text: "[5/6] Building UI components...", kind: "step" },
  { text: "[6/6] Optimizing assets...", kind: "step" },
  { text: "", kind: "blank" },
  { text: "Build complete", kind: "check" },
  { text: "", kind: "blank" },
  { text: "Candidate", kind: "info" },
  { text: "Joemar Questadio", kind: "indent" },
  { text: "Full Stack Developer", kind: "indent" },
  { text: "", kind: "blank" },
  { text: "Frontend Stack", kind: "info" },
  { text: "React • TypeScript • Vite • Tailwind CSS", kind: "indent" },
  { text: "", kind: "blank" },
  { text: "Backend Stack", kind: "info" },
  { text: "Laravel • PHP", kind: "indent" },
  { text: "", kind: "blank" },
  { text: "Databases", kind: "info" },
  { text: "MySQL • Microsoft SQL Server (MSSQL)", kind: "indent" },
  { text: "", kind: "blank" },
  { text: "Done in 2.06s", kind: "success" },
  { text: "[ready] Serving portfolio at https://raam221027.github.io", kind: "ready" },
];

const PAUSE_AFTER_RUN_MS = 2000;
const PAUSE_AFTER_PROMPT_MS = 420;
const PAUSE_AFTER_BUILD_MS = 1000;
const LINE_MS = 500;
const LINE_MS_FAST = 100;

const RUN_END = "npm run".length;
const BUILD_COMPLETE_INDEX = SCRIPT.findIndex((l) => l.text === "Build complete");

function nextTypeDelay(charIndex: number): number {
  const ch = PROMPT[charIndex - 1];
  const base = 70 + Math.random() * 90;
  if (ch === " " || ch === ":") return base + 60 + Math.random() * 80;
  if (ch && /[a-zA-Z]/.test(ch) && Math.random() < 0.15) return base + 90;
  return base;
}

type Phase = "typing" | "revealing" | "holding";

export function TerminalBoot({ className }: { className?: string }) {
  const [typed, setTyped] = useState(0);
  const [revealed, setRevealed] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const clearTimer = () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    if (phase === "typing") {
      if (typed < PROMPT.length) {
        const delay = typed === RUN_END ? PAUSE_AFTER_RUN_MS : nextTypeDelay(typed);
        timerRef.current = window.setTimeout(() => setTyped((n) => n + 1), delay);
      } else {
        timerRef.current = window.setTimeout(() => setPhase("revealing"), PAUSE_AFTER_PROMPT_MS);
      }
    } else if (phase === "revealing") {
      if (revealed < SCRIPT.length) {
        const lineDelay =
          revealed === BUILD_COMPLETE_INDEX + 1
            ? PAUSE_AFTER_BUILD_MS
            : revealed > BUILD_COMPLETE_INDEX
              ? LINE_MS_FAST
              : LINE_MS;
        timerRef.current = window.setTimeout(() => setRevealed((n) => n + 1), lineDelay);
      } else {
        timerRef.current = window.setTimeout(() => setPhase("holding"), 400);
      }
    }

    return clearTimer;
  }, [phase, typed, revealed]);

  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-2xl border border-surface-2 bg-bg-deep font-mono shadow-lg",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-surface-2 bg-bg-elevated px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-auto text-[10px] tracking-wide text-fg-dim">
          — jcq — portfolio
        </span>
      </div>
      <div className="flex-1 overflow-hidden p-4 text-[11px] leading-relaxed sm:text-xs">
        <div className="text-fg">
          <span className="text-brand-cyan400">›</span>{" "}
          <span>{PROMPT.slice(0, typed)}</span>
          {phase === "typing" && <Caret />}
        </div>
        <ul className="mt-1.5 flex flex-col gap-0.5">
          {SCRIPT.slice(0, revealed).map((line, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Row line={line} />
            </motion.li>
          ))}
        </ul>
        {phase === "holding" && (
          <div className="mt-2 text-fg">
            <span className="text-brand-cyan400">›</span> <Caret />
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ line }: { line: ScriptLine }) {
  switch (line.kind) {
    case "blank":
      return (
        <span aria-hidden="true" className="block leading-none">
          &nbsp;
        </span>
      );
    case "command":
      return <span className="text-fg-dim">{line.text}</span>;
    case "step": {
      const tag = line.text.slice(0, 5);
      const rest = line.text.slice(5);
      return (
        <span className="text-fg-muted">
          <span className="text-brand-cyan400">{tag}</span>
          {rest}
        </span>
      );
    }
    case "check":
      return (
        <span className="text-fg">
          <span className="text-success">✔</span> {line.text}
        </span>
      );
    case "info":
      return (
        <span className="text-fg">
          <span className="text-brand-cyan400">ℹ</span> {line.text}
        </span>
      );
    case "indent":
      return <span className="ml-4 text-fg-muted">{line.text}</span>;
    case "success":
      return (
        <span className="text-success">
          <span className="text-success">✓</span> {line.text}
        </span>
      );
    case "ready": {
      const urlIdx = line.text.indexOf("https://");
      const head = urlIdx >= 0 ? line.text.slice(0, urlIdx) : line.text;
      const url = urlIdx >= 0 ? line.text.slice(urlIdx) : "";
      const tagMatch = head.match(/^(\[[^\]]+\])\s*(.*)$/);
      const tag = tagMatch ? tagMatch[1] : "";
      const after = tagMatch ? tagMatch[2] : head;
      return (
        <span className="text-fg-muted">
          {tag && <span className="text-brand-indigo400">{tag}</span>} {after}
          {url && (
            <span className="text-brand-cyan400 underline decoration-dotted underline-offset-4">
              {url}
            </span>
          )}
        </span>
      );
    }
  }
}

function Caret() {
  return (
    <span
      aria-hidden="true"
      className="ml-0.5 inline-block h-3 w-[7px] translate-y-[2px] animate-pulse bg-brand-cyan400"
    />
  );
}
