import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { ogSize } from "@/lib/site";

/*
 * Share cards for the `og.png` route handlers. Server-only: it reads files from disk.
 *
 * `ImageResponse` (Satori) only lays out flexbox, reads TTF/OTF/WOFF (not WOFF2) and caps
 * the bundle at 500 KB, so the cards use three of the TTFs in `src/assets/og/`
 * (built by `scripts/build-pixel-assets.py`) plus the 1200 x 280 pixel scene `band.png`.
 */

const assetsDir = join(process.cwd(), "src", "assets", "og");

// Top row of `band.png`, so the scene blends into the card with no visible seam.
const night = "#0a0d12";
const foreground = "#f4f4f5";
const muted = "rgba(244, 244, 245, 0.68)";
const violet = "#a78bfa";
const violetSoft = "#c4b5fd";

type OgAssets = {
  pixel: Buffer;
  regular: Buffer;
  semibold: Buffer;
  band: string;
};

let assets: Promise<OgAssets> | undefined;

function loadAssets() {
  assets ??= Promise.all([
    readFile(join(assetsDir, "GeistPixel-Square.ttf")),
    readFile(join(assetsDir, "Geist-Regular.ttf")),
    readFile(join(assetsDir, "Geist-SemiBold.ttf")),
    readFile(join(assetsDir, "band.png"), "base64"),
  ]).then(
    ([pixel, regular, semibold, band]) => ({
      pixel,
      regular,
      semibold,
      band: `data:image/png;base64,${band}`,
    }),
    (error: unknown) => {
      assets = undefined;
      throw error;
    },
  );
  return assets;
}

export type OgCard = {
  /** Top-left label, in the pixel font. */
  eyebrow: string;
  /** Top-right label, in the pixel font. */
  aside?: string;
  title: string;
  /** Violet line under the title. */
  lead: string;
  /** Muted line under the lead. */
  body?: string;
  /** `lg` for the home card (short lead), `md` for project cards (sentence-long lead). */
  size?: "lg" | "md";
};

/**
 * Draws a share card: text on the night sky, with the pixel scene (aurora, hills and the
 * cat) along the bottom. The text block ends above y = 350, where the scene starts.
 */
export async function renderOgImage({ eyebrow, aside, title, lead, body, size = "lg" }: OgCard) {
  const { pixel, regular, semibold, band } = await loadAssets();
  const large = size === "lg";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: "100%",
          backgroundColor: night,
          fontFamily: "Geist",
          color: foreground,
        }}
      >
        {/* Satori renders plain <img>; next/image does not exist inside ImageResponse. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={band}
          width={ogSize.width}
          height={280}
          alt=""
          style={{ position: "absolute", left: 0, bottom: 0 }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            padding: "56px 64px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: "Geist Pixel",
              fontSize: 22,
              letterSpacing: 2,
              color: violetSoft,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 12, height: 12, backgroundColor: violet }} />
              {eyebrow}
            </div>
            {aside ? <div style={{ color: muted }}>{aside}</div> : null}
          </div>
          <div
            style={{
              marginTop: large ? 30 : 26,
              fontFamily: "Geist Pixel",
              fontSize: large ? 104 : 84,
              lineHeight: 1,
              letterSpacing: -1,
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: large ? 20 : 18,
              fontSize: large ? 40 : 30,
              fontWeight: 600,
              lineHeight: 1.25,
              color: violet,
            }}
          >
            {lead}
          </div>
          {body ? (
            <div style={{ marginTop: 12, fontSize: large ? 26 : 22, lineHeight: 1.3, color: muted }}>
              {body}
            </div>
          ) : null}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Geist Pixel", data: pixel, weight: 400, style: "normal" },
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
