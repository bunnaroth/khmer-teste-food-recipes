import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="site-chrome grid grid-cols-[auto_1fr] items-center gap-6 border-t border-white/20 bg-black px-[6%] py-6 text-white max-[640px]:grid-cols-1 max-[640px]:justify-items-center max-[640px]:gap-4 max-[640px]:px-[5%] max-[640px]:py-5">
      <Link className="inline-flex justify-self-start rounded-full transition-all duration-200 hover:scale-105 hover:drop-shadow-[0_4px_8px_rgba(212,166,42,0.45)] active:scale-95 max-[640px]:justify-self-center" href="/" aria-label="Taste of Cambodia home">
        <Image className="h-[72px] w-[108px] object-contain" src="/logo.png" alt="" width={1536} height={1024} />
      </Link>
      <nav className="flex flex-nowrap justify-end gap-2 max-[640px]:w-full max-[640px]:justify-center max-[360px]:gap-0" aria-label="Footer navigation">
        <Link className="inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-full border-0 bg-white/10 px-4 text-[11px] font-medium tracking-[0.04em] text-white transition-all duration-200 hover:scale-105 hover:bg-[#d4a62a] hover:text-black hover:shadow-[0_4px_12px_rgba(212,166,42,0.3)] active:scale-95 max-[640px]:px-3 max-[640px]:text-[10px] max-[360px]:px-2 max-[360px]:text-[9px]" href="/story">Our story</Link>
        <Link className="inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-full border-0 bg-white/10 px-4 text-[11px] font-medium tracking-[0.04em] text-white transition-all duration-200 hover:scale-105 hover:bg-[#d4a62a] hover:text-black hover:shadow-[0_4px_12px_rgba(212,166,42,0.3)] active:scale-95 max-[640px]:px-3 max-[640px]:text-[10px] max-[360px]:px-2 max-[360px]:text-[9px]" href="/cuisine">Cuisine</Link>
        <Link className="inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-full border-0 bg-white/10 px-4 text-[11px] font-medium tracking-[0.04em] text-white transition-all duration-200 hover:scale-105 hover:bg-[#d4a62a] hover:text-black hover:shadow-[0_4px_12px_rgba(212,166,42,0.3)] active:scale-95 max-[640px]:px-3 max-[640px]:text-[10px] max-[360px]:px-2 max-[360px]:text-[9px]" href="/culture">Journal</Link>
      </nav>
    </footer>
  );
}
