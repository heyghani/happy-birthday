import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

function crc32(buffer) {
  let crc = ~0;
  for (let index = 0; index < buffer.length; index += 1) {
    crc ^= buffer[index];
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return ~crc >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const body = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([length, body, crc]);
}

function encodePng(width, height, rgba) {
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y += 1) {
    raw[y * (stride + 1)] = 0;
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

function createCanvas(width, height) {
  const data = Buffer.alloc(width * height * 4);
  const canvas = {
    width,
    height,
    data,
    px(x, y, color) {
      const px = x | 0;
      const py = y | 0;
      if (px < 0 || py < 0 || px >= width || py >= height) return;
      const index = (py * width + px) * 4;
      data[index] = color[0];
      data[index + 1] = color[1];
      data[index + 2] = color[2];
      data[index + 3] = color[3] ?? 255;
    },
    rect(x, y, w, h, color) {
      for (let yy = 0; yy < h; yy += 1) {
        for (let xx = 0; xx < w; xx += 1) canvas.px(x + xx, y + yy, color);
      }
    },
    fill(color) {
      canvas.rect(0, 0, width, height, color);
    },
  };
  return canvas;
}

function block(canvas, x, y, w, h, color, size) {
  canvas.rect(x * size, y * size, w * size, h * size, color);
}

const C = {
  sky: [42, 134, 232, 255],
  skyDeep: [24, 110, 206, 255],
  cream: [246, 231, 180, 255],
  ink: [20, 20, 20, 255],
  gold: [245, 197, 24, 255],
  goldLite: [255, 243, 176, 255],
  red: [226, 59, 74, 255],
  pink: [255, 126, 179, 255],
  green: [60, 186, 78, 255],
  greenDark: [31, 122, 50, 255],
  pot: [224, 138, 69, 255],
  potDark: [168, 83, 36, 255],
  skin: [243, 210, 176, 255],
  hair: [58, 42, 40, 255],
  shirt: [109, 124, 50, 255],
  shirtDark: [78, 90, 36, 255],
  blush: [244, 170, 170, 255],
  white: [255, 253, 248, 255],
  night: [18, 42, 110, 255],
  moon: [255, 244, 200, 255],
};

function paintPortrait() {
  const size = 12;
  const canvas = createCanvas(30 * size, 40 * size);
  const b = (x, y, w, h, color) => block(canvas, x, y, w, h, color, size);

  b(9, 4, 12, 4, C.hair);
  b(8, 7, 14, 8, C.hair);
  b(10, 10, 10, 10, C.skin);
  b(9, 8, 4, 3, C.hair);
  b(17, 8, 4, 3, C.hair);
  b(11, 15, 2, 2, C.ink);
  b(17, 15, 2, 2, C.ink);
  b(10, 16, 1, 1, C.white);
  b(16, 16, 1, 1, C.white);
  b(11, 18, 2, 1, C.blush);
  b(17, 18, 2, 1, C.blush);
  b(13, 19, 4, 1, C.red);
  b(13, 22, 4, 4, C.skin);
  b(6, 26, 18, 14, C.shirt);
  b(6, 26, 18, 2, C.shirtDark);
  b(8, 30, 4, 5, C.shirtDark);
  b(18, 30, 4, 5, C.shirtDark);
  b(4, 28, 3, 8, C.shirt);
  b(23, 28, 3, 8, C.shirt);
  return canvas;
}

function paintCake() {
  const size = 16;
  const canvas = createCanvas(30 * size, 30 * size);
  canvas.fill(C.sky);
  const b = (x, y, w, h, color) => block(canvas, x, y, w, h, color, size);
  b(0, 22, 30, 8, C.skyDeep);
  b(7, 14, 16, 8, C.pink);
  b(6, 13, 18, 2, C.cream);
  b(8, 16, 14, 2, C.gold);
  b(9, 8, 1, 5, C.gold);
  b(14, 7, 1, 6, C.gold);
  b(19, 8, 1, 5, C.gold);
  b(8, 7, 3, 2, C.red);
  b(13, 6, 3, 2, C.red);
  b(18, 7, 3, 2, C.red);
  b(4, 6, 3, 4, C.gold);
  b(23, 5, 2, 2, C.pink);
  b(3, 10, 2, 2, C.white);
  return canvas;
}

function paintBalloons() {
  const size = 16;
  const canvas = createCanvas(30 * size, 30 * size);
  canvas.fill(C.sky);
  const b = (x, y, w, h, color) => block(canvas, x, y, w, h, color, size);
  b(5, 4, 6, 8, C.red);
  b(12, 6, 6, 8, C.gold);
  b(19, 4, 6, 8, C.pink);
  b(6, 5, 2, 2, C.white);
  b(13, 7, 2, 2, C.white);
  b(20, 5, 2, 2, C.white);
  b(7, 12, 1, 10, C.ink);
  b(14, 14, 1, 8, C.ink);
  b(21, 12, 1, 10, C.ink);
  b(6, 22, 16, 2, C.cream);
  return canvas;
}

function paintNight() {
  const size = 16;
  const canvas = createCanvas(30 * size, 30 * size);
  canvas.fill(C.night);
  const b = (x, y, w, h, color) => block(canvas, x, y, w, h, color, size);
  b(18, 4, 7, 7, C.moon);
  b(20, 5, 4, 4, C.night);
  b(4, 6, 2, 2, C.gold);
  b(8, 12, 2, 2, C.cream);
  b(14, 8, 1, 1, C.white);
  b(6, 18, 2, 2, C.pink);
  b(24, 16, 2, 2, C.gold);
  b(11, 20, 1, 1, C.white);
  b(0, 24, 30, 6, C.skyDeep);
  b(3, 22, 4, 3, C.greenDark);
  b(8, 21, 3, 4, C.green);
  return canvas;
}

function paintStill() {
  const size = 16;
  const canvas = createCanvas(30 * size, 30 * size);
  canvas.fill(C.sky);
  const b = (x, y, w, h, color) => block(canvas, x, y, w, h, color, size);
  b(0, 20, 30, 10, C.skyDeep);
  b(6, 8, 3, 10, C.green);
  b(5, 10, 2, 4, C.greenDark);
  b(9, 12, 2, 3, C.greenDark);
  b(5, 18, 6, 3, C.pot);
  b(6, 17, 4, 1, C.potDark);
  b(18, 12, 6, 6, C.gold);
  b(19, 13, 2, 4, C.goldLite);
  b(4, 5, 2, 2, C.pink);
  b(24, 6, 2, 2, C.red);
  return canvas;
}

function paintIcon() {
  const canvas = createCanvas(32, 32);
  canvas.fill([42, 134, 232, 255]);
  const coin = [
    "....KKKKKK....",
    "..KKYYYYYYKK..",
    ".KYLLYYYYYYYK.",
    ".KYYYYYYYYYYK.",
    ".KYYYYYYYYYYK.",
    ".KYYYYYYYYDDK.",
    "..KYYYYYYDDK..",
    "....KKKKKK....",
  ];
  coin.forEach((row, y) => {
    for (let x = 0; x < row.length; x += 1) {
      const key = row[x];
      const color = key === "K" ? C.ink : key === "L" ? C.goldLite : key === "Y" ? C.gold : key === "D" ? [215, 154, 18, 255] : null;
      if (!color) continue;
      canvas.rect(2 + x * 2, 8 + y * 2, 2, 2, color);
    }
  });
  return canvas;
}

const root = path.resolve(import.meta.dirname, "..");
const photos = path.join(root, "public", "photos");
fs.mkdirSync(photos, { recursive: true });

const files = [
  ["public/photos/portrait.png", paintPortrait()],
  ["public/photos/memory-01.png", paintCake()],
  ["public/photos/memory-02.png", paintBalloons()],
  ["public/photos/memory-03.png", paintNight()],
  ["public/photos/memory-04.png", paintStill()],
  ["app/icon.png", paintIcon()],
];

for (const [file, canvas] of files) {
  const target = path.join(root, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, encodePng(canvas.width, canvas.height, canvas.data));
}
