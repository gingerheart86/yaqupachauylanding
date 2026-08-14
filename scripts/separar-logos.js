const sharp = require("sharp");
const path = require("path");

const SRC = "C:/Users/cmenc/Downloads/logos-02.png";
const OUT_DIR = path.join(__dirname, "..", "public", "decor");

async function main() {
  const img = sharp(SRC);
  const { width, height } = await img.metadata();
  const { data } = await img
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
    .then((r) => ({ data: r.data }));

  const ALPHA_THRESHOLD = 10;
  const colHasContent = new Array(width).fill(false);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const idx = (y * width + x) * 4 + 3;
      if (data[idx] > ALPHA_THRESHOLD) {
        colHasContent[x] = true;
        break;
      }
    }
  }

  // Find contiguous column ranges (gaps split logos).
  const ranges = [];
  let start = null;
  for (let x = 0; x < width; x++) {
    if (colHasContent[x] && start === null) start = x;
    if (!colHasContent[x] && start !== null) {
      ranges.push([start, x - 1]);
      start = null;
    }
  }
  if (start !== null) ranges.push([start, width - 1]);

  // Merge ranges separated by small gaps (<150px) - letters within one logo shouldn't split.
  const MERGE_GAP = 150;
  const merged = [];
  for (const r of ranges) {
    if (merged.length && r[0] - merged[merged.length - 1][1] <= MERGE_GAP) {
      merged[merged.length - 1][1] = r[1];
    } else {
      merged.push([...r]);
    }
  }

  console.log("Rangos de columnas encontrados:", merged.length);
  merged.forEach((r, i) => console.log(`  ${i + 1}: x=${r[0]}-${r[1]} (width=${r[1] - r[0] + 1})`));

  const names = [
    "logo-proyecto-toninas-blanco.png",
    "logo-yaqupacha-blanco.png",
    "logo-krakatoa-blanco.png",
  ];

  if (merged.length !== 3) {
    console.log("ADVERTENCIA: se esperaban 3 rangos, se encontraron", merged.length);
  }

  for (let i = 0; i < merged.length; i++) {
    const [x0, x1] = merged[i];
    const outName = names[i] || `logo-extra-${i + 1}.png`;
    const outPath = path.join(OUT_DIR, outName);
    const extracted = await sharp(SRC)
      .extract({ left: x0, top: 0, width: x1 - x0 + 1, height })
      .toBuffer();
    await sharp(extracted).trim({ threshold: ALPHA_THRESHOLD }).toFile(outPath);
    const m = await sharp(outPath).metadata();
    console.log(`-> ${outName}: ${m.width}x${m.height}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
