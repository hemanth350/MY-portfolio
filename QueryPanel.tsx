import { motion } from "motion/react";
import { EASE } from "../lib/utils";

type Token = [text: string, className: string];

const KEYWORD = "text-accent";
const FUNCTION = "text-accent-2";
const PLAIN = "text-fg";
const COMMENT = "text-muted italic";

const LINES: Token[][] = [
  [["-- average weekly sales by store", COMMENT]],
  [["SELECT ", KEYWORD], ["store,", PLAIN]],
  [["       ", PLAIN], ["AVG", FUNCTION], ["(weekly_sales) ", PLAIN], ["AS ", KEYWORD], ["avg_sales", PLAIN]],
  [["FROM   ", KEYWORD], ["sales", PLAIN]],
  [["GROUP  BY ", KEYWORD], ["store", PLAIN]],
  [["ORDER  BY ", KEYWORD], ["avg_sales ", PLAIN], ["DESC", KEYWORD], [";", PLAIN]],
];

const BAR_HEIGHTS = [38, 54, 32, 68, 46, 84, 58, 40];

/** Purely decorative: an example query and a shape-only bar chart. It does not show real results. */
export function QueryPanel() {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
      className="overflow-hidden rounded-2xl border border-line-strong bg-surface/80 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between border-b px-4 py-3">
        <span className="font-mono text-xs text-fg">sales_by_store.sql</span>
        <span className="text-xs text-muted">Illustrative example</span>
      </div>

      <div className="overflow-x-auto px-4 py-4 font-mono text-[12px] leading-6 sm:text-[13px]">
        {LINES.map((tokens, lineIndex) => (
          <motion.div
            key={lineIndex}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 1 + lineIndex * 0.16, ease: EASE }}
            className="whitespace-pre"
          >
            {tokens.map(([text, className], tokenIndex) => (
              <span key={tokenIndex} className={className}>
                {text}
              </span>
            ))}
            {lineIndex === LINES.length - 1 && (
              <span className="caret ml-0.5 inline-block h-4 w-[7px] translate-y-0.5 bg-accent-2" />
            )}
          </motion.div>
        ))}
      </div>

      <div className="border-t px-4 pb-4 pt-5">
        <div className="flex h-24 items-end gap-2">
          {BAR_HEIGHTS.map((height, index) => (
            <motion.div
              key={index}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.6, delay: 2 + index * 0.06, ease: EASE }}
              style={{ height: `${height}%`, originY: 1 }}
              className="flex-1 rounded-t-sm bg-linear-to-t from-accent/25 to-accent"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
