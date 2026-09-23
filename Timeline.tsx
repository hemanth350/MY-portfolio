import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring } from "motion/react";

/** Vertical timeline whose accent line fills as the section scrolls into view. */
export function Timeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div ref={ref} className="relative pl-8 sm:pl-12">
      <div aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-line-strong sm:left-[11px]" />
      <motion.div
        aria-hidden="true"
        style={{ scaleY }}
        className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-linear-to-b from-accent to-accent-2 sm:left-[11px]"
      />
      <ol className="space-y-12">{children}</ol>
    </div>
  );
}

export function TimelineItem({ children }: { children: ReactNode }) {
  return (
    <li className="relative">
      <span
        aria-hidden="true"
        className="absolute -left-8 top-1.5 h-4 w-4 rounded-full border-2 border-accent bg-bg sm:-left-12 sm:h-6 sm:w-6"
      />
      {children}
    </li>
  );
}
