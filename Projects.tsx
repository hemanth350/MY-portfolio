import { lazy, Suspense, useCallback, useState } from "react";
import { AnimatePresence } from "motion/react";
import { projects, type Project } from "../data/portfolio";
import { ProjectCard } from "./ProjectCard";
import { Section } from "./ui/Section";

// The modal is only needed after a click, so it's split into its own chunk.
const ProjectModal = lazy(() => import("./ProjectModal"));

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <Section
      id="projects"
      title="Projects"
      description={`${projects.length} analytics projects, from dashboarding to forecasting and clustering. Open one for the problem, approach and results.`}
    >
      <div className="space-y-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} onOpen={setSelected} />
        ))}
      </div>

      <Suspense fallback={null}>
        <AnimatePresence>{selected && <ProjectModal key={selected.id} project={selected} onClose={close} />}</AnimatePresence>
      </Suspense>
    </Section>
  );
}
