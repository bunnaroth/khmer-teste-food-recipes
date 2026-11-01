"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/story", label: "Our story" },
  { href: "/cuisine", label: "Cuisine" },
  { href: "/culture", label: "Culture & Journal" },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-chrome sticky top-0 z-30 flex h-[88px] items-center justify-between border-b border-line bg-white px-[6%] text-black max-[600px]:h-[72px] max-[600px]:px-[5%]">
      <button
        className="relative z-[3] inline-flex cursor-pointer items-center gap-3 border-0 bg-transparent py-3 text-black uppercase"
        type="button"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="flex w-[23px] flex-col gap-[5px]" aria-hidden="true">
          <i className={`block h-px w-[22px] bg-black ${menuOpen ? "translate-y-[3px] rotate-45" : ""}`} />
          <i className={`block h-px w-[15px] bg-black ${menuOpen ? "w-[22px] -translate-y-[3px] -rotate-45" : ""}`} />
        </span>
        <span className="text-[9px] font-bold tracking-[0.16em] max-[600px]:hidden">Menu</span>
      </button>
      <Link className="absolute left-1/2 z-[3] inline-flex -translate-x-1/2 items-center gap-[9px] text-black max-[600px]:gap-[5px]" href="/" aria-label="Taste of Cambodia home">
        <span className="brand-name whitespace-nowrap text-xs font-bold tracking-[0.13em] max-[600px]:text-[9px] max-[600px]:tracking-[0.08em]">
          <small className="mb-0.5 block text-center font-khmer text-[15px] font-medium tracking-[0.02em] text-black max-[600px]:text-[12px]">រសជាតិនៃកម្ពុជា</small>
          TASTE OF CAMBODIA
        </span>
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
