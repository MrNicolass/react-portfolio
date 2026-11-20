"use client";

import { PrinterIcon } from "./icons";

type PrintButtonProps = {
  label: string;
  className?: string;
};

export default function PrintButton({ label, className }: PrintButtonProps) {
  return (
    <button type="button" onClick={() => window.print()} className={className}>
      <PrinterIcon className="size-4" />
      {label}
    </button>
  );
}
