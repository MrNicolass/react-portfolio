/**
 * Aggregated server vitals served by `/api/homelab` and shown in the Activity section.
 * Only coarse numbers leave the server: no hostname, no byte counts, no raw counters.
 * CPU and RAM use the same formulas as the Vitals-Deck (`turzx_monitor/metrics.py`),
 * so the site and the desk screen agree.
 */
export type HomelabStatus = {
  /** Seconds since boot. */
  uptime: number;
  /** Whole-machine CPU usage between two `/proc/stat` reads, 0–100. */
  cpu: number;
  /** `(MemTotal - MemAvailable) / MemTotal`, 0–100. */
  memory: number;
  /** Package energy counted by the Vitals-Deck (RAPL), or `null` when its file is missing or stale. */
  energy: { todayKwh: number; monthKwh: number } | null;
  /** Unix time in milliseconds when this sample was taken. */
  sampledAt: number;
};

export const homelabEndpoint = "/api/homelab";

/** Client polling interval while the widget is on screen and the tab is visible. */
export const homelabPollMs = 30_000;

const JOULES_PER_KWH = 3_600_000;

/** `[total, idle]` jiffies from the aggregate `cpu ` line (idle includes iowait, as in the Deck). */
export function parseProcStat(text: string): [number, number] {
  const line = text.split("\n").find((item) => item.startsWith("cpu "));
  const values = line?.trim().split(/\s+/).slice(1).map(Number) ?? [];
  if (values.length < 4 || values.some(Number.isNaN)) {
    throw new Error("cpu line not found in /proc/stat");
  }
  const total = values.reduce((sum, value) => sum + value, 0);
  return [total, values[3] + (values[4] ?? 0)];
}

export function cpuPercent(previous: [number, number], current: [number, number]) {
  const total = current[0] - previous[0];
  const idle = current[1] - previous[1];
  if (total <= 0) return 0;
  return Math.min(100, Math.max(0, 100 * (1 - idle / total)));
}

export function memoryPercent(meminfo: string) {
  const field = (name: string) => Number(new RegExp(`^${name}:\\s+(\\d+)`, "m").exec(meminfo)?.[1]);
  const total = field("MemTotal");
  const available = field("MemAvailable");
  if (!total || Number.isNaN(available)) {
    throw new Error("MemTotal/MemAvailable not found in /proc/meminfo");
  }
  return Math.min(100, Math.max(0, (100 * (total - available)) / total));
}

export function parseUptime(text: string) {
  const seconds = Number(text.trim().split(/\s+/)[0]);
  if (!Number.isFinite(seconds)) throw new Error("invalid /proc/uptime");
  return seconds;
}

/**
 * Reads the Vitals-Deck energy file (`day_joules`, `month_joules`, `updated` in seconds).
 * Returns `null` if the counters are older than `maxAgeMs`: the Deck stopped writing,
 * and old totals would read as live.
 */
export function parseEnergy(text: string, now: number, maxAgeMs: number): HomelabStatus["energy"] {
  const data: unknown = JSON.parse(text);
  if (typeof data !== "object" || data === null) return null;
  const { day_joules, month_joules, updated } = data as Record<string, unknown>;
  if (typeof day_joules !== "number" || typeof month_joules !== "number" || typeof updated !== "number") {
    return null;
  }
  if (now - updated * 1000 > maxAgeMs) return null;
  return { todayKwh: day_joules / JOULES_PER_KWH, monthKwh: month_joules / JOULES_PER_KWH };
}

export function isHomelabStatus(value: unknown): value is HomelabStatus {
  if (typeof value !== "object" || value === null) return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.uptime === "number" &&
    typeof item.cpu === "number" &&
    typeof item.memory === "number" &&
    typeof item.sampledAt === "number" &&
    (item.energy === null || typeof item.energy === "object")
  );
}
