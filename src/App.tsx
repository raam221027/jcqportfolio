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

export default function App() {
  const { resolvedTheme } = useTheme();
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
