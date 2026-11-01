import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/culture/ArticleCard";
import { articles, dishes, getArticleBySlug, ingredients, sources } from "@/data/content";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  return article
    ? { title: article.title, description: article.dek }
    : { title: "Story not found" };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const relatedDishes = dishes.filter((dish) =>
    article.relatedDishSlugs.includes(dish.slug),
  );
  const relatedIngredients = ingredients.filter((ingredient) =>
    article.relatedIngredientIds.includes(ingredient.id),
  );
  const references = sources.filter((source) =>
    article.sourceIds.includes(source.id),
  );
  const relatedArticles = articles.filter(
    (candidate) => candidate.id !== article.id,
  );

  return (
    <main className="pb-[70px]">
      <nav className="mx-auto flex max-w-[1100px] flex-wrap items-center gap-[11px] px-[6%] py-5 text-[9px] text-muted [&>a:hover]:text-terracotta [&>span:last-child]:text-green" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/culture">Culture</Link>
        <span aria-hidden="true">/</span>
        <span>{article.title}</span>
      </nav>
      <header className="mx-auto max-w-[900px] px-[6%] pt-[45px] pb-[35px] text-center max-[600px]:pt-[30px]">
        <p className="mb-[17px] text-[8px] font-bold tracking-[0.17em] text-terracotta">{article.category} · {article.readMinutes} MIN READ</p>
        <h1 className="m-0 font-serif text-[clamp(43px,6vw,70px)] font-normal leading-[1.08] tracking-[-0.05em] text-green">{article.title}</h1>
        <p className="mx-auto my-[18px] max-w-[560px] text-[13px] leading-[1.8] text-muted">{article.dek}</p>
        <time className="text-[9px] uppercase tracking-[0.1em] text-muted" dateTime={article.publishedAt}>{article.publishedAt}</time>
      </header>
      <figure className="relative m-0 h-[clamp(250px,48vw,540px)]">
        <Image className="object-cover" src={article.image} alt={article.imageAlt} fill priority sizes="100vw" />
      </figure>
      <article className="mx-auto max-w-[720px] px-[6%] pt-12 pb-[25px] [&>p]:mb-[23px] [&>p]:text-sm [&>p]:leading-[2] [&>p]:text-charcoal max-[600px]:[&>p]:text-[13px]">
        {article.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {relatedIngredients.length > 0 && (
          <section className="mt-[35px] border-t border-line pt-[22px]">
            <h2 className="mb-[13px] font-serif text-[25px] font-normal text-green">Ingredients in this story</h2>
            <ul className="m-0 list-none p-0 [&>li]:flex [&>li]:items-center [&>li]:justify-between [&>li]:border-b [&>li]:border-line [&>li]:py-3 [&>li_span:first-child]:text-[11px] [&>li_span:first-child]:text-green [&>li_span:last-child]:text-[11px] [&>li_span:last-child]:text-terracotta">
              {relatedIngredients.map((ingredient) => (
                <li key={ingredient.id}>
                  <span>{ingredient.name}</span>
                  <span className="font-khmer text-[11px] text-muted" lang="km">{ingredient.khmerName}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
        {references.length > 0 && (
          <section className="mt-[35px] border-t border-line pt-[22px]">
            <h2 className="mb-[13px] font-serif text-[25px] font-normal text-green">Sources & further reading</h2>
            <ul className="m-0 list-none p-0 [&>li]:border-b [&>li]:border-line [&>li]:py-3 [&_a]:text-[11px] [&_a]:text-green [&_a]:underline [&_a]:underline-offset-[3px]">
              {references.map((source) => (
                <li key={source.id}>
                  <a href={source.url} target="_blank" rel="noreferrer">
                    {source.title} · {source.organization}
                  </a>
                  <p className="mt-[7px] mb-0 text-[10px] leading-[1.7] text-muted">{source.description}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
        {article.citationStatus === "needs-review" && (
          <p className="mt-[30px] border-l-2 border-gold pl-3 text-[10px] italic text-muted">
            Editorial draft · Cultural and historical claims require source
            review before publication.
          </p>
        )}
      </article>
      {relatedDishes.length > 0 && (
        <section className="mx-auto max-w-[1100px] px-[6%] py-10">
          <div>
            <p className="mb-[17px] text-[8px] font-bold tracking-[0.17em] text-terracotta">FROM THE RECIPE BOX</p>
            <h2 className="m-0 font-serif text-[38px] font-normal text-green">Make a little <em className="font-normal text-terracotta">something.</em></h2>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {relatedDishes.map((dish) => (
              <ArticleDish key={dish.slug} slug={dish.slug} name={dish.name} />
            ))}
          </div>
        </section>
      )}
      {relatedArticles.length > 0 && (
        <section className="mx-auto max-w-[1100px] px-[6%] py-10">
          <p className="mb-[17px] text-[8px] font-bold tracking-[0.17em] text-terracotta">KEEP READING</p>
          <div className="mt-5 grid grid-cols-2 gap-6 max-[600px]:grid-cols-1">
            {relatedArticles.map((related) => (
              <ArticleCard article={related} key={related.id} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function ArticleDish({ slug, name }: { slug: string; name: string }) {
  return (
    <Link className="border border-line px-[15px] py-3 text-[10px] text-green" href={`/cuisine/${slug}`}>
      {name} <span className="ml-3 text-terracotta" aria-hidden="true">↗</span>
    </Link>
  );
}
