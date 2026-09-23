import { motion } from "motion/react";
import { Award, ExternalLink } from "lucide-react";
import { certifications } from "../data/portfolio";
import { EASE } from "../lib/utils";
import { Section } from "./ui/Section";

export function Certifications() {
  return (
    <Section
      id="certifications"
      title="Certifications"
      description="Short courses and job simulations that back up the tools and skills above."
    >
      <ul className="grid gap-4 md:grid-cols-2">
        {certifications.map((cert, index) => (
          <motion.li
            key={cert.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
            transition={{ duration: 0.5, delay: (index % 2) * 0.08, ease: EASE }}
            className="group flex items-start gap-4 rounded-2xl border bg-surface p-5 transition-[translate,border-color] duration-300 hover:-translate-y-1 hover:border-accent/50 sm:p-6"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
              <Award aria-hidden="true" className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h3 className="font-display text-base font-semibold leading-snug">{cert.name}</h3>
              <p className="mt-1 text-sm text-muted">
                {cert.issuer}
                {cert.year ? ` · ${cert.year}` : ""}
              </p>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                >
                  View credential
                  <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </div>
          </motion.li>
        ))}
      </ul>
    </Section>
  );
}
