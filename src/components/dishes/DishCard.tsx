import Image from "next/image";
import Link from "next/link";
import type { Dish } from "@/types/dish";
import { requireCategoryById } from "@/data/content";

export function DishCard({
  dish,
  loading = "lazy",
}: {
  dish: Dish;
  loading?: "eager" | "lazy";
}) {
  const category = requireCategoryById(dish.categoryId);

  return (
    <article className="min-w-0">
      <Link
        className="group relative block aspect-[0.93] overflow-hidden bg-black"
        href={`/cuisine/${dish.slug}`}
      >
        <Image
          className="object-cover"
          src={dish.image}
          alt={dish.imageAlt}
          fill
          loading={loading}
          sizes="(max-width: 640px) 90vw, (max-width: 1000px) 45vw, 30vw"
        />
      </Link>
      <div className="mt-[17px] flex items-center justify-between">
        <div>
          <span className="text-[8px] font-bold uppercase tracking-[0.16em] text-terracotta">{category.name}</span>
          <h3 className="mt-[5px] mb-0 font-serif text-2xl font-bold text-green">
            <Link href={`/cuisine/${dish.slug}`}>{dish.name}</Link>
          </h3>
          <p className="font-khmer mt-[3px] mb-0 text-xs text-muted">{dish.khmerName}</p>
        </div>
      </div>
      <p className="my-3 max-w-[350px] text-[11px] leading-[1.7] text-muted">{dish.summary}</p>
      <div className="flex gap-4 border-t border-line pt-[10px] text-[9px] uppercase tracking-[0.06em] text-muted">
        <span>{dish.prepMinutes + dish.cookMinutes} min</span>
        <span>{dish.difficulty}</span>
      </div>
    </article>
  );
}
