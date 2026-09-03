"use client";

import { useState } from "react";
import { useScrollThrottle } from "@/hooks/use-scroll-throttle";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useScrollThrottle((p) => setProgress(p));

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-0.5">
      <div
        className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
