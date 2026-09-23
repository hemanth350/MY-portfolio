import { education } from "../data/portfolio";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { Timeline, TimelineItem } from "./ui/Timeline";

export function Education() {
  return (
    <Section id="education" title="Education">
      <Timeline>
        {education.map((entry) => (
          <TimelineItem key={entry.id}>
            <Reveal>
              <p className="font-display text-sm font-medium text-accent-2">{entry.period}</p>
              <h3 className="mt-2 max-w-2xl font-display text-xl font-semibold leading-snug tracking-tight">
                {entry.degree}
              </h3>
              <p className="mt-2 text-muted">{entry.institution}</p>
              <p className="mt-4 inline-flex rounded-md border bg-surface px-3 py-1.5 text-sm font-medium">{entry.grade}</p>
            </Reveal>
          </TimelineItem>
        ))}
      </Timeline>
    </Section>
  );
}
