import type { ReactNode } from "react";
import { cx } from "../../lib/utils";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  download?: string;
  external?: boolean;
  className?: string;
}

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-[color,background-color,border-color,filter] duration-200";

const variants: Record<Variant, string> = {
  primary:
    "bg-solid text-on-solid shadow-[0_10px_30px_-10px_rgb(var(--glow-rgb)_/_0.75)] hover:brightness-110",
  secondary: "border border-line-strong bg-surface text-fg hover:border-accent/60 hover:text-accent",
  ghost: "text-fg hover:text-accent",
};

export function ButtonLink({ href, children, variant = "primary", download, external, className }: ButtonLinkProps) {
  return (
    <a
      href={href}
      download={download}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cx(base, variants[variant], className)}
    >
      {children}
    </a>
  );
}
