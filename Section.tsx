import type { ReactNode } from "react";
import { cx } from "../../lib/utils";
import { Reveal } from "./Reveal";

interface SectionProps {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, title, description, children, className }: SectionProps) {
  const headingId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={headingId} className={cx("relative py-20 sm:py-28", className)}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <h2 id={headingId} className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {description && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
        </Reveal>
        <div className="mt-12 sm:mt-14">{children}</div>
      </div>
    </section>
  );
}
