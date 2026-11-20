import type { SVGProps } from "react";

/*
 * The white kitten from the GitHub profile README, drawn as crisp SVG rects.
 * Fill only: shading (right and bottom edges) and the 1-cell outline are derived below.
 * W fur, p inner ear, e eye, n nose, c collar.
 */
const CAT = [
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
];

const COLORS: Record<string, string> = {
  W: "#f4f6ff",
  w: "#b9c1e6",
  o: "#5a6391",
  e: "#161a33",
  n: "#ff8fb1",
  p: "#ffb3c8",
  c: "#f0883e",
};

type Cell = { x: number; y: number; key: string };

function buildCells(): Cell[] {
  const fill = new Map<string, string>();
  CAT.forEach((row, y) =>
    [...row].forEach((ch, x) => {
      if (ch !== ".") fill.set(`${x},${y}`, ch);
    }),
  );

  const out = new Map(fill);
  for (const [pos, key] of fill) {
    const [x, y] = pos.split(",").map(Number);
    if (key === "W" && (!fill.has(`${x + 1},${y}`) || !fill.has(`${x},${y + 1}`))) {
      out.set(pos, "w");
    }
  }
  for (const pos of fill.keys()) {
    const [x, y] = pos.split(",").map(Number);
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const next = `${x + dx},${y + dy}`;
      if (!out.has(next)) out.set(next, "o");
    }
  }

  // Shift by one so the outline starts at 0 and the art fits a 16 x 16 grid.
  return [...out].map(([pos, key]) => {
    const [x, y] = pos.split(",").map(Number);
    return { x: x + 1, y: y + 1, key };
  });
}

const CELLS = buildCells();
const EYES = CELLS.filter((cell) => cell.key === "e");
const BODY = CELLS.filter((cell) => cell.key !== "e");

type PixelCatProps = SVGProps<SVGSVGElement> & {
  /** Adds the blink animation to the eyes (disabled by `prefers-reduced-motion`). */
  blink?: boolean;
  title?: string;
};

export default function PixelCat({ blink = false, title, ...props }: PixelCatProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title && <title>{title}</title>}
      {BODY.map(({ x, y, key }) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" fill={COLORS[key]} />
      ))}
      <g className={blink ? "cat-blink" : undefined}>
        {EYES.map(({ x, y }) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" fill={COLORS.e} />
        ))}
      </g>
    </svg>
  );
}
