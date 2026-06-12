const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const src = path.join(__dirname, "icon-source.svg");
const iconsDir = path.join(__dirname, "..", "public", "icons");
fs.mkdirSync(iconsDir, { recursive: true });

const targets = [
  { file: path.join(iconsDir, "icon-192.png"), size: 192 },
  { file: path.join(iconsDir, "icon-512.png"), size: 512 },
  { file: path.join(__dirname, "..", "public", "apple-touch-icon.png"), size: 180 },
  { file: path.join(__dirname, "..", "public", "favicon.png"), size: 32 },
];

Promise.all(
  targets.map(({ file, size }) =>
    sharp(src).resize(size, size).png().toFile(file).then(() => console.log("wrote", file))
  )
).catch((e) => {
  console.error(e);
  process.exit(1);
});
