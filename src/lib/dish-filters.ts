import type { Dish, Ingredient } from "@/types/dish";

export type DishSortOrder = "featured" | "name" | "time";

export type DishFilterState = {
  query: string;
  categoryId: string;
  maxMinutes: string;
  difficulty: string;
  sortOrder: DishSortOrder;
};

export function filterDishes(
  dishRecords: readonly Dish[],
  ingredientRecords: readonly Pick<Ingredient, "id" | "name" | "khmerName">[],
  filters: DishFilterState,
) {
  const ingredientById = new Map(
    ingredientRecords.map((ingredient) => [ingredient.id, ingredient]),
  );
  const normalizedQuery = filters.query.trim().toLocaleLowerCase();
  const results = dishRecords.filter((dish) => {
    const ingredientText = dish.ingredients
      .map(({ ingredientId }) => {
        const ingredient = ingredientById.get(ingredientId);
        return ingredient ? `${ingredient.name} ${ingredient.khmerName}` : "";
      })
      .join(" ")
      .toLocaleLowerCase();
    const searchableText = [
      dish.name,
      dish.khmerName,
      dish.summary,
      ingredientText,
    ]
      .join(" ")
      .toLocaleLowerCase();
    const matchesSearch =
      !normalizedQuery || searchableText.includes(normalizedQuery);
    const matchesCategory =
      filters.categoryId === "all" ||
      dish.categoryId === filters.categoryId;
    const totalMinutes = dish.prepMinutes + dish.cookMinutes;
    const matchesTime =
      filters.maxMinutes === "any" ||
      totalMinutes <= Number(filters.maxMinutes);
    const matchesDifficulty =
      filters.difficulty === "any" ||
      dish.difficulty === filters.difficulty;

    return (
      matchesSearch && matchesCategory && matchesTime && matchesDifficulty
    );
  });

  if (filters.sortOrder === "name") {
    return results.slice().sort((first, second) =>
      first.name.localeCompare(second.name),
    );
  }
  if (filters.sortOrder === "time") {
    return results.slice().sort(
      (first, second) =>
        first.prepMinutes +
        first.cookMinutes -
        (second.prepMinutes + second.cookMinutes),
    );
  }
  return results;
}
