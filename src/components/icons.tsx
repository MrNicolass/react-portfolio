import { useId, type SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Svg({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </Svg>
  );
}

export function CodeIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </Svg>
  );
}

export function ServerIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </Svg>
  );
}

export function WrenchIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </Svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M20 6 9 17l-5-5" />
    </Svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </Svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </Svg>
  );
}

export function GithubIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </Svg>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </Svg>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </Svg>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9" />
    </Svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </Svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </Svg>
  );
}

export function LogoIcon({ "aria-label": ariaLabel, ...props }: IconProps) {
  const rawId = useId();
  const gradientId = `nc-logo-${rawId.replace(/:/g, "")}`;
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label={ariaLabel ?? "NC"}
      {...props}
    >
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1="6"
          y1="14"
          x2="58"
          y2="50"
        >
          <stop offset="0" stopColor="#6366f1" />
          <stop offset="0.5" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#d946ef" />
        </linearGradient>
      </defs>
      <rect
        width="64"
        height="64"
        rx="16"
        className="fill-[#fafafa] dark:fill-[#09090b]"
      />
      <rect
        x="0.5"
        y="0.5"
        width="63"
        height="63"
        rx="15.5"
        fill="none"
        className="stroke-black/10 dark:stroke-white/10"
      />
      <g
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8.5 43V21L24.5 43V21" />
        <path d="M52.9 24.9A11 11 0 1 0 52.9 39.1" />
      </g>
    </svg>
  );
}

export function BrazilFlagIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-4 shrink-0 rounded-sm"
      {...props}
    >
      <rect width="24" height="24" rx="3" fill="#009c3b" />
      <polygon points="12,4 21,12 12,20 3,12" fill="#ffdf00" />
      <circle cx="12" cy="12" r="4.2" fill="#002776" />
      <path
        d="M8.2 12.8a4.2 4.2 0 0 1 7.4-1.6"
        stroke="#ffffff"
        strokeWidth="0.9"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function USFlagIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-4 shrink-0 rounded-sm"
      {...props}
    >
      <rect width="24" height="24" rx="3" fill="#ffffff" />
      <path d="M0 2.5h24v2H0zm0 3.7h24v2H0zm0 3.7h24v2H0zm0 3.7h24v2H0zm0 3.7h24v2H0zm0 3.7h24v2H0z" fill="#b22234" />
      <rect width="11" height="11" rx="1.5" fill="#3c3b6e" />
      <circle cx="3" cy="3" r="0.75" fill="#ffffff" />
      <circle cx="6" cy="3" r="0.75" fill="#ffffff" />
      <circle cx="9" cy="3" r="0.75" fill="#ffffff" />
      <circle cx="4.5" cy="5.5" r="0.75" fill="#ffffff" />
      <circle cx="7.5" cy="5.5" r="0.75" fill="#ffffff" />
      <circle cx="3" cy="8" r="0.75" fill="#ffffff" />
      <circle cx="6" cy="8" r="0.75" fill="#ffffff" />
      <circle cx="9" cy="8" r="0.75" fill="#ffffff" />
    </svg>
  );
}
