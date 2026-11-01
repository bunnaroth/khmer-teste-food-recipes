"use client";

import { useState } from "react";
import type { Dish } from "@/types/dish";
import { requireIngredientById } from "@/data/content";

export function RecipeTools({ dish }: { dish: Dish }) {
  const [servings, setServings] = useState(dish.servings);
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);

  function toggleItem(
    index: number,
    checked: number[],
    setChecked: (next: number[]) => void,
  ) {
    setChecked(
      checked.includes(index)
        ? checked.filter((item) => item !== index)
        : [...checked, index],
    );
  }

  function formattedAmount(amount: number) {
    const adjusted = (amount * servings) / dish.servings;
    const whole = Math.floor(adjusted);
    const fraction = Math.round((adjusted - whole) * 4);
    const parts = ["", "¼", "½", "¾", "1"];
    const roundedWhole = whole + (fraction === 4 ? 1 : 0);
    const remainder = fraction === 4 ? 0 : fraction;
    return `${roundedWhole || ""}${parts[remainder] || ""}` || "0";
  }

  function ingredientAmount(amount: number, unit: string) {
    if (unit === "to serve") return unit;
    const quantity = formattedAmount(amount);
    return [quantity, unit].filter(Boolean).join(" ");
  }

  return (
    <div className="bg-black p-[35px] max-[560px]:px-[17px] max-[560px]:py-[21px] print:bg-white print:p-0">
      <div className="flex items-center justify-between border-b border-line pb-6 max-[560px]:flex-col max-[560px]:items-start max-[560px]:gap-[18px] print:hidden">
        <div className="flex items-center gap-[10px]">
          <span className="mr-2 text-[9px] font-bold uppercase tracking-[0.12em] text-green">Servings</span>
          <button
            className="h-[31px] w-[31px] cursor-pointer border border-line bg-black text-base text-green disabled:cursor-not-allowed disabled:opacity-40"
            type="button"
            aria-label="Decrease servings"
            disabled={servings <= 1}
            onClick={() => setServings((value) => Math.max(1, value - 1))}
          >
            −
          </button>
          <output className="min-w-[18px] text-center text-xs text-green" aria-live="polite">{servings}</output>
          <button
            className="h-[31px] w-[31px] cursor-pointer border border-line bg-black text-base text-green"
            type="button"
            aria-label="Increase servings"
            onClick={() => setServings((value) => value + 1)}
          >
            +
          </button>
        </div>
        <div className="flex items-center gap-[9px] max-[560px]:flex-wrap">
          <button
            className="cursor-pointer border border-line bg-transparent px-[14px] py-[10px] text-[9px] font-bold tracking-[0.06em] text-green"
            type="button"
            onClick={() => window.print()}
          >
            Print recipe <span className="ml-2 text-terracotta" aria-hidden="true">↗</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[0.9fr_1.1fr] gap-[8%] pt-[30px] max-[800px]:grid-cols-1 max-[800px]:gap-[35px]">
        <section>
          <div className="flex items-end justify-between border-b border-line pb-4">
            <div>
              <p className="mb-[7px] text-[8px] font-bold tracking-[0.14em] text-terracotta">GET EVERYTHING READY</p>
              <h2 className="m-0 font-serif text-[28px] font-normal text-green">Ingredients</h2>
            </div>
            <span className="mb-[3px] text-[9px] text-muted">{servings} servings</span>
          </div>
          <ul className="m-0 list-none p-0 [&>li]:border-b [&>li]:border-line">
            {dish.ingredients.map((recipeIngredient, index) => {
              const ingredient = requireIngredientById(
                recipeIngredient.ingredientId,
              );
              return (
                <li key={`${ingredient.id}-${index}`}>
                  <label
                    className={`flex min-h-[43px] cursor-pointer items-center gap-[9px] text-[11px] text-charcoal ${checkedIngredients.includes(index) ? "text-muted" : ""}`}
                  >
                    <input
                      className="peer sr-only"
                      type="checkbox"
                      checked={checkedIngredients.includes(index)}
                      onChange={() =>
                        toggleItem(
                          index,
                          checkedIngredients,
                          setCheckedIngredients,
                        )
                      }
                    />
                    <span className="inline-flex h-[15px] w-[15px] shrink-0 items-center justify-center border border-[#777] text-[10px] text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-terracotta peer-focus-visible:outline-offset-[3px] peer-checked:border-green peer-checked:bg-green peer-checked:after:content-['✓']" aria-hidden="true" />
                    <span className={checkedIngredients.includes(index) ? "text-muted line-through" : ""}>
                      {ingredient.name}
                      <span className="font-khmer mt-0.5 block text-[9px] text-muted" lang="km">
                        {ingredient.khmerName}
                      </span>
                    </span>
                    <span className="ml-auto whitespace-nowrap text-right text-muted">
                      {ingredientAmount(
                        recipeIngredient.amount,
                        recipeIngredient.unit,
                      )}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </section>

        <section>
          <div className="flex items-end justify-between border-b border-line pb-4">
            <div>
              <p className="mb-[7px] text-[8px] font-bold tracking-[0.14em] text-terracotta">TAKE IT STEP BY STEP</p>
              <h2 className="m-0 font-serif text-[28px] font-normal text-green">Method</h2>
            </div>
            <span className="mb-[3px] text-[9px] text-muted">{dish.instructions.length} steps</span>
          </div>
          <ol className="m-0 list-none p-0 [&>li]:flex [&>li]:items-start [&>li]:gap-[14px] [&>li]:border-b [&>li]:border-line [&>li]:py-[15px]">
            {dish.instructions.map((instruction, index) => (
              <li
                className={checkedSteps.includes(index) ? "text-muted" : ""}
                key={instruction}
              >
                <button
                  className={`h-[29px] w-[29px] shrink-0 cursor-pointer border border-line bg-transparent font-serif text-[10px] text-terracotta ${checkedSteps.includes(index) ? "border-green bg-green text-white" : ""}`}
                  type="button"
                  aria-pressed={checkedSteps.includes(index)}
                  aria-label={`${checkedSteps.includes(index) ? "Mark incomplete" : "Mark complete"}: step ${index + 1}`}
                  onClick={() => toggleItem(index, checkedSteps, setCheckedSteps)}
                >
                  {checkedSteps.includes(index) ? "✓" : String(index + 1).padStart(2, "0")}
                </button>
                <p className={`mt-1 mb-0 text-[11px] leading-[1.8] text-charcoal ${checkedSteps.includes(index) ? "text-muted line-through" : ""}`}>{instruction}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
