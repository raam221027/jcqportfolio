import { useState, type FormEvent } from "react";
import PageShell, { PageHeader } from "@/components/PageShell";
import Field from "@/components/Field";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <PageShell className="mx-auto max-w-lg">
      <PageHeader
        eyebrow="Contact"
        title="Let's build something."
        subtitle="I read every message. Quick replies on weekdays."
      />
      <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
        <Field label="Your email" type="email" placeholder="you@example.com" />
        <Field label="Name" type="text" placeholder="What should I call you?" />
        <Field label="Message" textarea placeholder="Tell me about your project…" />
        <button
          type="submit"
          className="mt-1.5 rounded-lg bg-brand-cyan px-6 py-3 text-sm font-semibold text-[#031218] transition-shadow hover:shadow-glow-cyan"
        >
          {sent ? "Sent — thank you" : "Send message"}
        </button>
      </form>
    </PageShell>
  );
}
