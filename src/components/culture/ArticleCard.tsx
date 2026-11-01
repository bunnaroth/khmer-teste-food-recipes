import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/dish";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="min-w-0">
      <Link
        className="group relative block aspect-[1.16] overflow-hidden bg-black"
        href={`/culture/${article.slug}`}
      >
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 90vw, (max-width: 1000px) 45vw, 30vw"
        />
      </Link>
      <p className="mb-2 mt-4 text-[8px] font-bold uppercase tracking-[0.13em] text-terracotta">
        {article.category} <span className="mx-[5px] text-gold">·</span>{" "}
        {article.readMinutes} min read
      </p>
      <h2 className="m-0 font-serif text-[23px] font-bold leading-[1.3] text-green">
        <Link href={`/culture/${article.slug}`}>{article.title}</Link>
      </h2>
      <p className="my-[10px] mb-[15px] text-[11px] leading-[1.7] text-muted">
        {article.dek}
      </p>
      <Link
        className="inline-flex gap-[14px] border-b border-white pb-[7px] text-[8px] font-bold uppercase tracking-[0.12em] text-green"
        href={`/culture/${article.slug}`}
      >
        Read the story <span className="text-terracotta" aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}
