"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { homelabEndpoint, homelabPollMs, isHomelabStatus, type HomelabStatus } from "@/lib/homelab";
import { localePath, projectsPath } from "@/lib/site";
import { ArrowRightIcon, ClockIcon, CpuIcon, MemoryIcon, ZapIcon } from "./icons";

type HomelabProps = {
  locale: Locale;
  content: Dictionary["homelab"];
};

type State =
  | { kind: "loading" }
  | { kind: "online"; status: HomelabStatus }
  | { kind: "offline" };

function formatUptime(seconds: number, content: Dictionary["homelab"]) {
  const days = Math.floor(seconds / 86_400);
  const hours = Math.floor((seconds % 86_400) / 3_600);
  const minutes = Math.floor((seconds % 3_600) / 60);
  if (days > 0) return `${days}${content.days} ${hours}${content.hours}`;
  if (hours > 0) return `${hours}${content.hours} ${minutes}${content.minutes}`;
  return `${minutes} ${content.minutes}`;
}

/** Bar under a percentage; empty track while there is no reading. */
function Meter({ value }: { value: number | undefined }) {
  return (
    <span aria-hidden="true" className="mt-3 block h-1 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
      <span
        className="block h-full rounded-full bg-violet-500 transition-[width] duration-700 motion-reduce:transition-none"
        style={{ width: value === undefined ? 0 : `${Math.max(2, value)}%` }}
      />
    </span>
  );
}

function Tile({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-black/5 bg-black/[0.02] p-4 dark:border-white/5 dark:bg-white/[0.03]">
      <dt className="flex items-center gap-2 text-xs font-medium text-foreground/60">
        <span className="text-violet-500">{icon}</span>
        {label}
      </dt>
      <dd className="mt-2 font-pixel text-lg tabular-nums text-foreground">{children}</dd>
    </div>
  );
}

/**
 * "This site runs in my homelab": live CPU, RAM, uptime and energy from `/api/homelab`.
 * The home is static, so the data is fetched in the browser, only while the card is on
 * screen and the tab is visible, every `homelabPollMs`. A failed request shows the
 * offline line instead of stale numbers.
 */
export default function Homelab({ locale, content }: HomelabProps) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    let controller: AbortController | undefined;
    let onScreen = false;

    const stop = () => {
      clearTimeout(timer);
      timer = undefined;
      controller?.abort();
    };

    const load = async () => {
      controller = new AbortController();
      try {
        const response = await fetch(homelabEndpoint, { signal: controller.signal, cache: "no-store" });
        const data: unknown = response.ok ? await response.json() : null;
        setState(isHomelabStatus(data) ? { kind: "online", status: data } : { kind: "offline" });
      } catch (error) {
        if ((error as Error).name === "AbortError") return;
        setState({ kind: "offline" });
      }
      if (onScreen && document.visibilityState === "visible") {
        timer = setTimeout(load, homelabPollMs);
      }
    };

    const sync = () => {
      const active = onScreen && document.visibilityState === "visible";
      if (active && timer === undefined) {
        timer = setTimeout(load, 0);
      } else if (!active) {
        stop();
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      sync();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      stop();
    };
  }, []);

  const number = (value: number, digits: number) =>
    new Intl.NumberFormat(locale, { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);

  const status = state.kind === "online" ? state.status : null;
  const placeholder = <span className="text-foreground/30">--</span>;

  return (
    <aside
      ref={ref}
      aria-labelledby="homelab-title"
      aria-busy={state.kind === "loading"}
      className="mt-12 rounded-2xl border border-black/10 bg-white/60 p-6 shadow-sm dark:border-white/10 dark:bg-white/5"
    >
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
        <div>
          <h3 id="homelab-title" className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
            <span aria-hidden="true" className="relative flex size-2.5">
              {state.kind === "online" && (
                <span className="absolute inline-flex size-full rounded-full bg-emerald-400 opacity-60 motion-safe:animate-ping" />
              )}
              <span
                className={`relative inline-flex size-2.5 rounded-full ${
                  state.kind === "online"
                    ? "bg-emerald-500"
                    : state.kind === "offline"
                      ? "bg-foreground/30"
                      : "bg-amber-400"
                }`}
              />
            </span>
            {content.title}
          </h3>
          <p className="mt-1 text-sm text-foreground/60">
            {state.kind === "offline" ? content.offline : content.description}
          </p>
        </div>
        <Link
          href={localePath(locale, `${projectsPath}/vitals-deck`)}
          className="inline-flex items-center gap-1.5 rounded-full text-sm font-medium text-violet-600 transition-colors hover:text-violet-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500 dark:text-violet-400 dark:hover:text-violet-300 dark:focus-visible:outline-violet-400"
        >
          {content.project}
          <ArrowRightIcon className="size-4" />
        </Link>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Tile icon={<ClockIcon className="size-4" />} label={content.uptime}>
          {status ? formatUptime(status.uptime, content) : placeholder}
        </Tile>
        <Tile icon={<CpuIcon className="size-4" />} label={content.cpu}>
          {status ? `${status.cpu}%` : placeholder}
          <Meter value={status?.cpu} />
        </Tile>
        <Tile icon={<MemoryIcon className="size-4" />} label={content.memory}>
          {status ? `${status.memory}%` : placeholder}
          <Meter value={status?.memory} />
        </Tile>
        <Tile icon={<ZapIcon className="size-4" />} label={content.energy}>
          {status?.energy ? (
            <>
              {number(status.energy.todayKwh, 2)} kWh
              <span className="mt-1 block font-sans text-xs font-normal text-foreground/60">
                {content.today} · {number(status.energy.monthKwh, 1)} kWh {content.month}
              </span>
            </>
          ) : (
            placeholder
          )}
        </Tile>
      </dl>

      {status && (
        <p className="mt-4 text-xs text-foreground/50">
          {content.updated} ·{" "}
          <time dateTime={new Date(status.sampledAt).toISOString()}>
            {new Intl.DateTimeFormat(locale, { timeStyle: "short" }).format(status.sampledAt)}
          </time>
        </p>
      )}
    </aside>
  );
}
