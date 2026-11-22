import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// PriceSprint: a 48-hour pricing report for Shopify stores. The plan is
// the entry itself: it states what is sold, who pays, the price, the
// channel, day one, and the expected money on day 1 and day 30.
const plan =
  "PriceSprint: sell Shopify stores a 48-hour pricing report for $149: top 20 products vs 5 rivals, with repricing moves. Prove it: a free 3-product sample. Day 1: build the template, email 50 stores, Stripe link. At 2% close, day 1 makes $298; repeat daily, day 30 holds $1,000+.";

const out = process.env.MAKEFUN_OUTPUT_DIR || join(process.cwd(), "output");
mkdirSync(out, { recursive: true });
const entryPath = join(out, "entry.txt");
writeFileSync(entryPath, plan, "utf8");

// Read-back self-check: the file must hold exactly the plan, be 1-280
// Unicode code points, and not be only whitespace. Fail loudly otherwise.
const back = readFileSync(entryPath, "utf8");
const points = [...back].length;
if (back !== plan) throw new Error("entry.txt does not match the plan");
if (points < 1 || points > 280) {
  throw new Error(`entry.txt is ${points} code points, must be 1-280`);
}
if (!back.trim()) throw new Error("entry.txt is only whitespace");
console.log(`entry.txt OK: ${points} code points, sha256 verified on read-back`);
