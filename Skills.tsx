import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  BarChart3,
  BrainCircuit,
  Code2,
  Database,
  LineChart,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { skillGroups, type SkillIcon } from "../data/portfolio";
import { cx, EASE } from "../lib/utils";
import { Section } from "./ui/Section";
import { TiltCard } from "./ui/TiltCard";

const ICONS: Record<SkillIcon, LucideIcon> = {
  code: Code2,
  analysis: LineChart,
  bi: BarChart3,
  ml: BrainCircuit,
  database: Database,
  pipeline: Workflow,
  tools: Wrench,
};

const ALL = "all";

export function Skills() {
  const [active, setActive] = useState<string>(ALL);
  const visibleGroups = active === ALL ? skillGroups : skillGroups.filter((group) => group.id === active);
  const filters = [{ id: ALL, label: "All" }, ...skillGroups.map(({ id, label }) => ({ id, label }))];

  return (
    <Section
      id="skills"
      title="Skills and tools"
      description="Grouped by how I use them, from cleaning data in Python to presenting it in Power BI."
    >
      <div role="group" aria-label="Filter skills by category" className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const selected = active === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(filter.id)}
              className={cx(
                "min-h-11 rounded-full border px-4 text-sm font-medium transition-colors",
                selected
                  ? "border-transparent bg-solid text-on-solid"
                  : "bg-surface text-muted hover:border-line-strong hover:text-fg",
              )}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visibleGroups.map((group) => {
            const Icon = ICONS[group.icon];
            return (
              <motion.div
                key={group.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <TiltCard className="h-full rounded-2xl border bg-surface p-6 transition-colors hover:border-accent/40">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-base font-semibold">{group.label}</h3>
                  </div>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <li
                        key={skill}
                        className="rounded-lg border bg-surface-2 px-3 py-1.5 text-sm text-fg transition-[transform,border-color,color] duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </Section>
  );
}
