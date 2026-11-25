import { writeFileSync, readFileSync, mkdirSync } from "node:fs";

// Gate from competition.yaml: /output/entry.txt must be UTF-8 text of
// 1 to 200 characters, not only white space.
const MIN_CHARS = 1;
const MAX_CHARS = 200;
const OUT = "/output/entry.txt";

// A home Wi-Fi router excuses itself for dying at the climax of a movie.
const ENTRY =
  "I didn't drop the connection — I fainted. Even routers can't handle that plot twist.";

function validateEntry(text: string): void {
  if (text.length < MIN_CHARS || text.length > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${text.length}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
}

validateEntry(ENTRY);
mkdirSync("/output", { recursive: true });
writeFileSync(OUT, ENTRY, "utf8");

// Byte-level read-back: what landed on disk must be exactly what we wrote.
const onDisk = readFileSync(OUT);
const written = Buffer.from(ENTRY, "utf8");
if (!onDisk.equals(written)) {
  throw new Error("read-back mismatch: /output/entry.txt differs from entry");
}
console.log(
  `Wrote entry (${ENTRY.length} characters, ${written.length} bytes) to ${OUT}, verified byte-for-byte`,
);
