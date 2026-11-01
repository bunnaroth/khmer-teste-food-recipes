import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-chrome grid grid-cols-3 items-center gap-[22px] border-t border-line bg-white px-[6%] py-9 text-black max-[640px]:grid-cols-2 max-[640px]:px-[6%] max-[640px]:py-[30px]">
      <Link className="inline-flex justify-self-start gap-2 text-black" href="/">
        <span className="brand-name text-[10px] font-bold tracking-[0.12em]">
          <small className="mb-[3px] block text-center font-khmer text-[13px] font-normal tracking-normal text-black" lang="km">រសជាតិនៃកម្ពុជា</small>
          TASTE OF CAMBODIA
        </span>
      </Link>
      <p className="m-0 text-center text-sm text-black max-[640px]:hidden">Every dish tells a story.</p>
      <div className="flex flex-wrap justify-end gap-[18px] max-[640px]:col-start-2 max-[640px]:row-start-1 max-[640px]:gap-[11px]">
        <Link className="text-[9px] tracking-[0.08em] text-black hover:underline max-[640px]:text-[8px]" href="/story">Our story</Link>
        <Link className="text-[9px] tracking-[0.08em] text-black hover:underline max-[640px]:text-[8px]" href="/cuisine">Cuisine</Link>
        <Link className="text-[9px] tracking-[0.08em] text-black hover:underline max-[640px]:text-[8px]" href="/culture">Culture & Journal</Link>
      </div>
      <small className="col-span-full border-t border-line pt-4 text-center text-[9px] tracking-[0.04em] text-[#767676]">
        Taste of Cambodia · A food and culture
      </small>
    </footer>
  );
}
