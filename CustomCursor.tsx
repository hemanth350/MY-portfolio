import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { cx } from "../lib/utils";

const INTERACTIVE = "a, button, input, textarea, [role='button']";

/** A soft ring that trails the pointer. Desktop mouse only; the native cursor stays visible. */
export function CustomCursor() {
  const hasFinePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reduceMotion = useReducedMotion();
  const enabled = hasFinePointer && !reduceMotion;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 450, damping: 38, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 450, damping: 38, mass: 0.4 });
  const [overInteractive, setOverInteractive] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target instanceof Element ? event.target : null;
      setOverInteractive(Boolean(target?.closest(INTERACTIVE)));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: springX, y: springY }}
      className="pointer-events-none fixed left-0 top-0 z-[70]"
    >
      <div
        className={cx(
          "-translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,background-color,border-color] duration-200",
          overInteractive ? "h-12 w-12 border-accent-2 bg-accent-2/10" : "h-7 w-7 border-accent-2/60",
        )}
      />
    </motion.div>
  );
}
