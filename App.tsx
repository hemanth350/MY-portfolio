import { MotionConfig } from "motion/react";
import { About } from "./components/About";
import { BackToTop } from "./components/BackToTop";
import { Certifications } from "./components/Certifications";
import { Contact } from "./components/Contact";
import { CustomCursor } from "./components/CustomCursor";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Projects } from "./components/Projects";
import { ScrollProgress } from "./components/ScrollProgress";
import { Skills } from "./components/Skills";
import { certifications, education, experience, navItems, projects, skillGroups } from "./data/portfolio";
import { useActiveSection } from "./hooks/useActiveSection";
import { useTheme } from "./hooks/useTheme";

const sectionIds = navItems.map((item) => item.id);

export default function App() {
  const { theme, toggle } = useTheme();
  const active = useActiveSection(sectionIds);

  return (
    // reducedMotion="user" makes every Motion animation respect the OS "reduce motion" setting.
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <CustomCursor />
      <Navbar items={navItems} active={active} theme={theme} onToggleTheme={toggle} />

      <main id="main">
        <Hero />
        <About />
        {skillGroups.length > 0 && <Skills />}
        {projects.length > 0 && <Projects />}
        {experience.length > 0 && <Experience />}
        {education.length > 0 && <Education />}
        {certifications.length > 0 && <Certifications />}
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </MotionConfig>
  );
}
