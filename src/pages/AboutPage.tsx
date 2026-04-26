import PageShell, { PageHeader } from "@/components/PageShell";
import CompareSlider from "@/components/CompareSlider";
import InfoCard from "@/components/InfoCard";
import Pill from "@/components/Pill";
import { profile, skills } from "@/data/profile";
import profileImg from "@/assets/profile.png";
import skillsImg from "@/assets/skills.png";

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
        subtitle="Hover the slider to flip between my profile and skills."
      />

      <div className="mx-auto mb-10 max-w-md">
        <CompareSlider first={profileImg} second={skillsImg} />
      </div>

      <div className="mb-3.5 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard title="Bio" accent="cyan">
          <p className="mb-2 text-sm leading-relaxed text-fg">{profile.bio}</p>
          <p className="text-[13px] leading-relaxed text-fg-muted">{profile.bioMore}</p>
        </InfoCard>
        <InfoCard title="Currently" accent="indigo">
          <ul className="flex flex-col gap-2">
            {profile.currently.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[13px] text-fg-muted">
                <span className="font-mono text-brand-cyan400">›</span>
                {item}
              </li>
            ))}
          </ul>
        </InfoCard>
        <InfoCard title="Location" accent="success">
          <div className="mb-1 text-base font-semibold text-fg">{profile.location}</div>
          <div className="text-[13px] leading-relaxed text-fg-muted">
            Originally from {profile.origin}.
          </div>
          <div className="mt-2.5 font-mono text-[11px] text-fg-dim">{profile.timezone}</div>
        </InfoCard>
      </div>

      <div className="grid gap-3.5 lg:grid-cols-[1.2fr_1fr]">
        <InfoCard title="Tech I use" accent="cyan">
          <div className="flex flex-wrap gap-1.5">
            {skills.map((t) => (
              <Pill key={t}>{t}</Pill>
            ))}
          </div>
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
      </div>
    </PageShell>
  );
}
