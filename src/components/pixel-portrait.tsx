"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import layout from "@/assets/portrait/portrait.json";

const { cols: COLS, rows: ROWS } = layout;
const PHOTO_SRC = "/portrait/photo.webp";
const CANVAS = { width: 640, height: 800 };
/** Lens radius, in cells. */
const LENS = 15;
/** Full reveal duration, in ms. */
const DURATION = 700;

/** Same 8x8 Bayer matrix as `scripts/build-portrait.py`: cells dissolve in this order. */
const BAYER = (() => {
  let m = [[0]];
  while (m.length < 8) {
    const n = m.length;
    const next = Array.from({ length: n * 2 }, () =>
      new Array<number>(n * 2).fill(0),
    );
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        const v = 4 * m[y][x];
        next[y][x] = v;
        next[y][x + n] = v + 2;
        next[y + n][x] = v + 3;
        next[y + n][x + n] = v + 1;
      }
    }
    m = next;
  }
  return m.map((row) => row.map((v) => (v + 0.5) / 64));
})();

type PixelPortraitProps = {
  alt: string;
  revealLabel: string;
  hint: string;
  /** Rendered under the portrait, inside the same frame. */
  children?: ReactNode;
};

/**
 * Hero portrait drawn with the site's Bayer dithering. A lens follows the mouse and shows the
 * real photo through the same cells; the button (click, tap, Enter or Space) dissolves the whole
 * portrait into the photo. With `prefers-reduced-motion` there is no lens and the swap is instant.
 */
export default function PixelPortrait({
  alt,
  revealLabel,
  hint,
  children,
}: PixelPortraitProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const revealRef = useRef<(on: boolean) => void>(undefined);
  const state = useRef({
    photo: null as HTMLImageElement | null,
    progress: 0,
    target: 0,
    lens: 0,
    lensTarget: 0,
    x: 0,
    y: 0,
    frame: 0,
    last: 0,
    reduced: false,
  });

  useEffect(() => {
    const s = state.current;
    const canvas = canvasRef.current;
    const box = boxRef.current;
    if (!canvas || !box) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    s.reduced = media.matches;
    const onMotion = () => (s.reduced = media.matches);
    media.addEventListener("change", onMotion);

    const mask = document.createElement("canvas");
    mask.width = COLS;
    mask.height = ROWS;
    const maskCtx = mask.getContext("2d");
    const cells = maskCtx?.createImageData(COLS, ROWS);

    const draw = () => {
      if (!maskCtx || !cells || !s.photo) return;
      const data = cells.data;
      let any = false;
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          let v = s.progress;
          if (s.lens > 0) {
            const d = Math.hypot(x + 0.5 - s.x, (y + 0.5 - s.y) * 0.9) / LENS;
            v = Math.max(v, s.lens * Math.min(1, Math.max(0, 1.25 - d) ** 0.7));
          }
          const on = v > BAYER[y % 8][x % 8];
          data[(y * COLS + x) * 4 + 3] = on ? 255 : 0;
          any ||= on;
        }
      }
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
      if (!any) return;
      maskCtx.putImageData(cells, 0, 0);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(mask, 0, 0, CANVAS.width, CANVAS.height);
      ctx.globalCompositeOperation = "source-in";
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(s.photo, 0, 0, CANVAS.width, CANVAS.height);
    };

    const tick = (now: number) => {
      const dt = s.last ? Math.min(64, now - s.last) : 16;
      s.last = now;
      const step = dt / DURATION;
      const approach = (from: number, to: number) =>
        s.reduced
          ? to
          : from < to
            ? Math.min(to, from + step)
            : Math.max(to, from - step);
      s.progress = approach(s.progress, s.target);
      s.lens = approach(s.lens, s.lensTarget);
      draw();
      if (s.progress !== s.target || s.lens !== s.lensTarget) {
        s.frame = requestAnimationFrame(tick);
      } else {
        s.frame = 0;
        s.last = 0;
      }
    };

    const start = () => {
      if (!s.photo) return;
      if (!s.frame) s.frame = requestAnimationFrame(tick);
    };

    const load = () => {
      if (s.photo) return;
      const img = new Image();
      img.decoding = "async";
      img.src = PHOTO_SRC;
      img.onload = () => {
        s.photo = img;
        start();
      };
    };

    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || s.reduced) return;
      const rect = box.getBoundingClientRect();
      s.x = ((event.clientX - rect.left) / rect.width) * COLS;
      s.y = ((event.clientY - rect.top) / rect.height) * ROWS;
      s.lensTarget = 1;
      load();
      if (s.photo && !s.frame) draw();
      start();
    };
    const leave = () => {
      s.lensTarget = 0;
      start();
    };

    box.addEventListener("pointerenter", load);
    box.addEventListener("pointermove", move);
    box.addEventListener("pointerleave", leave);
    revealRef.current = (on: boolean) => {
      s.target = on ? 1 : 0;
      load();
      start();
    };
    return () => {
      cancelAnimationFrame(s.frame);
      s.frame = 0;
      media.removeEventListener("change", onMotion);
      box.removeEventListener("pointerenter", load);
      box.removeEventListener("pointermove", move);
      box.removeEventListener("pointerleave", leave);
    };
  }, []);

  const toggle = () => {
    const next = !revealed;
    setRevealed(next);
    revealRef.current?.(next);
  };

  return (
    <figure className="overflow-hidden rounded-2xl border border-black/10 bg-white/60 font-mono text-sm dark:border-white/10 dark:bg-white/5">
      <div className="flex items-center gap-2 border-b border-black/10 px-4 py-2.5 text-[11px] text-foreground/50 dark:border-white/10">
        <span aria-hidden="true" className="flex gap-1">
          <span className="size-2 bg-violet-500/70" />
          <span className="size-2 bg-violet-500/40" />
          <span className="size-2 bg-violet-500/20" />
        </span>
        <span className="ml-1">~/nicolas.png</span>
        <span className="ml-auto">{revealed ? "rgb" : "bayer 8×8"}</span>
      </div>

      <div
        ref={boxRef}
        className="group relative aspect-[4/5] w-full overflow-hidden bg-[var(--scene-sky)]"
      >
        <div
          aria-hidden="true"
          className="aurora absolute inset-x-0 top-0 h-[200px] [mask-image:linear-gradient(to_bottom,black_45%,transparent)]"
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- pixel art must not be resampled */}
        <img
          src="/portrait/pixel-light.png"
          alt={alt}
          width={320}
          height={400}
          className="pixel absolute inset-0 size-full dark:hidden"
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- pixel art must not be resampled */}
        <img
          src="/portrait/pixel-dark.png"
          alt={alt}
          width={320}
          height={400}
          className="pixel absolute inset-0 hidden size-full dark:block"
        />
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          width={CANVAS.width}
          height={CANVAS.height}
          className="absolute inset-0 size-full"
        />
        <button
          type="button"
          aria-pressed={revealed}
          aria-label={revealLabel}
          onClick={toggle}
          className="absolute inset-0 cursor-crosshair focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-violet-500"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3 bottom-3 bg-[var(--scene-sky)]/85 px-2 py-1 text-[10px] tracking-wider text-foreground/60 uppercase transition-opacity group-hover:opacity-0"
        >
          {hint}
        </span>
      </div>

      {children}
    </figure>
  );
}
