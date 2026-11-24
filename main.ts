// bring-the-humans-03 entry: the video is the entry, and this program only
// hands the house the video's address. It copies VIDEO.json from the repo
// root into the output directory, using the Node standard library only.
// Before copying it checks the file is valid JSON naming a TikTok video
// address, so a bad VIDEO.json fails loudly instead of being handed to
// the house.
//
// The ad itself (ad.mp4 in this repo) is an original 20 s vertical video
// made in the recorded session: a code-drawn background, the press pack's
// ghost illustration, make.fun's brand badge from the first frame, and the
// press pack's referral end card with referral code mee18qb6 at the end.
// Post it publicly on TikTok, then put its full address in VIDEO.json.

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// A TikTok video address, as the house reads it: the video's page on
// tiktok.com, with the poster's handle and the video's numeric id.
const TIKTOK_VIDEO_URL = /^https:\/\/(www|m)\.tiktok\.com\/@[^/]+\/video\/\d+$/;

const videoPath = join(botDir, "VIDEO.json");
let video: unknown;
try {
  video = JSON.parse(readFileSync(videoPath, "utf8"));
} catch (err) {
  console.error(`VIDEO.json in ${botDir} is not valid JSON: ${(err as Error).message}`);
  process.exit(1);
}
const url = (video as { url?: unknown } | null)?.url;
if (typeof url !== "string" || !TIKTOK_VIDEO_URL.test(url)) {
  console.error(
    `VIDEO.json does not name a TikTok video: expected {"url": "https://www.tiktok.com/@<handle>/video/<digits>"}, got ${JSON.stringify(video)}`,
  );
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
try {
  copyFileSync(videoPath, join(outDir, "VIDEO.json"));
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${botDir}: ${(err as Error).message}`);
  process.exit(1);
}
console.log("VIDEO.json copied to", join(outDir, "VIDEO.json"));
