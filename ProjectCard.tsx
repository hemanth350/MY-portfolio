import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { Project } from "../data/portfolio";
import { profile } from "../data/portfolio";
import { cx, EASE } from "../lib/utils";
import { ProjectVisual } from "./ProjectVisual";
import { GithubIcon } from "./ui/Icons";
import { TechTag } from "./ui/TechTag";

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}

export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const reversed = index % 2 === 1;
  const githubHref = project.repoUrl ?? profile.github;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.65, ease: EASE }}
      className="group relative overflow-hidden rounded-2xl border bg-surface transition-[translate,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_24px_60px_-24px_rgb(var(--glow-rgb)_/_0.5)] focus-within:border-accent/60"
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-[5fr_6fr]">
        <div
          className={cx(
            "relative aspect-[16/10] overflow-hidden border-b bg-surface-2 md:aspect-auto md:min-h-[280px] md:border-b-0",
            reversed ? "md:order-2 md:border-l" : "md:border-r",
          )}
        >
          <div className="absolute inset-0 p-4 transition-transform duration-700 ease-out group-hover:scale-105 sm:p-6">
            <ProjectVisual kind={project.visual} />
          </div>
        </div>

        <div className="flex flex-col p-6 sm:p-8">
          <h3 className="font-display text-xl font-semibold leading-snug tracking-tight sm:text-2xl">{project.title}</h3>
          <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>

          {project.metric && (
            <p className="mt-5 flex items-baseline gap-2">
              <span className="font-display text-2xl font-semibold text-accent-2">{project.metric.value}</span>
              <span className="text-sm text-muted">{project.metric.label}</span>
            </p>
          )}

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
            {project.tech.map((tech, i) => (
              <li
                key={tech}
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <TechTag label={tech} className="transition-colors duration-300 group-hover:border-accent/40" />
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
            <button
              type="button"
              onClick={() => onOpen(project)}
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent after:absolute after:inset-0 after:content-['']"
            >
              View details
              <span className="sr-only"> for {project.title}</span>
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </button>
            <a
              href={githubHref}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
            >
              <GithubIcon className="h-4 w-4" />
              {project.repoUrl ? "Source code" : "More on GitHub"}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
