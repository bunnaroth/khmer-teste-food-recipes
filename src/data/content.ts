import { articles } from "@/data/articles";
import { categories } from "@/data/categories";
import { dishes, getDishBySlug } from "@/data/dishes";
import { ingredients } from "@/data/ingredients";
import { sources } from "@/data/sources";

export { articles, categories, dishes, getDishBySlug, ingredients, sources };

export function getCategoryById(id: string) {
  return categories.find((category) => category.id === id);
}

export function getIngredientById(id: string) {
  return ingredients.find((ingredient) => ingredient.id === id);
}

export function requireIngredientById(id: string) {
  const ingredient = getIngredientById(id);
  if (!ingredient) {
    throw new Error(`Missing ingredient content record: ${id}`);
  }
  return ingredient;
}

export function requireCategoryById(id: string) {
  const category = getCategoryById(id);
  if (!category) {
    throw new Error(`Missing dish category content record: ${id}`);
  }
  return category;
}

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getArticleById(id: string) {
  return articles.find((article) => article.id === id);
}

export function getSourceById(id: string) {
  return sources.find((source) => source.id === id);
}
