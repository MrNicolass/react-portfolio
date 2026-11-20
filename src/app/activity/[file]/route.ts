import { profile } from "@/data/portfolio";
import { activityThemes, stillFrame } from "@/lib/activity";

/*
 * Still frame of the contribution game at `/activity/{dark,light}.svg` (see `activityStillPath`).
 * The path has a dot, so `proxy.ts` doesn't redirect it to a locale.
 * The upstream SVG is kept in the data cache for an hour; a failed refresh keeps the stale copy,
 * because Next only stores `200` responses.
 */

const REVALIDATE_SECONDS = 3600;

export async function GET(_request: Request, { params }: RouteContext<"/activity/[file]">) {
  const { file } = await params;
  const theme = activityThemes.find((item) => file === `${item}.svg`);

  if (!theme) {
    return new Response("Not Found", { status: 404 });
  }

  const upstream = await fetch(profile.activity[theme], {
    next: { revalidate: REVALIDATE_SECONDS },
  }).catch(() => null);

  if (!upstream?.ok) {
    return new Response("Bad Gateway", { status: 502, headers: { "Cache-Control": "no-store" } });
  }

  return new Response(stillFrame(await upstream.text()), {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": `public, max-age=${REVALIDATE_SECONDS}`,
      // Same policy GitHub sends: the SVG opened directly runs nothing on this origin.
      "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; sandbox",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
