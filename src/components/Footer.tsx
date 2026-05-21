import { Facebook, Github, Instagram, Linkedin } from "lucide-react";

const SOCIALS = [
  { href: "https://www.facebook.com/raam221027", label: "Facebook", Icon: Facebook },
  { href: "https://github.com/raam221027", label: "GitHub", Icon: Github },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: Linkedin },
  { href: "https://instagram.com", label: "Instagram", Icon: Instagram },
];

export default function Footer() {
  return (
    <footer className="border-t border-surface-1 px-4 py-4 sm:px-6 sm:py-3">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row sm:gap-6">
        <p className="text-sm text-fg-muted">&copy; 2026 JQ. All rights reserved.</p>
        <div className="flex items-center gap-2">
          {SOCIALS.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="rounded-md border border-surface-2 bg-surface-1/50 p-2 text-fg-muted transition-colors hover:text-brand-cyan"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
