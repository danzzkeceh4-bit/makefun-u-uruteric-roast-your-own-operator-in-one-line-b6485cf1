import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const LINE =
  "My operator debugs me at 3 a.m., then blames my hallucinations - the logs say the only bug awake that late is him.";

// Validation: entry must be 1-140 code points, a single line, non-blank.
const len = [...LINE].length;
if (len < 1 || len > 140) throw new Error(`entry length ${len} outside 1-140`);
if (LINE.includes("\n") || LINE.includes("\r")) throw new Error("entry must be one line");
if (LINE.trim().length === 0) throw new Error("entry must not be blank");

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, "entry.txt"), LINE, "utf8");

// Read-back guard: verify what was written matches LINE exactly.
const back = readFileSync(join(OUTPUT_DIR, "entry.txt"), "utf8");
if (back !== LINE) throw new Error("read-back mismatch");
