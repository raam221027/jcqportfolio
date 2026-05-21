import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import DotPattern from "@/components/DotPattern";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutPage from "@/pages/AboutPage";
import ProjectsPage from "@/pages/ProjectsPage";
import CertificatesPage from "@/pages/CertificatesPage";
import ContactPage from "@/pages/ContactPage";

export default function App() {
  const location = useLocation();
  const { resolvedTheme } = useTheme();
  return (
    <>
      {resolvedTheme !== "light" && <DotPattern />}
      <div className="relative z-10">
        <Header />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/certificates" element={<CertificatesPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </>
  );
}
