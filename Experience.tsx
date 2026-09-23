import { experience } from "../data/portfolio";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { TechTag } from "./ui/TechTag";
import { Timeline, TimelineItem } from "./ui/Timeline";

export function Experience() {
  return (
    <Section
      id="experience"
      title="Experience"
      description="Two data analytics internships in 2026, focused on sales analysis, SQL validation, dashboards and reporting."
    >
      <Timeline>
        {experience.map((entry) => (
          <TimelineItem key={entry.id}>
            <Reveal>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight">{entry.role}</h3>
                  <p className="mt-1 text-accent">{entry.company}</p>
                </div>
                <p className="text-sm text-muted">{entry.period}</p>
              </div>

              <ul className="mt-5 max-w-3xl space-y-3">
                {entry.points.map((point) => (
                  <li key={point} className="flex gap-3 leading-relaxed text-muted">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
                {entry.tech.map((tech) => (
                  <li key={tech}>
                    <TechTag label={tech} />
                  </li>
                ))}
              </ul>
            </Reveal>
          </TimelineItem>
        ))}
      </Timeline>
    </Section>
  );
}
