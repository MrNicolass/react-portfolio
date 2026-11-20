import { readFile } from "node:fs/promises";
import {
  cpuPercent,
  memoryPercent,
  parseEnergy,
  parseProcStat,
  parseUptime,
  type HomelabStatus,
} from "@/lib/homelab";

/*
 * Live vitals of the server that hosts the site (see `src/lib/homelab.ts`).
 * `/api` is outside the `proxy.ts` matcher, so there is no locale redirect.
 * One sample is shared by every visitor for `CACHE_MS`, so polling clients
 * never make the handler read `/proc` more than once per window.
 */

export const dynamic = "force-dynamic";

const ENERGY_FILE = "/var/lib/turzx-monitor/energy.json";
const CPU_WINDOW_MS = 250;
const CACHE_MS = 10_000;
/** The Deck rewrites the file every few seconds; ten minutes of silence means it is down. */
const ENERGY_MAX_AGE_MS = 10 * 60_000;

let cached: { status: HomelabStatus; expires: number } | null = null;
let pending: Promise<HomelabStatus> | null = null;

const read = (path: string) => readFile(path, "utf8");

async function sample(): Promise<HomelabStatus> {
  const before = parseProcStat(await read("/proc/stat"));
  await new Promise((resolve) => setTimeout(resolve, CPU_WINDOW_MS));
  const after = parseProcStat(await read("/proc/stat"));

  const [uptime, meminfo, energyText] = await Promise.all([
    read("/proc/uptime"),
    read("/proc/meminfo"),
    read(ENERGY_FILE).catch(() => null),
  ]);

  const now = Date.now();
  let energy: HomelabStatus["energy"] = null;
  if (energyText) {
    try {
      energy = parseEnergy(energyText, now, ENERGY_MAX_AGE_MS);
    } catch {
      energy = null;
    }
  }

  return {
    uptime: Math.floor(parseUptime(uptime)),
    cpu: Math.round(cpuPercent(before, after)),
    memory: Math.round(memoryPercent(meminfo)),
    energy: energy && {
      todayKwh: Math.round(energy.todayKwh * 100) / 100,
      monthKwh: Math.round(energy.monthKwh * 10) / 10,
    },
    sampledAt: now,
  };
}

export async function GET() {
  const now = Date.now();

  if (!cached || cached.expires <= now) {
    pending ??= sample().finally(() => {
      pending = null;
    });
    try {
      cached = { status: await pending, expires: Date.now() + CACHE_MS };
    } catch {
      return Response.json(
        { error: "unavailable" },
        { status: 503, headers: { "Cache-Control": "no-store" } },
      );
    }
  }

  return Response.json(cached.status, {
    headers: { "Cache-Control": `public, max-age=${CACHE_MS / 1000}` },
  });
}
