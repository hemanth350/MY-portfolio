import { useMemo } from "react";
import { motion } from "motion/react";
import type { ProjectVisualKind } from "../data/portfolio";
import { EASE } from "../lib/utils";

/** Small seeded generator so the scatter plot looks the same on every load. */
function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

const grow = (index: number) => ({
  initial: { scaleY: 0 },
  whileInView: { scaleY: 1 },
  viewport: { once: true },
  transition: { duration: 0.6, delay: 0.1 + index * 0.06, ease: EASE },
  style: { originY: 1 },
});

function DashboardVisual() {
  const bars = [46, 62, 38, 78, 54, 92, 66, 48];
  return (
    <>
      {[0, 1, 2].map((i) => (
        <rect key={i} x={24 + i * 122} y={22} width={108} height={44} rx={8} className="fill-accent/10 stroke-accent/30" />
      ))}
      {[0, 1, 2].map((i) => (
        <rect key={`k${i}`} x={36 + i * 122} y={34} width={44} height={8} rx={4} className="fill-accent/60" />
      ))}
      <line x1={24} x2={376} y1={214} y2={214} className="stroke-line-strong" />
      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={32 + i * 42}
          y={214 - h * 1.15}
          width={26}
          height={h * 1.15}
          rx={4}
          className={i === 5 ? "fill-accent-2" : "fill-accent/70"}
          {...grow(i)}
        />
      ))}
    </>
  );
}

function ForecastVisual() {
  return (
    <>
      {[70, 110, 150, 190].map((y) => (
        <line key={y} x1={24} x2={376} y1={y} y2={y} className="stroke-line" />
      ))}
      <path d="M264 96 L376 44 L376 126 L264 118 Z" className="fill-accent-2/15" />
      <motion.path
        d="M24 178 C 60 160, 84 190, 120 150 S 190 140, 226 112 S 250 100, 264 106"
        fill="none"
        strokeWidth={3}
        strokeLinecap="round"
        className="stroke-accent"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: EASE }}
      />
      <motion.path
        d="M264 106 C 296 98, 330 78, 376 82"
        fill="none"
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray="6 7"
        className="stroke-accent-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1 }}
      />
      <line x1={264} x2={264} y1={30} y2={214} strokeDasharray="3 5" className="stroke-line-strong" />
    </>
  );
}

function ClustersVisual() {
  const points = useMemo(() => {
    const random = seededRandom(7);
    const centers = [
      { x: 110, y: 90, className: "fill-accent" },
      { x: 270, y: 80, className: "fill-accent-2" },
      { x: 200, y: 175, className: "fill-fg/70" },
    ];
    return centers.flatMap((center, c) =>
      Array.from({ length: 16 }, (_, i) => ({
        key: `${c}-${i}`,
        cx: center.x + (random() - 0.5) * 84,
        cy: center.y + (random() - 0.5) * 64,
        className: center.className,
        order: c * 16 + i,
      })),
    );
  }, []);

  return (
    <>
      <line x1={24} x2={376} y1={214} y2={214} className="stroke-line-strong" />
      <line x1={24} x2={24} y1={24} y2={214} className="stroke-line-strong" />
      {points.map((point) => (
        <motion.circle
          key={point.key}
          cx={point.cx}
          cy={point.cy}
          r={5}
          className={point.className}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.9 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: point.order * 0.02 }}
        />
      ))}
    </>
  );
}

/** Decorative artwork for each project card. Shapes only, not real project data. */
export function ProjectVisual({ kind }: { kind: ProjectVisualKind }) {
  return (
    <svg viewBox="0 0 400 240" role="presentation" aria-hidden="true" className="h-full w-full">
      {kind === "dashboard" && <DashboardVisual />}
      {kind === "forecast" && <ForecastVisual />}
      {kind === "clusters" && <ClustersVisual />}
    </svg>
  );
}
