export type ProjectStatus = "Shipped" | "Featured" | "Available";

export interface Project {
  title: string;
  desc: string;
  tags: string[];
  status: ProjectStatus;
}

export const projects: Project[] = [
  {
    title: "Healthy Self Kiosk",
    desc: "Self-ordering food kiosk with touch-first UX, real-time orders, and a Laravel-backed admin panel.",
    tags: ["Laravel", "React", "MySQL"],
    status: "Shipped",
  },
  {
    title: "Always Coffee",
    desc: "Membership and POS web app for a local coffee shop, with QR-code loyalty and daily reports.",
    tags: ["React", "TypeScript", "Tailwind"],
    status: "Featured",
  },
  {
    title: "Portfolio v2",
    desc: "This site. React 19, Vite, Tailwind v4, Aceternity-style components, custom dot-pattern background.",
    tags: ["React", "Vite", "Framer Motion"],
    status: "Available",
  },
];
