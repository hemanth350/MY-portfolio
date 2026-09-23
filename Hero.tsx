import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Download, Mail, MapPin } from "lucide-react";
import { highlights, profile } from "../data/portfolio";
import { EASE, publicUrl } from "../lib/utils";
import { DataField } from "./DataField";
import { QueryPanel } from "./QueryPanel";
import { ButtonLink } from "./ui/ButtonLink";
import { GithubIcon, LinkedinIcon } from "./ui/Icons";
import { Magnetic } from "./ui/Magnetic";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

function TypedRoles({ roles }: { roles: string[] }) {
  const reduceMotion = useReducedMotion();
  const [text, setText] = useState(reduceMotion ? roles[0] : "");

  useEffect(() => {
    if (reduceMotion) {
      setText(roles[0]);
      return;
    }
    let roleIndex = 0;
    let length = 0;
    let deleting = false;
    let timer = 0;

    const tick = () => {
      const role = roles[roleIndex];
      if (!deleting) {
        length += 1;
        setText(role.slice(0, length));
        if (length === role.length) {
          deleting = true;
          timer = window.setTimeout(tick, 1600);
          return;
        }
        timer = window.setTimeout(tick, 70);
      } else {
        length -= 1;
        setText(role.slice(0, length));
        if (length === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          timer = window.setTimeout(tick, 350);
          return;
        }
        timer = window.setTimeout(tick, 35);
      }
    };

    setText("");
    timer = window.setTimeout(tick, 900);
    return () => window.clearTimeout(timer);
  }, [roles, reduceMotion]);

  return (
    <p className="h-8 font-display text-lg text-accent-2 sm:text-xl">
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden="true">
        {text}
        <span className="caret ml-1 inline-block h-5 w-0.5 translate-y-1 bg-accent-2" />
      </span>
    </p>
  );
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  // Soft light that follows the mouse. Writes CSS variables directly so React doesn't re-render.
  useEffect(() => {
    const el = heroRef.current;
    if (!el || reduceMotion || !window.matchMedia("(hover: hover)").matches) return;
    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      el.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    return () => el.removeEventListener("pointermove", onMove);
  }, [reduceMotion]);

  const nameWords = profile.name.split(" ");

  return (
    <section
      id="home"
      ref={heroRef}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28"
    >
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-20" />
      <div aria-hidden="true" className="hero-glow absolute inset-0 -z-20" />
      <DataField />

      <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border bg-surface/70 px-3.5 py-1.5 text-sm text-muted backdrop-blur-sm"
          >
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent-2" />
            {profile.statusLine}
          </motion.p>

          <h1
            id="hero-title"
            className="mt-6 font-display text-[clamp(2.25rem,7.4vw,4.5rem)] font-semibold leading-[1.04] tracking-tight"
          >
            {nameWords.map((word, index) => (
              <span key={word} className="-mb-[0.14em] mr-[0.24em] inline-block overflow-hidden pb-[0.14em] align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15 + index * 0.1, ease: EASE }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div variants={item} className="mt-4">
            <TypedRoles roles={profile.roles} />
          </motion.div>

          <motion.p variants={item} className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.intro}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <ButtonLink href="#projects">View Projects</ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink
                href={publicUrl(profile.resumeFile)}
                download={profile.resumeDownloadName}
                variant="secondary"
              >
                <Download aria-hidden="true" className="h-4 w-4" />
                Download Resume
              </ButtonLink>
            </Magnetic>
            <ButtonLink href="#contact" variant="ghost">
              Contact Me
            </ButtonLink>
          </motion.div>

          <motion.div variants={item} className="mt-6 flex flex-wrap items-center gap-2 text-muted">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in a new tab)"
              className="flex h-11 w-11 items-center justify-center rounded-full border bg-surface/70 transition-colors hover:border-accent/60 hover:text-accent"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile (opens in a new tab)"
              className="flex h-11 w-11 items-center justify-center rounded-full border bg-surface/70 transition-colors hover:border-accent/60 hover:text-accent"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label={`Email ${profile.email}`}
              className="flex h-11 w-11 items-center justify-center rounded-full border bg-surface/70 transition-colors hover:border-accent/60 hover:text-accent"
            >
              <Mail aria-hidden="true" className="h-5 w-5" />
            </a>
            <span className="ml-2 inline-flex items-center gap-1.5 text-sm">
              <MapPin aria-hidden="true" className="h-4 w-4" />
              {profile.location}
            </span>
          </motion.div>

          <motion.dl variants={item} className="mt-10 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 border-t pt-6 sm:grid-cols-4">
            {highlights.map((highlight) => (
              <div key={highlight.label}>
                <dt className="font-display text-2xl font-semibold text-fg">{highlight.value}</dt>
                <dd className="mt-1 text-xs leading-snug text-muted">{highlight.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <div className="mx-auto w-full max-w-md lg:max-w-none">
          <QueryPanel />
        </div>
      </div>
    </section>
  );
}
