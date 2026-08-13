const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "..", "public", "decor", "garabatos.png");
const OUT_DIR = path.join(__dirname, "..", "public", "decor", "garabatos");
const MERGE_DIST = 28; // px - distancia para considerar que dos blobs son parte de la misma composicion

async function main() {
  const img = sharp(SRC);
  const { data, info } = await img
    .raw()
    .ensureAlpha()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const alphaAt = (x, y) => data[(y * width + x) * channels + 3];
  const visited = new Uint8Array(width * height);
  const THRESHOLD = 10;

  const blobs = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (visited[idx]) continue;
      if (alphaAt(x, y) <= THRESHOLD) {
        visited[idx] = 1;
        continue;
      }
      let minX = x, maxX = x, minY = y, maxY = y, count = 0;
      const stack = [[x, y]];
      visited[idx] = 1;
      while (stack.length) {
        const [cx, cy] = stack.pop();
        count++;
        if (cx < minX) minX = cx;
        if (cx > maxX) maxX = cx;
        if (cy < minY) minY = cy;
        if (cy > maxY) maxY = cy;
        const neighbors = [
          [cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1],
          [cx + 1, cy + 1], [cx - 1, cy - 1], [cx + 1, cy - 1], [cx - 1, cy + 1],
        ];
        for (const [nx, ny] of neighbors) {
          if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
          const nidx = ny * width + nx;
          if (visited[nidx]) continue;
          if (alphaAt(nx, ny) > THRESHOLD) {
            visited[nidx] = 1;
            stack.push([nx, ny]);
          } else {
            visited[nidx] = 1;
          }
        }
      }
      if (count > 30) blobs.push({ minX, maxX, minY, maxY, count });
    }
  }

  // Clustering por proximidad: unir bounding boxes que estan a menos de
  // MERGE_DIST entre si (probablemente son parte de la misma composicion:
  // puntos que irradian de un mandala, brazos de una estrella, etc.)
  function boxesClose(a, b, dist) {
    const ax1 = a.minX - dist, ax2 = a.maxX + dist;
    const ay1 = a.minY - dist, ay2 = a.maxY + dist;
    return !(b.minX > ax2 || b.maxX < ax1 || b.minY > ay2 || b.maxY < ay1);
  }

  let groups = blobs.map((b) => ({ ...b, items: [b] }));
  let merged = true;
  while (merged) {
    merged = false;
    outer: for (let i = 0; i < groups.length; i++) {
      for (let j = i + 1; j < groups.length; j++) {
        if (boxesClose(groups[i], groups[j], MERGE_DIST)) {
          const a = groups[i], b = groups[j];
          const combined = {
            minX: Math.min(a.minX, b.minX),
            maxX: Math.max(a.maxX, b.maxX),
            minY: Math.min(a.minY, b.minY),
            maxY: Math.max(a.maxY, b.maxY),
            count: a.count + b.count,
            items: [...a.items, ...b.items],
          };
          groups.splice(j, 1);
          groups.splice(i, 1, combined);
          merged = true;
          break outer;
        }
      }
    }
  }

  groups.sort((a, b) => a.minX - b.minX);

  fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log(`${blobs.length} blobs -> ${groups.length} elementos agrupados:`);
  let i = 0;
  for (const g of groups) {
    i++;
    const w = g.maxX - g.minX + 1;
    const h = g.maxY - g.minY + 1;
    const pad = 4;
    const left = Math.max(0, g.minX - pad);
    const top = Math.max(0, g.minY - pad);
    const width2 = Math.min(width - left, w + pad * 2);
    const height2 = Math.min(height - top, h + pad * 2);
    const outFile = path.join(OUT_DIR, `elemento-${i}.png`);
    await sharp(SRC)
      .extract({ left, top, width: width2, height: height2 })
      .toFile(outFile);
    console.log(
      `elemento-${i}.png: ${width2}x${height2} en (${left},${top}), ${g.items.length} sub-blobs, area total ${g.count}px`
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
