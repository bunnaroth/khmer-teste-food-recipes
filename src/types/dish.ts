import type { StaticImageData } from "next/image";

export type DishCategoryId =
  | "noodles"
  | "rice"
  | "soups"
  | "curries"
  | "desserts";

export type Difficulty = "Easy" | "Medium" | "Advanced";

export type RecipeIngredient = {
  ingredientId: string;
  amount: number;
  unit: string;
};

export type Ingredient = {
  id: string;
  name: string;
  khmerName: string;
  summary: string;
  sourceIds: string[];
};

export type CitationStatus = "needs-review" | "reviewed";

export type Source = {
  id: string;
  title: string;
  organization: string;
  url: string;
  sourceType: "primary" | "reference";
  description: string;
  lastChecked: string;
};

export type Dish = {
  slug: string;
  name: string;
  khmerName: string;
  categoryId: DishCategoryId;
  summary: string;
  image: StaticImageData;
  imageAlt: string;
  prepMinutes: number;
  cookMinutes: number;
  difficulty: Difficulty;
  servings: number;
  recipeStatus: "editorial" | "tested";
  citationStatus: CitationStatus;
  sourceIds: string[];
  relatedArticleIds: string[];
  keyIngredientIds: string[];
  story: string;
  ingredients: RecipeIngredient[];
  instructions: string[];
};

export type DishCategory = {
  id: DishCategoryId;
  name: string;
  khmerName: string;
  description: string;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  dek: string;
  category: string;
  readMinutes: number;
  image: StaticImageData;
  imageAlt: string;
  publishedAt: string;
  citationStatus: CitationStatus;
  sourceIds: string[];
  relatedIngredientIds: string[];
  relatedDishSlugs: string[];
  paragraphs: string[];
};
