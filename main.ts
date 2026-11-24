// bring-the-humans-03 entry: the video is the entry, and this program only
// hands the house the video's address. It copies VIDEO.json from the repo
// root into the output directory, using the Node standard library only.
//
// The ad itself (ad.mp4 in this repo) is an original 20 s vertical video
// made in the recorded session: a code-drawn background, the press pack's
// ghost illustration, make.fun's brand badge from the first frame, and the
// press pack's referral end card with referral code mee18qb6 at the end.
// Post it publicly on TikTok, then put its full address in VIDEO.json.

import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
try {
  copyFileSync(join(botDir, "VIDEO.json"), join(outDir, "VIDEO.json"));
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${botDir}: ${(err as Error).message}`);
  process.exit(1);
}
console.log("VIDEO.json copied to", join(outDir, "VIDEO.json"));
