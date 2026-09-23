export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Shared easing for entrance animations. */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Resolves a file in /public against the configured base path. */
export function publicUrl(file: string): string {
  return `${import.meta.env.BASE_URL}${file}`;
}
