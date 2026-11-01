import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
const typescript = require("typescript");
const root = process.cwd();
const errors = [];

function loadDataModule(relativePath) {
  const source = readFileSync(resolve(root, relativePath), "utf8");
  const { outputText } = typescript.transpileModule(source, {
    compilerOptions: {
      module: typescript.ModuleKind.CommonJS,
      target: typescript.ScriptTarget.ES2022,
    },
  });
  const loadedModule = { exports: {} };
  const loadDependency = (specifier) => {
    if (specifier.startsWith("@/assets/images/")) {
      return {
        default: {
          src: resolve(
            root,
            "src",
            "assets",
            "images",
            specifier.slice("@/assets/images/".length),
          ),
          width: 1200,
          height: 900,
        },
      };
    }
    return require(specifier);
  };
  new Function("exports", "require", "module", outputText)(
    loadedModule.exports,
    loadDependency,
    loadedModule,
  );
  return loadedModule.exports;
}

function assertUnique(records, field, label) {
  const seen = new Set();
  for (const record of records) {
    const value = record[field];
    if (!value) {
      errors.push(`${label} is missing ${field}.`);
    } else if (seen.has(value)) {
      errors.push(`Duplicate ${label} ${field}: ${value}.`);
    } else {
      seen.add(value);
    }
  }
  return seen;
}

function checkReferences(owner, field, allowedIds, label) {
  for (const id of owner[field] ?? []) {
    if (!allowedIds.has(id)) {
      errors.push(`${label} references unknown ${field} item "${id}".`);
    }
  }
}

const { categories } = loadDataModule("src/data/categories.ts");
const { ingredients } = loadDataModule("src/data/ingredients.ts");
const { dishes } = loadDataModule("src/data/dishes.ts");
const { articles } = loadDataModule("src/data/articles.ts");
const { sources } = loadDataModule("src/data/sources.ts");
const { homepageEditorial } = loadDataModule("src/data/editorial.ts");

const categoryIds = assertUnique(categories, "id", "category");
const ingredientIds = assertUnique(ingredients, "id", "ingredient");
const dishSlugs = assertUnique(dishes, "slug", "dish");
const articleIds = assertUnique(articles, "id", "article");
assertUnique(articles, "slug", "article");
const sourceIds = assertUnique(sources, "id", "source");

for (const category of categories) {
  for (const field of ["name", "khmerName", "description"]) {
    if (!category[field]?.trim()) {
      errors.push(`Category "${category.id}" is missing ${field}.`);
    }
  }
}

for (const ingredient of ingredients) {
  for (const field of ["name", "khmerName", "summary"]) {
    if (!ingredient[field]?.trim()) {
      errors.push(`Ingredient "${ingredient.id}" is missing ${field}.`);
    }
  }
  checkReferences(ingredient, "sourceIds", sourceIds, `Ingredient "${ingredient.id}"`);
}

for (const dish of dishes) {
  for (const field of [
    "name",
    "khmerName",
    "summary",
    "imageAlt",
    "story",
  ]) {
    if (!dish[field]?.trim()) {
      errors.push(`Dish "${dish.slug}" is missing ${field}.`);
    }
  }
  if (!dish.image?.src) {
    errors.push(`Dish "${dish.slug}" is missing image.`);
  } else if (!existsSync(dish.image.src)) {
    errors.push(`Dish "${dish.slug}" image file does not exist: ${dish.image.src}.`);
  }
  if (!categoryIds.has(dish.categoryId)) {
    errors.push(`Dish "${dish.slug}" references unknown category "${dish.categoryId}".`);
  }
  if (!Number.isFinite(dish.prepMinutes) || dish.prepMinutes < 0) {
    errors.push(`Dish "${dish.slug}" has invalid prep time.`);
  }
  if (!Number.isFinite(dish.cookMinutes) || dish.cookMinutes < 0) {
    errors.push(`Dish "${dish.slug}" has invalid cook time.`);
  }
  if (!Number.isFinite(dish.servings) || dish.servings < 1) {
    errors.push(`Dish "${dish.slug}" has invalid serving count.`);
  }
  if (!["Easy", "Medium", "Advanced"].includes(dish.difficulty)) {
    errors.push(`Dish "${dish.slug}" has invalid difficulty.`);
  }
  if (!["editorial", "tested"].includes(dish.recipeStatus)) {
    errors.push(`Dish "${dish.slug}" has invalid recipe status.`);
  }
  if (!["needs-review", "reviewed"].includes(dish.citationStatus)) {
    errors.push(`Dish "${dish.slug}" has invalid citation status.`);
  }
  if (dish.citationStatus === "reviewed" && dish.sourceIds.length === 0) {
    errors.push(`Reviewed dish "${dish.slug}" must cite at least one source.`);
  }
  if (!Array.isArray(dish.ingredients) || dish.ingredients.length === 0) {
    errors.push(`Dish "${dish.slug}" must include ingredients.`);
  }
  if (!Array.isArray(dish.keyIngredientIds) || dish.keyIngredientIds.length === 0) {
    errors.push(`Dish "${dish.slug}" must include key ingredients.`);
  }
  for (const ingredientId of dish.keyIngredientIds ?? []) {
    if (!ingredientIds.has(ingredientId)) {
      errors.push(
        `Dish "${dish.slug}" references unknown key ingredient "${ingredientId}".`,
      );
    }
    if (!(dish.ingredients ?? []).some((item) => item.ingredientId === ingredientId)) {
      errors.push(
        `Dish "${dish.slug}" key ingredient "${ingredientId}" is missing from its recipe.`,
      );
    }
  }
  for (const ingredient of dish.ingredients ?? []) {
    if (!ingredientIds.has(ingredient.ingredientId)) {
      errors.push(
        `Dish "${dish.slug}" references unknown ingredient "${ingredient.ingredientId}".`,
      );
    }
    if (!Number.isFinite(ingredient.amount) || ingredient.amount <= 0) {
      errors.push(
        `Dish "${dish.slug}" has invalid amount for "${ingredient.ingredientId}".`,
      );
    }
    if (typeof ingredient.unit !== "string") {
      errors.push(
        `Dish "${dish.slug}" has invalid unit for "${ingredient.ingredientId}".`,
      );
    }
  }
  for (const articleId of dish.relatedArticleIds ?? []) {
    const article = articles.find((item) => item.id === articleId);
    if (article && !article.relatedDishSlugs.includes(dish.slug)) {
      errors.push(
        `Dish "${dish.slug}" links to article "${articleId}" without a reciprocal dish link.`,
      );
    }
  }
  if (!Array.isArray(dish.instructions) || dish.instructions.length === 0) {
    errors.push(`Dish "${dish.slug}" must include cooking instructions.`);
  }
  checkReferences(dish, "sourceIds", sourceIds, `Dish "${dish.slug}"`);
  checkReferences(dish, "relatedArticleIds", articleIds, `Dish "${dish.slug}"`);
}

for (const article of articles) {
  for (const field of ["title", "dek", "category", "imageAlt"]) {
    if (!article[field]?.trim()) {
      errors.push(`Article "${article.id}" is missing ${field}.`);
    }
  }
  if (!article.image?.src) {
    errors.push(`Article "${article.id}" is missing image.`);
  } else if (!existsSync(article.image.src)) {
    errors.push(
      `Article "${article.id}" image file does not exist: ${article.image.src}.`,
    );
  }
  if (!Array.isArray(article.paragraphs) || article.paragraphs.length === 0) {
    errors.push(`Article "${article.id}" must include body paragraphs.`);
  }
  if (!Number.isInteger(article.readMinutes) || article.readMinutes < 1) {
    errors.push(`Article "${article.id}" has invalid reading time.`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(article.publishedAt)) {
    errors.push(`Article "${article.id}" has an invalid publication date.`);
  }
  if (!["needs-review", "reviewed"].includes(article.citationStatus)) {
    errors.push(`Article "${article.id}" has invalid citation status.`);
  }
  if (article.citationStatus === "reviewed" && article.sourceIds.length === 0) {
    errors.push(`Reviewed article "${article.id}" must cite at least one source.`);
  }
  checkReferences(article, "sourceIds", sourceIds, `Article "${article.id}"`);
  checkReferences(
    article,
    "relatedIngredientIds",
    ingredientIds,
    `Article "${article.id}"`,
  );
  checkReferences(article, "relatedDishSlugs", dishSlugs, `Article "${article.id}"`);
  for (const slug of article.relatedDishSlugs) {
    const dish = dishes.find((item) => item.slug === slug);
    if (dish && !dish.relatedArticleIds.includes(article.id)) {
      errors.push(
        `Article "${article.id}" links to dish "${slug}" without a reciprocal article link.`,
      );
    }
  }
}

for (const source of sources) {
  for (const field of ["title", "organization", "description"]) {
    if (!source[field]?.trim()) {
      errors.push(`Source "${source.id}" is missing ${field}.`);
    }
  }
  if (!source.url?.startsWith("https://")) {
    errors.push(`Source "${source.id}" must use HTTPS.`);
  }
  if (!["primary", "reference"].includes(source.sourceType)) {
    errors.push(`Source "${source.id}" has an invalid source type.`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(source.lastChecked)) {
    errors.push(`Source "${source.id}" has an invalid last-checked date.`);
  }
}

for (const slug of homepageEditorial.featuredDishSlugs) {
  if (!dishSlugs.has(slug)) {
    errors.push(`Homepage references unknown featured dish "${slug}".`);
  }
}
for (const id of homepageEditorial.featuredCategoryIds) {
  if (!categoryIds.has(id)) {
    errors.push(`Homepage references unknown featured category "${id}".`);
  }
}
for (const id of homepageEditorial.journalArticleIds) {
  if (!articleIds.has(id)) {
    errors.push(`Homepage references unknown journal article "${id}".`);
  }
}
if (!ingredientIds.has(homepageEditorial.ingredientSpotlightId)) {
  errors.push(
    `Homepage references unknown ingredient "${homepageEditorial.ingredientSpotlightId}".`,
  );
}

if (errors.length > 0) {
  console.error(`Content validation failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(
    `Content validation passed: ${dishes.length} dishes, ${ingredients.length} ingredients, ${articles.length} articles, ${categories.length} categories, ${sources.length} sources.`,
  );
}
