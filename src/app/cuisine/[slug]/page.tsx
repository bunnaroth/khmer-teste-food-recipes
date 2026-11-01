import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RecipeTools } from "@/components/recipes/RecipeTools";
import {
  dishes,
  getCategoryById,
  getDishBySlug,
  getIngredientById,
  sources,
} from "@/data/content";

type RecipePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return dishes.map((dish) => ({ slug: dish.slug }));
}

export async function generateMetadata({
  params,
}: RecipePageProps): Promise<Metadata> {
  const { slug } = await params;
  const dish = getDishBySlug(slug);
  if (!dish) return { title: "Recipe not found" };
  return {
    title: dish.name,
    description: dish.summary,
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const dish = getDishBySlug(slug);
  if (!dish) notFound();
  const category = getCategoryById(dish.categoryId);
  if (!category) throw new Error(`Missing category for recipe "${dish.slug}".`);
  const relatedIngredients = dish.keyIngredientIds.map((ingredientId) => {
    const ingredient = getIngredientById(ingredientId);
    if (!ingredient) {
      throw new Error(
        `Missing ingredient "${ingredientId}" for recipe "${dish.slug}".`,
      );
    }
    return ingredient;
  });
  const references = sources.filter((source) =>
    dish.sourceIds.includes(source.id),
  );

  return (
    <main className="min-h-[60vh]">
      <div className="mx-auto flex max-w-[1260px] flex-wrap items-center gap-[11px] px-[6%] py-5 text-[9px] tracking-[0.04em] text-muted print:hidden [&>a:hover]:text-terracotta [&>span:last-child]:text-green">
        <Link href="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link href="/cuisine">Cuisine</Link>
        <span aria-hidden="true">/</span>
        <span>{dish.name}</span>
      </div>
      <section className="grid min-h-[475px] grid-cols-2 print:min-h-0 max-[640px]:grid-cols-1">
        <div className="relative min-h-[420px] bg-black print:hidden max-[640px]:min-h-[310px]">
          <Image
            className="object-cover"
            src={dish.image}
            alt={dish.imageAlt}
            fill
            priority
            sizes="(max-width: 800px) 100vw, 52vw"
          />
        </div>
        <div className="max-w-[650px] self-center px-[12%] py-[65px] max-[640px]:px-[7%] max-[640px]:pt-[42px] max-[640px]:pb-[55px]">
          <p className="mb-[17px] text-[10px] font-bold tracking-[0.17em] text-muted">{category.name} · A KHMER RECIPE</p>
          <h1 className="m-0 text-[clamp(48px,6vw,75px)] font-bold leading-[1.04] tracking-[-0.05em] text-green max-[640px]:text-[55px]">{dish.name}</h1>
          <p className="font-khmer my-[6px] mb-[14px] text-xl text-terracotta" lang="km">{dish.khmerName}</p>
          <p className="m-0 max-w-[470px] text-xs leading-[1.8] text-muted">{dish.summary}</p>
          <div className="mt-[25px] flex gap-[35px] border-t border-line pt-4 max-[640px]:gap-6">
            <div>
              <span className="text-[9px] font-bold tracking-[0.13em] text-muted">PREP</span>
              <strong className="block text-[11px] font-medium text-green">{dish.prepMinutes} min</strong>
            </div>
            <div>
              <span className="text-[9px] font-bold tracking-[0.13em] text-muted">COOK</span>
              <strong className="block text-[11px] font-medium text-green">{dish.cookMinutes} min</strong>
            </div>
            <div>
              <span className="text-[9px] font-bold tracking-[0.13em] text-muted">LEVEL</span>
              <strong className="block text-[11px] font-medium text-green">{dish.difficulty}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1260px] grid-cols-[0.72fr_1.5fr] items-start gap-[5%] px-[6%] pt-[65px] pb-[100px] print:block print:p-0 max-[900px]:grid-cols-1 max-[900px]:gap-[30px] max-[640px]:px-[5%] max-[640px]:pt-[45px] max-[640px]:pb-[70px]">
        <div className="py-[15px] print:hidden max-[900px]:max-w-[620px]">
          <p className="mb-[17px] text-[10px] font-bold tracking-[0.17em] text-muted">A LITTLE CONTEXT</p>
          <h2 className="mb-[17px] m-0 font-serif text-[39px] font-normal leading-[1.12] tracking-[-0.04em] text-green">
            A dish with
            <br />
            its own <em className="font-normal text-terracotta">rhythm.</em>
          </h2>
          <p className="mb-[14px] text-[11px] leading-[1.9] text-muted">{dish.story}</p>
          <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-muted">
            {dish.recipeStatus === "tested"
              ? "Tested recipe"
              : "Editorial recipe · not yet kitchen-tested"}
          </p>
          <p className="border-l-2 border-gold pl-3 text-[11px] italic leading-[1.9] text-muted">
            This is a home-cooking interpretation. Ingredients and methods can
            vary between cooks and regions.
          </p>
          {relatedIngredients.length > 0 && (
            <section className="mt-[23px] border-t border-line pt-[15px]">
              <h3 className="mb-[10px] font-serif text-xl font-normal text-green">Key ingredients</h3>
              <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[10px] leading-[1.6] text-muted">
                {relatedIngredients.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.name}</li>
                ))}
              </ul>
            </section>
          )}
          {references.length > 0 && (
            <section className="mt-[23px] border-t border-line pt-[15px]">
              <h3 className="mb-[10px] font-serif text-xl font-normal text-green">Sources</h3>
              <ul className="m-0 flex list-none flex-col gap-2 p-0 [&_a]:text-[10px] [&_a]:leading-[1.6] [&_a]:text-muted [&_a:hover]:text-terracotta">
                {references.map((source) => (
                  <li key={source.id}>
                    <a href={source.url} target="_blank" rel="noreferrer">
                      {source.title}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
        <RecipeTools dish={dish} />
      </section>
    </main>
  );
}
