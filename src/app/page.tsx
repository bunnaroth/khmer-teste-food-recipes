import Image from "next/image";
import Link from "next/link";
import { DishCard } from "@/components/dishes/DishCard";
import { ArticleCard } from "@/components/culture/ArticleCard";
import {
  articles,
  categories,
  dishes,
  getIngredientById,
} from "@/data/content";
import { homepageEditorial } from "@/data/editorial";
import heroImage from "@/assets/images/editorial-food-table.jpg";
import marketImage from "@/assets/images/fresh-market-ingredients.jpg";
import spice from "@/assets/images/ingredient.jpg";

export default function Home() {
  const featuredDishes = homepageEditorial.featuredDishSlugs.map((slug) => {
    const dish = dishes.find((item) => item.slug === slug);
    if (!dish) throw new Error(`Missing featured dish content: ${slug}`);
    return dish;
  });
  const featuredCategories = homepageEditorial.featuredCategoryIds.map((id) => {
    const category = categories.find((item) => item.id === id);
    if (!category) throw new Error(`Missing featured category content: ${id}`);
    return category;
  });
  const journalArticles = homepageEditorial.journalArticleIds.map((id) => {
    const article = articles.find((item) => item.id === id);
    if (!article) throw new Error(`Missing homepage article content: ${id}`);
    return article;
  });
  const ingredientSpotlight = getIngredientById(
    homepageEditorial.ingredientSpotlightId,
  );
  if (!ingredientSpotlight) {
    throw new Error(
      `Missing homepage ingredient content: ${homepageEditorial.ingredientSpotlightId}`,
    );
  }

  return (
    <main>
      <section className="mx-auto grid min-h-[min(760px,86svh)] max-w-[1440px] grid-cols-[0.82fr_1.18fr] items-center gap-[5%] px-[6%] py-[55px] max-[760px]:grid-cols-1 max-[760px]:gap-8 max-[760px]:py-8">
        <div className="max-w-[620px] py-10">
          <p className="mb-6 text-[10px] font-bold tracking-[0.18em] text-muted">
            {homepageEditorial.heroEyebrow}
          </p>
          <h1 className="mb-7 m-0 text-[clamp(56px,8vw,112px)] font-bold leading-[0.95] tracking-[-0.07em] max-[640px]:text-[clamp(48px,13vw,72px)]" id="hero-heading">
            {homepageEditorial.heroTitleLead} {homepageEditorial.heroTitleAccent}
          </h1>
          <p className="mb-8 max-w-[420px] text-[15px] leading-[1.8] text-muted">
            Discover the dishes, ingredients, and stories of Cambodian food.
          </p>
          <Link className="interactive-button inline-flex min-h-[50px] items-center gap-5 border border-white bg-black px-6 text-[10px] font-bold uppercase tracking-[0.12em] text-white hover:bg-white hover:text-black" href="/cuisine">
            Explore the cuisine <span aria-hidden="true">→</span>
          </Link>
        </div>
        <figure className="relative m-0 min-h-[min(650px,70svh)] bg-black max-[760px]:min-h-[420px]">
          <Image
            className="object-cover"
            src={heroImage}
            alt="Editorial illustration placeholder for a Cambodian meal"
            fill
            priority
            sizes="(max-width: 760px) 100vw, 60vw"
          />
        </figure>
      </section>

      <section className="mx-auto grid min-h-[560px] max-w-[1260px] grid-cols-2 items-center gap-[8%] px-[6%] py-[90px] max-[640px]:grid-cols-1 max-[640px]:gap-8 max-[640px]:py-[65px]" id="introduction">
        <div>
          <p className="mb-5 text-[10px] font-bold tracking-[0.18em] text-muted">
            {homepageEditorial.introductionEyebrow}
          </p>
          <h2 className="mb-[19px] m-0 text-[clamp(42px,5.5vw,72px)] font-bold leading-[0.98] tracking-[-0.055em] text-green max-[640px]:text-[46px]">
            {homepageEditorial.introductionTitleLead}
            <br />
            <em className="not-italic">{homepageEditorial.introductionTitleAccent}</em>
          </h2>
          <p className="m-0 max-w-[390px] text-xs leading-[1.9] text-muted">
            {homepageEditorial.introductionBody}
          </p>
        </div>
        <figure className="relative my-0 min-h-[420px] self-stretch bg-black max-[640px]:min-h-[360px]">
          <Image
            className="object-cover"
            src={marketImage}
            alt="Neutral local placeholder for fresh market ingredients"
            fill
            sizes="(max-width: 700px) 90vw, 36vw"
          />
        </figure>
      </section>

      <section className="bg-black py-[86px] pb-[92px] max-[640px]:py-[70px]">
        <div className="mx-auto max-w-[1260px] px-[6%]">
          <div className="mb-[38px] flex items-end justify-between max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-[18px]">
            <div>
              <p className="mb-5 text-[10px] font-bold tracking-[0.18em] text-muted">
                {homepageEditorial.categoryEyebrow}
              </p>
              <h2 className="mb-[19px] m-0 text-[clamp(42px,5.5vw,72px)] font-bold leading-[0.98] tracking-[-0.055em] text-green max-[640px]:text-[46px]">
                {homepageEditorial.categoryTitleLead}
                <br />
                <em className="not-italic">{homepageEditorial.categoryTitleAccent}</em>
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-[14px] max-[900px]:grid-cols-2 max-[640px]:grid-cols-2 max-[400px]:grid-cols-1">
            {featuredCategories.map((category) => (
              <Link
                className="group interactive-button relative flex min-h-[195px] flex-col border border-white bg-white p-[21px] text-black transition-colors duration-300 hover:-translate-y-1 hover:bg-black hover:text-white active:translate-y-0 max-[640px]:min-h-[165px] max-[640px]:p-[17px]"
                href={`/cuisine?category=${encodeURIComponent(category.id)}`}
                key={category.id}
              >
                <span className="mt-auto font-serif text-[22px] text-black transition-colors duration-300 group-hover:text-white max-[640px]:text-[19px]">{category.name}</span>
                <span className="absolute right-[21px] bottom-5 text-base text-black transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" aria-hidden="true">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 pb-[105px] max-[640px]:py-[70px]">
        <div className="mx-auto max-w-[1260px] px-[6%]">
          <div className="mb-[38px] flex items-end justify-between max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-[18px]">
            <div>
              <p className="mb-5 text-[10px] font-bold tracking-[0.18em] text-muted">
                {homepageEditorial.featuredEyebrow}
              </p>
              <h2 className="mb-[19px] m-0 text-[clamp(42px,5.5vw,72px)] font-bold leading-[0.98] tracking-[-0.055em] text-green max-[640px]:text-[46px]">
                {homepageEditorial.featuredTitleLead}
                <br />
                <em className="not-italic">{homepageEditorial.featuredTitleAccent}</em>
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-[25px] max-[900px]:gap-[17px] max-[640px]:grid-cols-1 max-[640px]:gap-[38px]">
            {featuredDishes.map((dish, index) => (
              <DishCard
                dish={dish}
                key={dish.slug}
                loading={index === 0 ? "eager" : "lazy"}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="grid min-h-[510px] grid-cols-2 bg-black text-white max-[640px]:grid-cols-1">
        <div className="relative min-h-[420px] overflow-hidden bg-black max-[640px]:min-h-[300px]">
          <Image
            className="object-cover"
            src={spice}
            alt="Neutral local placeholder for Cambodian ingredients"
            fill
            sizes="(max-width: 700px) 100vw, 50vw"
          />
        </div>
        <div className="max-w-[600px] self-center px-[8%] py-[75px] pr-[12%] max-[640px]:px-[7%] max-[640px]:pt-0 max-[640px]:pb-[70px]">
          <p className="mb-[25px] text-[10px] font-bold tracking-[0.18em] text-white">
            {homepageEditorial.ingredientEyebrow}
          </p>
          <h2 className="mb-5 m-0 text-[clamp(42px,5.5vw,72px)] font-bold leading-[0.98] tracking-[-0.055em]">
            {homepageEditorial.ingredientTitleLead}
            <br />
            <em className="not-italic">{ingredientSpotlight.name.toLowerCase()}.</em>
          </h2>
          <p className="mb-[27px] max-w-[420px] text-xs leading-[1.9] text-white">{ingredientSpotlight.summary}</p>
          <Link className="interactive-button inline-flex min-h-[50px] items-center gap-5 border border-white px-[22px] text-[10px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-white hover:text-black" href="/culture">
            Explore the journal <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="py-[90px] pb-[100px] max-[640px]:py-[70px]">
        <div className="mx-auto max-w-[1260px] px-[6%]">
          <p className="mb-5 text-[10px] font-bold tracking-[0.18em] text-muted">
            {homepageEditorial.journalEyebrow}
          </p>
          <div className="mb-8 flex items-end justify-between max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-[18px]">
            <h2 className="mb-[19px] m-0 text-[clamp(42px,5.5vw,72px)] font-bold leading-[0.98] tracking-[-0.055em] text-green max-[640px]:text-[46px]">
              {homepageEditorial.journalTitleLead}
              <br />
              <em className="not-italic">{homepageEditorial.journalTitleAccent}</em>
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-7 max-[640px]:grid-cols-1">
            {journalArticles.map((article) => (
              <ArticleCard article={article} key={article.id} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
