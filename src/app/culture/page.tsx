import type { Metadata } from "next";
import { ArticleCard } from "@/components/culture/ArticleCard";
import { articles } from "@/data/articles";
import { cultureEditorial } from "@/data/editorial";

export const metadata: Metadata = {
  title: "Culture & Journal",
  description:
    "Food stories, ingredient notes, and recipes from the Taste of Cambodia journal.",
};

export default function CulturePage() {
  return (
    <main>
      <section className="bg-black px-[8%] py-[82px] text-center text-ivory max-[560px]:px-[7%] max-[560px]:py-[65px]">
        <p className="mb-[18px] text-[8px] font-bold tracking-[0.19em] text-gold">
          {cultureEditorial.eyebrow} · <span className="font-khmer" lang="km">រឿងរ៉ាវម្ហូប</span>
        </p>
        <h1 className="m-0 font-serif text-[clamp(48px,7vw,78px)] font-normal leading-[1.05] tracking-[-0.05em] max-[560px]:text-[48px]">
          {cultureEditorial.titleLead}
          <br />
          <em className="font-normal text-gold">{cultureEditorial.titleAccent}</em>
        </h1>
      </section>
      <section className="mx-auto max-w-[1260px] px-[6%] py-[78px] pb-[95px] max-[560px]:py-[62px] max-[560px]:pb-[72px]">
        <div className="mb-[34px]">
          <p className="mb-[18px] text-[10px] font-bold tracking-[0.18em] text-muted">{cultureEditorial.sectionEyebrow}</p>
          <h2 className="m-0 font-serif text-[clamp(40px,5vw,58px)] font-normal leading-[1.08] tracking-[-0.04em] text-green">
            {cultureEditorial.sectionTitleLead}
            <br />
            <em className="font-normal text-terracotta">{cultureEditorial.sectionTitleAccent}</em>
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-[26px] max-[760px]:grid-cols-2 max-[560px]:grid-cols-1">
          {articles.map((article) => (
            <ArticleCard article={article} key={article.id} />
          ))}
        </div>
        <p className="mt-9 border-t border-line pt-[15px] text-[9px] italic text-muted">
          {cultureEditorial.sourceNote}
        </p>
      </section>
    </main>
  );
}
