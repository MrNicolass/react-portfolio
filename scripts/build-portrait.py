"""Generates the pixel portrait used by the hero: a dithered version per theme and the real photo.

The dithered look reuses the 8x8 Bayer matrix and the violet ramps of `build-pixel-assets.py`,
so the portrait belongs to the same pixel world as the aurora. On hover or tap, `pixel-portrait.tsx`
reveals the real photo through those same cells.

Inputs:
  a cutout PNG with a transparent background (optional; made with `rembg` and the
  `birefnet-portrait` model). Without it, the script re-derives everything from `photo.webp`.

Outputs:
  public/portrait/photo.webp            640 x 800 cutout, transparent background (revealed on demand)
  public/portrait/pixel-{dark,light}.png  80 x 100 cells of 4 px, transparent background, one-cell outline
  src/assets/portrait/portrait.json     grid size, read by the component

Run from the repository root:  python scripts/build-portrait.py [cutout.png]   (needs numpy and pillow)
"""

import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public" / "portrait"
PHOTO = PUBLIC / "photo.webp"
LAYOUT = ROOT / "src" / "assets" / "portrait" / "portrait.json"
COLS, ROWS, CELL = 80, 100, 4
PHOTO_SIZE = (640, 800)  # 2x the 320 x 400 CSS box
# Same ramps as build-pixel-assets.py; the light theme reads them from dark ink to paper.
RAMPS = {
    "dark": ["#0a0d12", "#1b1646", "#43299b", "#8957e5", "#d6c2ff"],
    "light": ["#6a3fd1", "#a371f7", "#cbb2ff", "#e9dfff", "#f6f8fa"],
}
# One-cell outline that separates the portrait from the aurora behind it.
RIM = {"dark": "#0a0d12", "light": "#6a3fd1"}


def rgb(colour):
    return tuple(int(colour[i : i + 2], 16) for i in (1, 3, 5))


def bayer(n=8):
    m = np.array([[0]])
    while m.shape[0] < n:
        m = np.block([[4 * m, 4 * m + 2], [4 * m + 3, 4 * m + 1]])
    return (m + 0.5) / (n * n)


def thresholds():
    return np.tile(bayer(8), (ROWS // 8 + 1, COLS // 8 + 1))[:ROWS, :COLS]


def crop_cutout(path):
    """Head and shoulders in a 4:5 box: the top of the hair sits 6% below the top edge."""
    im = Image.open(path).convert("RGBA")
    alpha = np.asarray(im)[:, :, 3]
    rows = np.where(alpha.max(1) > 128)[0]
    cols = np.where(alpha[: rows[0] + im.height // 3].max(0) > 128)[0]
    head_w = cols[-1] - cols[0]
    width = int(head_w * 1.55)
    height = width * 5 // 4
    cx = (cols[0] + cols[-1]) // 2
    top = rows[0] - int(height * 0.06)
    box = (cx - width // 2, top, cx - width // 2 + width, top + height)
    photo = im.crop(box).resize(PHOTO_SIZE, Image.LANCZOS)
    PUBLIC.mkdir(parents=True, exist_ok=True)
    photo.save(PHOTO, "WEBP", quality=82, method=6)
    print("wrote", PHOTO.relative_to(ROOT), PHOTO.stat().st_size // 1024, "KB")


def grow(mask):
    out = mask.copy()
    out[1:] |= mask[:-1]
    out[:-1] |= mask[1:]
    out[:, 1:] |= mask[:, :-1]
    out[:, :-1] |= mask[:, 1:]
    return out


def dither():
    """Transparent background, so the drifting aurora of the frame shows behind the portrait."""
    small = Image.open(PHOTO).convert("RGBA").resize((COLS, ROWS), Image.BOX)
    body = np.asarray(small)[:, :, 3] > 128
    luma = np.asarray(ImageOps.grayscale(small.convert("RGB")), dtype=float)
    lo, hi = np.percentile(luma[body], [2, 98])
    tone = np.clip((luma - lo) / (hi - lo), 0, 1) ** 0.85
    thr = np.tile(bayer(8), (ROWS // 8 + 1, COLS // 8 + 1))[:ROWS, :COLS]
    rim = grow(body) & ~body

    for theme, ramp in RAMPS.items():
        palette = np.array([rgb(c) for c in ramp], "uint8")
        level = np.clip(np.floor(tone * (len(ramp) - 1) + thr), 0, len(ramp) - 1).astype(int)
        img = np.zeros((ROWS, COLS, 4), "uint8")
        img[body] = np.column_stack([palette[level[body]], np.full(body.sum(), 255, "uint8")])
        img[rim] = (*rgb(RIM[theme]), 255)
        path = PUBLIC / f"pixel-{theme}.png"
        Image.fromarray(img, "RGBA").resize((COLS * CELL, ROWS * CELL), Image.NEAREST).save(path, optimize=True)
        print("wrote", path.relative_to(ROOT), path.stat().st_size // 1024, "KB")

    LAYOUT.parent.mkdir(parents=True, exist_ok=True)
    LAYOUT.write_text(json.dumps({"cols": COLS, "rows": ROWS, "cell": CELL}) + "\n")
    print("wrote", LAYOUT.relative_to(ROOT))


if __name__ == "__main__":
    if len(sys.argv) > 1:
        crop_cutout(sys.argv[1])
    dither()
