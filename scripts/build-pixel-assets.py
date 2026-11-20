"""Generates the dithered pixel-art layers used by the hero and by the Open Graph images.

The look follows the GitHub profile README (MrNicolass/MrNicolass, scripts/build_assets.py):
an aurora quantized with an 8x8 Bayer matrix, two hills and a white kitten.

Outputs:
  public/pixel/aurora-{dark,light}.png  896 x 200 tile, repeats horizontally without a seam (it drifts)
  public/pixel/scene-{dark,light}.png   2560 x 200 transparent foreground: stars, moon and two hills; also tiles horizontally
  src/assets/pixel/scene.json           scene size and where the kitten sits, read by the hero
  src/assets/og/band.png                1200 x 280 scene for the OG images (dark theme)
  src/assets/og/GeistPixel-Square.ttf   TTF copy of the pixel font, because OG images cannot read WOFF2

Run from the repository root:  python scripts/build-pixel-assets.py   (needs numpy, pillow, fonttools and brotli)
"""

import json
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public" / "pixel"
OG = ROOT / "src" / "assets" / "og"
SCENE_JSON = ROOT / "src" / "assets" / "pixel" / "scene.json"
PIXEL_WOFF2 = ROOT / "node_modules" / "geist" / "dist" / "fonts" / "geist-pixel" / "GeistPixel-Square.woff2"
CELL = 8
TILE = (112, 25)  # cols, rows: 896 x 200 px
SCENE = (320, 25)  # cols, rows: 2560 x 200 px, centered under the hero
# Kitten positions (first fill column). The SVG box starts one cell earlier, so its left edge sits
# (col - 161) * 8 px from the scene center: +24 px on phones, +320 px on desktop (inside the container).
CAT_COLS = {"mobile": 164, "desktop": 201}
MOON = (146, 7)  # moon center: 14 cells (112 px) left of the scene center

RAMPS = {
    "dark": {
        "violet": ["#0a0d12", "#1b1646", "#43299b", "#8957e5", "#d6c2ff"],
        "blue": ["#0a0d12", "#0f1f3f", "#173f7d", "#388bfd", "#cfe6ff"],
    },
    "light": {
        "violet": ["#f6f8fa", "#e9dfff", "#cbb2ff", "#a371f7", "#6a3fd1"],
        "blue": ["#f6f8fa", "#dcebff", "#a9cdff", "#58a6ff", "#0b5fcf"],
    },
}
HILL_LEVELS = {"dark": (0.40, 0.22), "light": (0.44, 0.72)}

# The white kitten (fill only). Shading and outline are added by cat_cells().
# W fur, p inner ear, e eye, n nose, c collar.
CAT = [
    "..W........W..",
    ".WpW......WpW.",
    ".WWWWWWWWWWWW.",
    ".WWWWWWWWWWWW.",
    ".WWeeWWWWeeWW.",
    ".WWeeWWWWeeWW.",
    ".WWWWWnnWWWWW.",
    "..WWWWWWWWWW..",
    "..cccccccccc..",
    ".WWWWWWWWWWW.W",
    ".WWWWWWWWWWW.W",
    ".WWWWWWWWWWW.W",
    ".WWWWWWWWWWWWW",
    ".WWWW..WWWWWWW",
]
CAT_COLORS = {"W": "#f4f6ff", "w": "#b9c1e6", "o": "#5a6391", "e": "#161a33", "n": "#ff8fb1", "p": "#ffb3c8", "c": "#f0883e"}


def rgb(colour):
    return tuple(int(colour[i : i + 2], 16) for i in (1, 3, 5))


def bayer(n=8):
    m = np.array([[0]])
    while m.shape[0] < n:
        m = np.block([[4 * m, 4 * m + 2], [4 * m + 3, 4 * m + 1]])
    return (m + 0.5) / (n * n)


def levels(intensity, count):
    rows, cols = intensity.shape
    thr = np.tile(bayer(8), (rows // 8 + 1, cols // 8 + 1))[:rows, :cols]
    return np.clip(np.floor(np.clip(intensity, 0, 1) * (count - 1) + thr), 0, count - 1).astype("uint8")


def periodic_noise(rng, cols, lo, hi, decay):
    """Smooth noise that tiles across `cols` (integer harmonics only)."""
    x = np.arange(cols) / cols
    out = np.zeros(cols)
    for k in range(lo, hi + 1):
        out += rng.uniform(0.4, 1.0) / (k**decay) * np.sin(2 * np.pi * (k * x + rng.random()))
    out -= out.min()
    return out / out.max()


def aurora_field(cols, rows, seed, base=0.60):
    rng = np.random.default_rng(seed)
    y = (np.arange(rows)[:, None] + 0.5) / rows
    center = base + 0.09 * (periodic_noise(rng, cols, 1, 3, 1.0) - 0.5) * 2
    rays = periodic_noise(rng, cols, 6, 40, 0.55) ** 1.4
    glow = 0.45 + 0.55 * periodic_noise(rng, cols, 2, 9, 0.8)
    height = 0.16 + 0.50 * rays
    d = center[None, :] - y
    above = (np.exp(-np.clip(d, 0, None) / height[None, :]) * glow[None, :]) ** 0.7
    below = np.exp(-np.clip(-d, 0, None) / 0.045) * 0.85
    core = 0.5 * np.exp(-((d / 0.035) ** 2))
    field = np.where(d >= 0, above, below) + core
    field *= np.clip(y / 0.18, 0, 1) ** 0.8
    return np.clip(field, 0, 1)


def hill_tops(cols, rows):
    """Two hill silhouettes built from integer harmonics, so the tile repeats cleanly."""
    x = np.arange(cols) / cols
    far = rows - 7.8 + 1.8 * np.sin(2 * np.pi * 2 * x + 1) + 0.9 * np.sin(2 * np.pi * 9 * x)
    near = rows - 3.8 + 1.0 * np.sin(2 * np.pi * 3 * x + 2.2) + 0.6 * np.sin(2 * np.pi * 13 * x)
    return far, near


def paint_hills(rgba, theme):
    rows, cols = rgba.shape[:2]
    ramp = RAMPS[theme]["blue"]
    thr = bayer(8)
    far, near = hill_tops(cols, rows)
    for top, value in zip((far, near), HILL_LEVELS[theme]):
        for x in range(cols):
            for y in range(int(np.ceil(top[x])), rows):
                lvl = int(np.clip(np.floor(value * (len(ramp) - 1) + thr[y % 8, x % 8]), 0, len(ramp) - 1))
                rgba[y, x] = (*rgb(ramp[lvl]), 255)
    return near


def cat_cells():
    cells = {(x, y): ch for y, row in enumerate(CAT) for x, ch in enumerate(row) if ch != "."}
    out = dict(cells)
    for (x, y), k in cells.items():
        if k == "W" and ((x + 1, y) not in cells or (x, y + 1) not in cells):
            out[(x, y)] = "w"
    for x, y in cells:
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            out.setdefault((x + dx, y + dy), "o")
    return out


def save(img, path, cols, rows):
    path.parent.mkdir(parents=True, exist_ok=True)
    img.resize((cols * CELL, rows * CELL), Image.NEAREST).save(path, optimize=True)
    print("wrote", path.relative_to(ROOT))


def scene_hill_tops(cols, rows):
    """Hill silhouettes close to the README banner, but built from integer harmonics so the scene tiles."""
    x = 2 * np.pi * np.arange(cols) / cols
    far = rows - 7.8 + 1.8 * np.sin(6 * x + 1) + 0.9 * np.sin(14 * x)
    near = rows - 3.8 + 1.0 * np.sin(8 * x + 2.2) + 0.6 * np.sin(18 * x)
    return far, near


def scene_stars(rgba, theme, cat_cols):
    """Small square stars in the sky, away from the moon and the kitten."""
    rows, cols = rgba.shape[:2]
    colour, alpha = ("#e6edf3", 230) if theme == "dark" else ("#8250df", 140)
    rng = np.random.default_rng(3)
    placed = 0
    while placed < 70:
        c, r = int(rng.integers(1, cols - 1)), int(rng.integers(1, 13))
        if np.hypot(c - MOON[0], r - MOON[1]) < 7 or any(col - 3 <= c <= col + 17 for col in cat_cols):
            continue
        rgba[r, c] = (*rgb(colour), alpha)
        placed += 1


def tiles():
    cols, rows = TILE
    for theme, ramps in RAMPS.items():
        idx = levels(aurora_field(cols, rows, seed=7), len(ramps["violet"]))
        aurora = Image.fromarray(idx, "P")
        aurora.putpalette([v for c in ramps["violet"] for v in rgb(c)])
        save(aurora, PUBLIC / f"aurora-{theme}.png", cols, rows)


def scene():
    cols, rows = SCENE
    far, near = scene_hill_tops(cols, rows)
    thr = bayer(8)
    for theme, ramps in RAMPS.items():
        rgba = np.zeros((rows, cols, 4), "uint8")
        yy, xx = np.mgrid[0:rows, 0:cols] + 0.5
        mx, my = MOON
        moon = (np.hypot(xx - mx, yy - my) < 4.2) & (np.hypot(xx - mx - 2.3, yy - my + 0.9) > 3.6)
        rgba[moon] = (*rgb(ramps["violet"][4]), 255)
        scene_stars(rgba, theme, CAT_COLS.values())
        ramp = ramps["blue"]
        for top, value in zip((far, near), HILL_LEVELS[theme]):
            for x in range(cols):
                for y in range(int(np.ceil(top[x])), rows):
                    lvl = int(np.clip(np.floor(value * (len(ramp) - 1) + thr[y % 8, x % 8]), 0, len(ramp) - 1))
                    rgba[y, x] = (*rgb(ramp[lvl]), 255)
        save(Image.fromarray(rgba, "RGBA"), PUBLIC / f"scene-{theme}.png", cols, rows)

    # Paws rest on the near hill, exactly like the README banner.
    # The kitten SVG covers 16 x 16 cells: one outline cell around the 14 x 14 fill.
    center = cols * CELL // 2
    cats = {}
    for name, col in CAT_COLS.items():
        row = int(round(near[col + 6])) - 13
        cats[name] = {"offset": (col - 1) * CELL - center, "top": (row - 1) * CELL, "size": 16 * CELL}
    layout = {"width": cols * CELL, "height": rows * CELL, "cell": CELL, "cats": cats}
    SCENE_JSON.parent.mkdir(parents=True, exist_ok=True)
    SCENE_JSON.write_text(json.dumps(layout, indent=2) + "\n")
    print("wrote", SCENE_JSON.relative_to(ROOT), layout["cats"])


def pixel_font():
    from fontTools.ttLib import TTFont

    font = TTFont(PIXEL_WOFF2)
    font.flavor = None
    target = OG / "GeistPixel-Square.ttf"
    font.save(target)
    print("wrote", target.relative_to(ROOT))


def og_band():
    cols, rows = 150, 35
    ramps = RAMPS["dark"]
    sky = np.array([rgb(c) for c in ramps["violet"]], "uint8")[levels(aurora_field(cols, rows, seed=11, base=0.55), 5)]
    rgba = np.dstack([sky, np.full((rows, cols), 255, "uint8")])

    rng = np.random.default_rng(3)
    for _ in range(40):
        c, r = int(rng.integers(1, cols - 1)), int(rng.integers(0, rows // 2))
        if np.hypot(c - 16, r - 9) > 6:
            rgba[r, c] = (*rgb("#e6edf3"), 255)

    yy, xx = np.mgrid[0:rows, 0:cols] + 0.5
    moon = (np.hypot(xx - 16, yy - 9) < 5.2) & (np.hypot(xx - 18.8, yy - 7.8) > 4.5)
    rgba[moon] = (*rgb(ramps["violet"][4]), 255)

    near = paint_hills(rgba, "dark")
    ox = 120
    oy = int(round(near[ox + 6])) - 13
    for (x, y), key in cat_cells().items():
        if 0 <= oy + y < rows:
            rgba[oy + y, ox + x] = (*rgb(CAT_COLORS[key]), 255)
    save(Image.fromarray(rgba, "RGBA"), OG / "band.png", cols, rows)


if __name__ == "__main__":
    tiles()
    scene()
    og_band()
    pixel_font()
