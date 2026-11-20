import scene from "@/assets/pixel/scene.json";
import PixelCat from "./pixel-cat";

const { cats } = scene;

/**
 * Pixel band shared by the hero and the 404 page: drifting aurora, static moon, stars
 * and hills, and the kitten resting on the hill. Purely decorative.
 */
export default function PixelBand() {
  return (
    <div
      aria-hidden="true"
      className="relative h-[200px] overflow-hidden border-y border-black/10 bg-[var(--scene-sky)] dark:border-white/10"
    >
      <div className="aurora absolute inset-0" />
      <div className="scene absolute inset-0" />
      <PixelCat
        blink
        className="absolute sm:hidden"
        style={{ left: `calc(50% + ${cats.mobile.offset}px)`, top: cats.mobile.top }}
        width={cats.mobile.size}
        height={cats.mobile.size}
      />
      <PixelCat
        blink
        className="absolute hidden sm:block"
        style={{ left: `calc(50% + ${cats.desktop.offset}px)`, top: cats.desktop.top }}
        width={cats.desktop.size}
        height={cats.desktop.size}
      />
    </div>
  );
}
