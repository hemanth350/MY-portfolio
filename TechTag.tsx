import { cx } from "../../lib/utils";

export function TechTag({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-md border bg-surface-2 px-2.5 py-1 font-mono text-xs text-fg",
        className,
      )}
    >
      {label}
    </span>
  );
}
