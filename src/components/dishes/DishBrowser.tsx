"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { categories, dishes, ingredients } from "@/data/content";
import {
  filterDishes,
  type DishFilterState,
  type DishSortOrder,
} from "@/lib/dish-filters";
import { DishCard } from "./DishCard";

const difficulties = ["Easy", "Medium", "Advanced"] as const;

function isSortOrder(value: string | undefined): value is DishSortOrder {
  return value === "name" || value === "time" || value === "featured";
}

export function DishBrowser({
  initialFilters,
}: {
  initialFilters: DishFilterState;
}) {
  const pathname = usePathname();
  const [filters, setFilters] = useState(initialFilters);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { query, categoryId, maxMinutes, difficulty, sortOrder } = filters;

  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (categoryId !== "all") params.set("category", categoryId);
    if (maxMinutes !== "any") params.set("time", maxMinutes);
    if (difficulty !== "any") params.set("difficulty", difficulty);
    if (sortOrder !== "featured") params.set("sort", sortOrder);

    const search = params.toString();
    const nextUrl = search ? `${pathname}?${search}` : pathname;
    const currentUrl = `${window.location.pathname}${window.location.search}`;
    if (currentUrl !== nextUrl) {
      window.history.replaceState(null, "", nextUrl);
    }
  }, [categoryId, difficulty, maxMinutes, pathname, query, sortOrder]);

  const filteredDishes = filterDishes(dishes, ingredients, filters);

  function resetFilters() {
    setFilters({
      query: "",
      categoryId: "all",
      maxMinutes: "any",
      difficulty: "any",
      sortOrder: "featured",
    });
  }

  const activeFilterCount = [
    query.trim() !== "",
    categoryId !== "all",
    maxMinutes !== "any",
    difficulty !== "any",
    sortOrder !== "featured",
  ].filter(Boolean).length;
  const hasActiveFilters = activeFilterCount > 0;

  return (
    <div>
      <div className="grid grid-cols-[minmax(210px,1.6fr)_repeat(4,minmax(125px,1fr))] items-end gap-[14px] border-y border-line py-5 max-[950px]:grid-cols-3 max-[640px]:grid-cols-2 max-[640px]:gap-x-3 max-[640px]:gap-y-[15px]">
        <label className="block min-w-0 max-[640px]:col-span-full">
          <span className="mb-2 block text-[8px] font-bold uppercase tracking-[0.13em] text-green max-[640px]:text-[9px]">Search dishes & ingredients</span>
          <input
            className="min-h-[34px] w-full appearance-none rounded-none border-0 border-b border-line bg-transparent py-[6px] pr-5 pb-2 text-[11px] text-charcoal placeholder:text-muted max-[640px]:min-h-11 max-[640px]:text-xs"
            type="search"
            value={query}
            onChange={(event) =>
              setFilters((current) => ({ ...current, query: event.target.value }))
            }
            placeholder="Dish, ingredient, or Khmer name"
          />
        </label>
        <button
          className="hidden min-h-11 w-full items-center justify-between border-b border-line py-2 text-[10px] font-bold uppercase tracking-[0.13em] text-white max-[640px]:col-span-full max-[640px]:flex"
          type="button"
          aria-expanded={filtersOpen}
          aria-controls="dish-filter-options"
          onClick={() => setFiltersOpen((open) => !open)}
        >
          <span>
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-2 text-muted">({activeFilterCount} active)</span>
            )}
          </span>
          <span aria-hidden="true">{filtersOpen ? "−" : "+"}</span>
        </button>
        <div
          className={`contents max-[640px]:col-span-full max-[640px]:grid max-[640px]:grid-cols-2 max-[640px]:gap-x-3 max-[640px]:gap-y-4 ${filtersOpen ? "" : "max-[640px]:hidden"}`}
          id="dish-filter-options"
        >
        <label className="block min-w-0">
          <span className="mb-2 block text-[8px] font-bold uppercase tracking-[0.13em] text-green max-[640px]:text-[9px]">Category</span>
          <select
            className="min-h-[34px] w-full cursor-pointer rounded-none border-0 border-b border-line bg-black py-[6px] pr-5 pb-2 text-[11px] text-white max-[640px]:min-h-11 max-[640px]:text-xs"
            value={categoryId}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                categoryId: event.target.value,
              }))
            }
          >
            <option className="bg-black text-white" value="all">All dishes</option>
            {categories.map((category) => (
              <option className="bg-black text-white" key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block min-w-0">
          <span className="mb-2 block text-[8px] font-bold uppercase tracking-[0.13em] text-green max-[640px]:text-[9px]">Cooking time</span>
          <select
            className="min-h-[34px] w-full cursor-pointer rounded-none border-0 border-b border-line bg-black py-[6px] pr-5 pb-2 text-[11px] text-white max-[640px]:min-h-11 max-[640px]:text-xs"
            value={maxMinutes}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                maxMinutes: event.target.value,
              }))
            }
          >
            <option className="bg-black text-white" value="any">Any length</option>
            <option className="bg-black text-white" value="30">30 minutes or less</option>
            <option className="bg-black text-white" value="45">45 minutes or less</option>
            <option className="bg-black text-white" value="60">60 minutes or less</option>
          </select>
        </label>
        <label className="block min-w-0">
          <span className="mb-2 block text-[8px] font-bold uppercase tracking-[0.13em] text-green max-[640px]:text-[9px]">Difficulty</span>
          <select
            className="min-h-[34px] w-full cursor-pointer rounded-none border-0 border-b border-line bg-black py-[6px] pr-5 pb-2 text-[11px] text-white max-[640px]:min-h-11 max-[640px]:text-xs"
            value={difficulty}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                difficulty: event.target.value,
              }))
            }
          >
            <option className="bg-black text-white" value="any">Any level</option>
            {difficulties.map((level) => (
              <option className="bg-black text-white" key={level}>{level}</option>
            ))}
          </select>
        </label>
        <label className="block min-w-0">
          <span className="mb-2 block text-[8px] font-bold uppercase tracking-[0.13em] text-green max-[640px]:text-[9px]">Sort by</span>
          <select
            className="min-h-[34px] w-full cursor-pointer rounded-none border-0 border-b border-line bg-black py-[6px] pr-5 pb-2 text-[11px] text-white max-[640px]:min-h-11 max-[640px]:text-xs"
            value={sortOrder}
            onChange={(event) => {
              const value = event.target.value;
              if (isSortOrder(value)) {
                setFilters((current) => ({ ...current, sortOrder: value }));
              }
            }}
          >
            <option className="bg-black text-white" value="featured">Featured</option>
            <option className="bg-black text-white" value="name">Name A–Z</option>
            <option className="bg-black text-white" value="time">Cooking time</option>
          </select>
        </label>
        </div>
      </div>
      <div className="flex items-center justify-between py-[19px] pb-[25px] text-[10px] uppercase tracking-[0.08em] text-muted" aria-live="polite">
        <span>
          {filteredDishes.length}{" "}
          {filteredDishes.length === 1 ? "dish" : "dishes"}
        </span>
        {hasActiveFilters && (
          <button className="cursor-pointer border-0 bg-transparent text-[10px] font-bold uppercase tracking-[0.08em] text-terracotta underline underline-offset-4" type="button" onClick={resetFilters}>
            Clear filters
          </button>
        )}
      </div>
      {filteredDishes.length > 0 ? (
        <div className="grid grid-cols-3 gap-x-[25px] gap-y-[42px] max-[640px]:grid-cols-1 max-[640px]:gap-y-[38px]">
          {filteredDishes.map((dish) => (
            <DishCard dish={dish} key={dish.slug} />
          ))}
        </div>
      ) : (
        <div className="bg-black px-5 py-[60px] text-center">
          <p className="mx-auto mb-5 text-xs text-muted">Try a different name or clear the filters to see every recipe.</p>
          <button className="cursor-pointer border-0 bg-transparent text-[10px] font-bold uppercase tracking-[0.08em] text-terracotta underline underline-offset-4" type="button" onClick={resetFilters}>
            Show all dishes
          </button>
        </div>
      )}
    </div>
  );
}
