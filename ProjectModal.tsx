import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ExternalLink, X } from "lucide-react";
import type { Project } from "../data/portfolio";
import { profile } from "../data/portfolio";
import { EASE } from "../lib/utils";
import { GithubIcon } from "./ui/Icons";
import { TechTag } from "./ui/TechTag";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h3 className="font-display text-base font-semibold">{title}</h3>
      <ul className="mt-3 space-y-2.5">
        {items.map((entry) => (
          <li key={entry} className="flex gap-3 leading-relaxed text-muted">
            <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2" />
            <span>{entry}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = `${project.id}-modal-title`;

  useEffect(() => {
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.98 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="relative max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-2xl border border-line-strong bg-surface sm:rounded-2xl"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b bg-surface/95 px-5 py-4 backdrop-blur sm:px-8">
          <h2 id={titleId} className="font-display text-lg font-semibold leading-snug sm:text-xl">
            {project.title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-muted transition-colors hover:border-accent/60 hover:text-fg"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-8 px-5 py-6 sm:px-8 sm:py-8">
          <section>
            <h3 className="font-display text-base font-semibold">Overview</h3>
            <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>
          </section>

          <section>
            <h3 className="font-display text-base font-semibold">Problem</h3>
            <p className="mt-3 leading-relaxed text-muted">{project.problem}</p>
          </section>

          <DetailList title="Approach" items={project.approach} />
          <DetailList title="Key features" items={project.features} />
          <DetailList title="Results" items={project.results} />

          <section>
            <h3 className="font-display text-base font-semibold">My contribution</h3>
            <p className="mt-3 leading-relaxed text-muted">{project.contribution}</p>
          </section>

          <section>
            <h3 className="font-display text-base font-semibold">Technologies</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <li key={tech}>
                  <TechTag label={tech} />
                </li>
              ))}
            </ul>
          </section>

          {project.screenshots && project.screenshots.length > 0 && (
            <section>
              <h3 className="font-display text-base font-semibold">Screenshots</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {project.screenshots.map((shot) => (
                  <img
                    key={shot.src}
                    src={`${import.meta.env.BASE_URL}${shot.src}`}
                    alt={shot.alt}
                    loading="lazy"
                    className="w-full rounded-lg border"
                  />
                ))}
              </div>
            </section>
          )}

          <div className="flex flex-wrap gap-x-6 gap-y-2 border-t pt-6">
            <a
              href={project.repoUrl ?? profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent hover:underline"
            >
              <GithubIcon className="h-4 w-4" />
              {project.repoUrl ? "View source code" : "Browse my GitHub"}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent hover:underline"
              >
                <ExternalLink aria-hidden="true" className="h-4 w-4" />
                Live demo
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
