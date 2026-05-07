import PageShell, { PageHeader } from "@/components/PageShell";
import { TerminalBoot } from "@/components/ui/terminal-boot";
import InfoCard from "@/components/InfoCard";
import ThemedAvatar from "@/components/ThemedAvatar";
import { profile, valueIBring } from "@/data/profile";

export default function AboutPage() {
  return (
    <PageShell className="mx-auto max-w-5xl">
      <PageHeader
        eyebrow="About"
        title={
          <>
            A little about <span className="gradient-text">me</span>.
          </>
        }
        subtitle="Booting the portfolio — a quick init log of how it came together."
      />

      <div className="mb-10 grid items-center justify-items-center gap-6 sm:grid-cols-2 ">
        <ThemedAvatar />
        <TerminalBoot className="aspect-square h-full max-h-[500px] w-full max-w-[500px]" />
      </div>

      <div className="mb-3.5 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-2">
        <InfoCard title="Bio" accent="cyan">
          <p className="mb-2 text-sm leading-relaxed text-fg">{profile.bio}</p>
          <p className="text-[13px] leading-relaxed text-fg-muted">{profile.bioMore}</p>
        </InfoCard>
      <div className="grid gap-3.5 lg:grid-cols-[1.2.0fr_1fr]">
        <InfoCard title="Value I Bring" accent="cyan">
          <ul className="flex flex-col gap-2">
            {valueIBring.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[13px] text-fg-muted">
                <span className="font-mono text-brand-cyan400">›</span>
                {item}
              </li>
            ))}
          </ul>
        </InfoCard>
        
      </div>
        
      </div>

      <div className="grid gap-3.5 sm:grid-cols-3">
            <InfoCard title="Development Approach" accent="cyan">
          <ul className="flex flex-col gap-2">
            {profile.devApproach.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[13px] text-fg-muted">
                <span className="font-mono text-brand-cyan400">›</span>
                {item}
              </li>
            ))}
          </ul>
        </InfoCard>

        <InfoCard title="Quick facts" accent="indigo">
          <ul className="flex flex-col gap-1.5 text-[13px] text-fg-muted">
            {profile.facts.map((f) => (
              <li key={f.label}>
                <span className="mr-2 text-fg-dim">{f.label}</span>
                <span className={f.success ? "text-success" : ""}>{f.value}</span>
              </li>
            ))}
          </ul>
        </InfoCard>

        <InfoCard title="Location" accent="success">
          <div className="mb-1 text-base font-semibold text-fg">{profile.location}</div>
          <div className="flex items-center gap-2 text-sm text-fg-muted">
            <svg
              aria-hidden="true"
              viewBox="0 0 7410 3900"
              className="h-3.5 w-auto rounded-[2px] ring-1 ring-surface-2"
            >
              <rect width="7410" height="3900" fill="#b22234" />
              <g fill="#fff">
                <rect y="300" width="7410" height="300" />
                <rect y="900" width="7410" height="300" />
                <rect y="1500" width="7410" height="300" />
                <rect y="2100" width="7410" height="300" />
                <rect y="2700" width="7410" height="300" />
                <rect y="3300" width="7410" height="300" />
              </g>
              <rect width="2964" height="2100" fill="#3c3b6e" />
              <g fill="#fff">
                {Array.from({ length: 9 }).flatMap((_, row) =>
                  Array.from({
                    length: row % 2 === 0 ? 6 : 5,
                  }).map((_, col) => (
                    <circle
                      key={`${row}-${col}`}
                      cx={247 + col * 494 + (row % 2 === 1 ? 247 : 0)}
                      cy={210 + row * 210}
                      r="91"
                    />
                  )),
                )}
              </g>
            </svg>
            <span>{profile.country}</span>
          </div>
          <div className="mt-2.5 font-mono text-[11px] text-fg-dim"></div>
        </InfoCard>
      </div>
    </PageShell>
  );
}
