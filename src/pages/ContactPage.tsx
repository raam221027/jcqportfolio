import { useEffect, useRef, useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import { useTheme } from "next-themes";
import PageShell, { PageHeader } from "@/components/PageShell";
import Field from "@/components/Field";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;

type Status = "idle" | "sending" | "sent" | "error" | "captcha-missing";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const captchaTheme = mounted && resolvedTheme === "light" ? "light" : "dark";

  useEffect(() => {
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY || !RECAPTCHA_SITE_KEY) {
      console.warn(
        "[ContactPage] Missing EmailJS / reCAPTCHA env vars — form will not submit. " +
          "Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY, " +
          "and VITE_RECAPTCHA_SITE_KEY in .env.local, then restart the dev server.",
      );
    }
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (company) return;

    if (!captchaToken) {
      setStatus("captcha-missing");
      return;
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: name,
          from_email: email,
          message,
          "g-recaptcha-response": captchaToken,
        },
        { publicKey: PUBLIC_KEY },
      );
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
      setCaptchaToken(null);
      recaptchaRef.current?.reset();
    } catch (err) {
      console.error("[ContactPage] EmailJS send failed", err);
      setStatus("error");
      setCaptchaToken(null);
      recaptchaRef.current?.reset();
    }
  }

  const buttonLabel =
    status === "sending"
      ? "Sending…"
      : status === "sent"
        ? "Sent — thank you"
        : "Send message";

  return (
    <PageShell className="mx-auto max-w-lg">
      <PageHeader
        eyebrow="Contact"
        title="Let's build something."
        subtitle="I read every message. Quick replies on weekdays."
      />
      <form onSubmit={onSubmit} className="flex flex-col gap-3.5" noValidate={false}>
        <Field
          label="Your email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <Field
          label="Name"
          type="text"
          placeholder="What should I call you?"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
        />
        <Field
          label="Message"
          textarea
          placeholder="Tell me about your project…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          aria-hidden="true"
          className="hidden"
        />

        {RECAPTCHA_SITE_KEY ? (
          <div className="mt-1">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={RECAPTCHA_SITE_KEY}
              theme={captchaTheme}
              onChange={(token) => {
                setCaptchaToken(token);
                if (status === "captcha-missing") setStatus("idle");
              }}
              onExpired={() => setCaptchaToken(null)}
            />
          </div>
        ) : (
          <p className="text-xs text-red-400">
            reCAPTCHA site key is not configured. Set VITE_RECAPTCHA_SITE_KEY in .env.local.
          </p>
        )}

        {status === "captcha-missing" && (
          <p className="text-xs text-red-400">Please complete the captcha.</p>
        )}
        {status === "error" && (
          <p className="text-xs text-red-400">
            Something went wrong sending your message. Please try again.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-1.5 rounded-lg bg-brand-cyan px-6 py-3 text-sm font-semibold text-[#031218] transition-shadow hover:shadow-glow-cyan disabled:cursor-not-allowed disabled:opacity-60"
        >
          {buttonLabel}
        </button>
      </form>
    </PageShell>
  );
}
