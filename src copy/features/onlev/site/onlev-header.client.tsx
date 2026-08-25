"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { OnlevLogo } from "../brand/onlev-logo";

const links = [
  { href: "/systems", label: "Systems" },
  { href: "/work", label: "Live proof" },
  { href: "/process", label: "Process" },
  { href: "/#investment", label: "Investment" },
];

export function OnlevHeader({ overlay = false }: { overlay?: boolean }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="onlev-header" data-overlay={overlay || undefined} data-open={open || undefined}>
      <Link className="onlev-header__brand" href="/" aria-label="ONLEV home">
        <OnlevLogo inverse={overlay} />
      </Link>
      <button
        className="onlev-header__menu"
        type="button"
        aria-expanded={open}
        aria-controls="onlev-primary-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        <span>{open ? "Close" : "Menu"}</span>
        <i aria-hidden="true" />
      </button>
      <nav id="onlev-primary-navigation" className="onlev-header__nav" aria-label="Primary navigation">
        {links.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)} aria-current={pathname === link.href ? "page" : undefined}>
            {link.label}
          </Link>
        ))}
        <Link className="onlev-header__cta" href="/contact" onClick={() => setOpen(false)}>Request this system</Link>
      </nav>
    </header>
  );
}
