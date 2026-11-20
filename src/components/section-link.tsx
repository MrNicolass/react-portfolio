"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { sections, type SectionKey } from "@/lib/site";

type SectionLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  section: SectionKey;
};

/**
 * Link to a home page section that works from any page.
 * On the home page it scrolls smoothly; elsewhere it navigates to `/{locale}#{id}`.
 */
export default function SectionLink({ section, onClick, ...props }: SectionLinkProps) {
  const pathname = usePathname();
  const params = useParams<{ locale: string }>();
  const scroll = useSmoothScroll();
  const id = sections[section];
  const home = `/${params.locale}`;
  const onHome = pathname === home;

  return (
    <Link
      href={`${home}#${id}`}
      scroll={!onHome}
      onClick={(event) => {
        onClick?.(event);
        if (onHome && !event.defaultPrevented) {
          event.preventDefault();
          scroll(`#${id}`);
          history.replaceState(null, "", section === "home" ? home : `#${id}`);
        }
      }}
      {...props}
    />
  );
}
