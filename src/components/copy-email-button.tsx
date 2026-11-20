"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { copyText } from "@/lib/clipboard";
import { CheckIcon, CopyIcon } from "./icons";

type CopyEmailButtonProps = {
  email: string;
  content: Pick<Dictionary["contact"], "copy" | "copied" | "copyFailed">;
  className?: string;
};

type Status = { ok: boolean; text: string };

/** How long the "copied" bubble and the check icon stay visible. */
const FEEDBACK_MS = 2500;

/**
 * Icon button that copies the e-mail address. The feedback bubble above it is also the
 * `role="status"` region, always mounted so screen readers announce every change.
 */
export default function CopyEmailButton({ email, content, className = "" }: CopyEmailButtonProps) {
  const [status, setStatus] = useState<Status | null>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    const ok = await copyText(email);
    window.clearTimeout(timer.current);
    setStatus({ ok, text: ok ? content.copied : content.copyFailed });
    timer.current = window.setTimeout(() => setStatus(null), FEEDBACK_MS);
  }

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={copy}
        aria-label={content.copy}
        title={content.copy}
        className={`inline-flex items-center justify-center ${className}`}
      >
        {status?.ok ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
      </button>
      <span
        role="status"
        className={`pointer-events-none absolute right-0 bottom-full mb-2 rounded-md px-2.5 py-1 text-xs font-medium whitespace-nowrap shadow-md transition-opacity ${
          status ? "opacity-100" : "opacity-0"
        } ${status && !status.ok ? "bg-red-600 text-white" : "bg-foreground text-background"}`}
      >
        {status?.text}
      </span>
    </span>
  );
}
