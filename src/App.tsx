import { useEffect } from "react";
import { useTheme } from "next-themes";
import DotPattern from "@/components/DotPattern";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ScrollToTop from "@/components/ScrollToTop";
import AboutPage from "@/pages/AboutPage";
import ProjectsPage from "@/pages/ProjectsPage";
import CertificatesPage from "@/pages/CertificatesPage";
import ContactPage from "@/pages/ContactPage";
import { scrollToSection } from "@/lib/smoothScroll";

export default function App() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as Element | null)?.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const id = hash.slice();
      if (!document.getElementById(id)) return;
      e.preventDefault();
      scrollToSection(id);
      history.pushState(null, "", hash);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      {resolvedTheme !== "light" && <DotPattern />}
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <AboutPage />
          <ProjectsPage />
          <CertificatesPage />
          <ContactPage />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}
