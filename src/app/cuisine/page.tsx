import type { Metadata } from "next";
import { DishBrowser } from "@/components/dishes/DishBrowser";
import { categories } from "@/data/categories";
import { cuisineEditorial } from "@/data/editorial";
import type { Difficulty } from "@/types/dish";

export const metadata: Metadata = {
  title: "Discover Cambodian Cuisine",
  description:
    "Search and filter Cambodian recipes by dish name, category, cooking time, and difficulty.",
};

type CuisinePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const difficulties: Difficulty[] = ["Easy", "Medium", "Advanced"];
const sortOrders = ["featured", "name", "time"] as const;

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function isDifficulty(value: string): value is Difficulty {
  return difficulties.includes(value as Difficulty);
}

function isSortOrder(
  value: string,
): value is (typeof sortOrders)[number] {
  return sortOrders.includes(value as (typeof sortOrders)[number]);
}

export default async function CuisinePage({ searchParams }: CuisinePageProps) {
  const params = await searchParams;
  const query = firstParam(params.q) ?? "";
  const requestedCategory = firstParam(params.category) ?? "all";
  const requestedTime = firstParam(params.time) ?? "any";
  const requestedDifficulty = firstParam(params.difficulty) ?? "any";
  const requestedSort = firstParam(params.sort) ?? "featured";
  const initialFilters = {
    query,
    categoryId:
      requestedCategory === "all" ||
      categories.some((category) => category.id === requestedCategory)
        ? requestedCategory
        : "all",
    maxMinutes: ["30", "45", "60"].includes(requestedTime)
      ? requestedTime
      : "any",
    difficulty: isDifficulty(requestedDifficulty)
      ? requestedDifficulty
      : "any",
    sortOrder: isSortOrder(requestedSort) ? requestedSort : "featured",
  };
  return (
    <main className="min-h-[60vh]">
      <section className="bg-black px-[8%] py-[82px] text-center text-ivory max-[640px]:px-[7%] max-[640px]:py-[67px]">
        <p className="mb-[18px] text-[8px] font-bold tracking-[0.19em] text-gold">
          {cuisineEditorial.eyebrow} ·{" "}
          <span className="font-khmer" lang="km">រូបមន្តម្ហូប</span>
        </p>
        <h1 className="m-0 font-serif text-[clamp(48px,7vw,78px)] font-normal leading-[1.05] tracking-[-0.05em] max-[640px]:text-[48px]">
          {cuisineEditorial.titleLead}
          <br />
          <em className="font-normal text-gold">{cuisineEditorial.titleAccent}</em>
        </h1>
      </section>
      <section className="mx-auto max-w-[1260px] px-[6%] py-[78px] pb-[95px] max-[640px]:py-[63px] max-[640px]:pb-[72px]">
        <div className="mb-8 flex items-end justify-between max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-4">
          <div>
            <p className="mb-[18px] text-[10px] font-bold tracking-[0.18em] text-muted">{cuisineEditorial.sectionEyebrow}</p>
            <h2 className="m-0 font-serif text-[clamp(40px,5vw,58px)] font-normal leading-[1.08] tracking-[-0.04em] text-green">
              {cuisineEditorial.sectionTitleLead}
              <br />
              <em className="font-normal text-terracotta">{cuisineEditorial.sectionTitleAccent}</em>
            </h2>
          </div>
        </div>
        <DishBrowser initialFilters={initialFilters} />
        <p className="mt-[35px] text-[9px] italic leading-[1.7] text-muted">{cuisineEditorial.recipeNote}</p>
      </section>
    </main>
  );
}
