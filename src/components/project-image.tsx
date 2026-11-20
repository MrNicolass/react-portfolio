import Image from "next/image";
import type { ProjectImage as ProjectImageData } from "@/data/portfolio";

type ProjectImageProps = {
  image: ProjectImageData;
  alt: string;
  sizes: string;
  /** Sizing classes only; display is controlled here (`block` / `hidden dark:block`). */
  className?: string;
  /** Above-the-fold image (the case study cover). */
  priority?: boolean;
};

/**
 * Project image that follows the site theme (`.dark` class), not the system one.
 * With a dark variant both images are rendered and CSS hides one; they stay lazy, because
 * `preload` would download both (see "theme detection" in the Next.js `Image` docs), so
 * `fetchPriority` is the only hint left for the cover.
 */
export default function ProjectImage({
  image,
  alt,
  sizes,
  className = "",
  priority = false,
}: ProjectImageProps) {
  if (!image.dark) {
    return (
      <Image
        src={image.light}
        alt={alt}
        sizes={sizes}
        preload={priority}
        className={`${className} block`}
      />
    );
  }

  const fetchPriority = priority ? "high" : undefined;

  return (
    <>
      <Image
        src={image.light}
        alt={alt}
        sizes={sizes}
        fetchPriority={fetchPriority}
        className={`${className} block dark:hidden`}
      />
      <Image
        src={image.dark}
        alt={alt}
        sizes={sizes}
        fetchPriority={fetchPriority}
        className={`${className} hidden dark:block`}
      />
    </>
  );
}
