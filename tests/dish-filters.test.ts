import { describe, expect, it } from "vitest";
import { dishes } from "../src/data/dishes";
import { ingredients } from "../src/data/ingredients";
import { filterDishes, type DishFilterState } from "../src/lib/dish-filters";

const noFilters: DishFilterState = {
  query: "",
  categoryId: "all",
  maxMinutes: "any",
  difficulty: "any",
  sortOrder: "featured",
};

describe("dish discovery filters", () => {
  it("searches ingredient names as well as dish names", () => {
    const results = filterDishes(dishes, ingredients, {
      ...noFilters,
      query: "kroeung",
    });

    expect(results.map((dish) => dish.slug)).toEqual([
      "fish-amok",
      "nom-banh-chok",
      "samlor-mchou",
      "samlor-korko",
      "khmer-red-curry",
      "cha-kroeung",
    ]);
  });

  it("searches Khmer ingredient names", () => {
    const kroeung = ingredients.find((ingredient) => ingredient.id === "kroeung");
    if (!kroeung) throw new Error("Missing kroeung test fixture");

    const results = filterDishes(dishes, ingredients, {
      ...noFilters,
      query: kroeung.khmerName,
    });

    expect(results.map((dish) => dish.slug)).toEqual([
      "fish-amok",
      "nom-banh-chok",
      "samlor-mchou",
      "samlor-korko",
      "cha-kroeung",
    ]);
  });

  it("combines category, cooking-time, and difficulty filters", () => {
    const results = filterDishes(dishes, ingredients, {
      ...noFilters,
      categoryId: "curries",
      maxMinutes: "60",
      difficulty: "Medium",
    });

    expect(results.map((dish) => dish.slug)).toEqual([
      "fish-amok",
      "khmer-red-curry",
    ]);
  });

  it("sorts alphabetically without mutating the source records", () => {
    const originalOrder = dishes.map((dish) => dish.slug);
    const results = filterDishes(dishes, ingredients, {
      ...noFilters,
      sortOrder: "name",
    });

    expect(results.map((dish) => dish.name)).toEqual(
      results.map((dish) => dish.name).toSorted((first, second) =>
        first.localeCompare(second),
      ),
    );
    expect(dishes.map((dish) => dish.slug)).toEqual(originalOrder);
  });

  it("sorts by total preparation and cooking time", () => {
    const results = filterDishes(dishes, ingredients, {
      ...noFilters,
      sortOrder: "time",
    });
    const times = results.map((dish) => dish.prepMinutes + dish.cookMinutes);

    expect(times).toEqual([...times].sort((first, second) => first - second));
  });
});
