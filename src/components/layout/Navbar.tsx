"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/story", label: "Our story" },
  { href: "/cuisine", label: "Cuisine" },
  { href: "/culture", label: "Journal" },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-chrome z-30 flex h-[88px] items-center justify-between border-b border-line bg-white px-[6%] text-black max-[600px]:h-[72px] max-[600px]:px-[5%]">
      <button
        className="group relative z-[3] inline-flex min-h-11 min-w-11 cursor-pointer items-center gap-2 rounded-full border border-[#d4a62a]/60 bg-transparent px-3 py-2 text-black uppercase transition-all duration-200 hover:scale-105 hover:shadow-[0_4px_14px_rgba(212,166,42,0.3)] active:scale-95 max-[600px]:px-3"
        type="button"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="flex h-7 w-7 flex-col items-center justify-center gap-[4px] rounded-full border border-[#d4a62a] text-[#d4a62a]" aria-hidden="true">
          <i className={`block h-[2px] w-4 bg-current transition-transform duration-200 ${menuOpen ? "translate-y-[3px] rotate-45" : ""}`} />
          <i className={`block h-[2px] w-3 bg-current transition-all duration-200 ${menuOpen ? "w-4 -translate-y-[3px] -rotate-45" : ""}`} />
        </span>
        <span className="pr-1 text-[9px] font-bold tracking-[0.16em] max-[600px]:hidden">Menu</span>
      </button>
      <Link className="absolute left-1/2 z-[3] inline-flex -translate-x-1/2 items-center rounded-full transition-all duration-200 hover:scale-105 hover:drop-shadow-[0_4px_8px_rgba(212,166,42,0.45)] active:scale-95" href="/" aria-label="Taste of Cambodia home">
        <Image className="h-[80px] w-[120px] object-contain max-[600px]:h-[70px] max-[600px]:w-[105px]" src="/logo.png" alt="" width={1536} height={1024} priority />
      </Link>
      {menuOpen && (
        <button
          className="fixed inset-0 z-[1] cursor-default border-0 bg-black/35"
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <nav
        className={`fixed inset-y-0 left-0 z-[2] flex w-[min(460px,88vw)] flex-col items-start justify-center bg-green-deep px-[max(8vw,calc((100vw-1200px)/2))] py-[100px] ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
        id="primary-navigation"
        aria-label="Main navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <Link
          className={`w-full border-b border-white/20 py-[14px] font-serif text-[clamp(30px,4vw,43px)] font-bold text-ivory hover:text-gold ${pathname === "/" ? "text-gold" : ""}`}
          href="/"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
        {links.map(({ href, label }) => (
          <Link
            className={`w-full border-b border-white/20 py-[14px] font-serif text-[clamp(30px,4vw,43px)] font-bold text-ivory hover:text-gold ${pathname.startsWith(href) ? "text-gold" : ""}`}
            href={href}
            key={href}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </Link>
        ))}
        <span className="mt-7 text-sm text-white">Every dish tells a story.</span>
      </nav>
    </header>
  );
}
