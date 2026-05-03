import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type LineKind = "check" | "info" | "list" | "success" | "url";
type ScriptLine = { text: string; kind: LineKind };

const PROMPT = "npm raam221027@portfolio init";

const SCRIPT: ScriptLine[] = [
  { text: "Design checks.", kind: "check" },
  { text: "Setting up portfolio framework using React Typescript.", kind: "check" },
  { text: "Implementing responsive design with Tailwind CSS.", kind: "check" },
  { text: "Creating component architecture.", kind: "check" },
  { text: "Building project showcase section.", kind: "check" },
  { text: "Adding skills and expertise section.", kind: "check" },
  { text: "Implementing contact form functionality.", kind: "check" },
  { text: "Optimizing images and assets.", kind: "check" },
  { text: "Setting up animations and transitions.", kind: "check" },
  { text: "About:", kind: "info" },
  { text: "Coming Soon", kind: "list" },
  { text: "Success! Portfolio initialization completed.", kind: "success" },
  { text: "Launching soon at raam221027.github.io", kind: "url" },
];

const TYPE_MS = 38;
const LINE_MS = 200;
const HOLD_MS = 4500;
const PAUSE_AFTER_PROMPT_MS = 420;

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
        timerRef.current = window.setTimeout(() => setTyped((n) => n + 1), TYPE_MS);
      } else {
        timerRef.current = window.setTimeout(() => setPhase("revealing"), PAUSE_AFTER_PROMPT_MS);
      }
    } else if (phase === "revealing") {
      if (revealed < SCRIPT.length) {
        timerRef.current = window.setTimeout(() => setRevealed((n) => n + 1), LINE_MS);
      } else {
        timerRef.current = window.setTimeout(() => setPhase("holding"), 400);
      }
    } else {
      timerRef.current = window.setTimeout(() => {
        setTyped(0);
        setRevealed(0);
        setPhase("typing");
      }, HOLD_MS);
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
          — zsh — portfolio
        </span>
      </div>
      <div className="flex-1 overflow-hidden p-4 text-[11px] leading-relaxed sm:text-xs">
        <div className="text-fg">
          <span className="text-brand-cyan400">›</span>{" "}
          <span>{PROMPT.slice(0, typed)}</span>
          {phase === "typing" && <Caret />}
        </div>
        <ul className="mt-1.5 flex flex-col gap-0.5">
          {SCRIPT.slice(0, revealed).map((line) => (
            <li key={line.text}>
              <Row line={line} />
            </li>
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
    case "check":
      return (
        <span className="text-fg-muted">
          <span className="text-success">✔</span> {line.text}
        </span>
      );
    case "info":
      return (
        <span className="text-fg">
          <span className="text-brand-cyan400">ℹ</span> {line.text}
        </span>
      );
    case "list":
      return (
        <span className="text-fg-muted">
          <span className="ml-3 text-fg-dim">–</span> {line.text}
        </span>
      );
    case "success":
      return (
        <span className="text-success">
          <span className="text-success">✓</span> {line.text}
        </span>
      );
    case "url":
      return (
        <span className="text-fg-muted">
          Launching soon at{" "}
          <span className="text-brand-indigo400 underline decoration-dotted underline-offset-4">
            raam221027.github.io
          </span>
        </span>
      );
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
