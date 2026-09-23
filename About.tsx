import { BarChart3, Check, Code2, GraduationCap, Target, type LucideIcon } from "lucide-react";
import { about, type AboutIcon } from "../data/portfolio";
import { EASE } from "../lib/utils";
import { motion } from "motion/react";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";

const ICONS: Record<AboutIcon, LucideIcon> = {
  education: GraduationCap,
  technical: Code2,
  analytics: BarChart3,
  goal: Target,
};

export function About() {
  return (
    <Section id="about" title="About me" description="Who I am, what I'm studying and the kind of work I want to do.">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
        <Reveal>
          <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <h3 className="mt-10 font-display text-lg font-semibold">{about.buildingTitle}</h3>
          <ul className="mt-4 space-y-3">
            {about.building.map((entry) => (
              <li key={entry} className="flex gap-3 text-muted">
                <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-accent-2" />
                <span>{entry}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <ul className="grid gap-4 sm:grid-cols-2">
          {about.cards.map((card, index) => {
            const Icon = ICONS[card.icon];
            return (
              <motion.li
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
                className="rounded-2xl border bg-surface p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{card.body}</p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
