import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { RefreshCcwIcon } from "lucide-react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

import type { Cocktail, CocktailIngredient } from "@/types/cocktail";
import { Unit, unitToString } from "@/types/unit";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import EditorTab from "@/components/editors/cocktail/tabs/EditorTab";
import IngredientItem from "@/components/editors/cocktail/tabs/ingredients/IngredientItem";
import IngredientSelector from "@/components/editors/cocktail/tabs/ingredients/IngredientSelector";
import EmptyList from "@/components/editors/cocktail/tabs/EmptyList";
import { FormInput } from "@/components/form/FormInput";
import { FormSelect } from "@/components/form/FormSelect";
import { Ingredient } from "@/types/ingredient";

export default function Index({ form, ingredients }: {
  form: UseFormReturn<Cocktail, any, undefined>,
  ingredients: Ingredient[]
}) {
  const watchIngredients = form.watch("ingredients");

  const ingredientForm = useForm<CocktailIngredient>({
    defaultValues: {
      ingredientId: 0,
      cocktailId: 0,
      amount: 0,
      unit: Unit.ML
    },
    resolver: async (data) => {
      if (watchIngredients.find((ingredient) => ingredient.ingredientId === data.ingredientId)) {
        return {
          values: {},
          errors: {
            ingredientId: {
              type: "ingredientId",
              message: "Ingredient already exists."
            }
          }
        };
      }

      if (ingredients && !ingredients.find((ingredient) => ingredient.id === data.ingredientId)) {
        return {
          values: {},
          errors: {
            ingredientId: {
              type: "ingredientId",
              message: "Ingredient does not exist."
            }
          }
        };
      }

      if (data.amount <= 0 && data.unit !== Unit.NONE) {
        return {
          values: {},
          errors: {
            amount: {
              type: "amount",
              message: "Amount must be greater than 0."
            }
          }
        };
      }

      return {
        values: data,
        errors: {}
      };
    }
  });
  const onIngredientSubmit = (data: CocktailIngredient) => {
    const ingredients = form.getValues("ingredients");
    form.setValue("ingredients", [...ingredients, data]);

    ingredientForm.reset();
  };

  const onIngredientRemove = (ingredientId: number) => {
    const ingredients = form.getValues("ingredients");
    form.setValue("ingredients", ingredients.filter((ingredient) => ingredient.ingredientId !== ingredientId));
  };

  const onIngredientDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !active) return;

    if (active.id !== over.id) {
      const ingredients = form.getValues("ingredients");
      const activeIndex = ingredients.findIndex((ingredient) => ingredient.ingredientId === active.id);
      const overIndex = ingredients.findIndex((ingredient) => ingredient.ingredientId === over.id);

      form.setValue("ingredients", arrayMove(ingredients, activeIndex, overIndex));
    }
  };

  const addShot = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    ingredientForm.setValue("unit", Unit.ML);
    ingredientForm.setValue("amount",
      ingredientForm.getValues("amount") + 25);
  };

  const reset = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    ingredientForm.reset();
  };

  return (
    <EditorTab>
      <div className="h-full flex flex-col gap-4">

        <DndContext onDragEnd={onIngredientDragEnd}>
          <SortableContext items={watchIngredients.map(i => i.ingredientId)}>
            <div className="grow w-full">
              {watchIngredients.map((ci) => {
                const ingredient = ingredients.find((ingredient) => ingredient.id === ci.ingredientId);
                if (!ingredient) return null;

                return (<IngredientItem key={ci.ingredientId} ingredient={ingredient} ci={ci}
                                        onIngredientRemove={onIngredientRemove} />);
              })}

              {watchIngredients.length === 0 && (
                <EmptyList>
                  Add ingredients to your cocktail below.
                </EmptyList>
              )}
            </div>
          </SortableContext>
        </DndContext>

        <div className="editor-internal-card grid gap-4">
          <h2 className="font-bold">Add Ingredient</h2>

          <Form {...ingredientForm}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {/*Cocktail Ingredient*/}
                <IngredientSelector ingredients={ingredients} ingredientForm={ingredientForm}
                                    watchIngredients={watchIngredients} />

                <div className="grid grid-cols-2 gap-4">
                  {/*Cocktail Ingredient Amount*/}
                  <FormInput control={ingredientForm.control} name="amount" label="Amount" placeholder="0"
                             type="number"
                             onChange={(field, e) => field.onChange(+e.target.value)} />


                  {/* Cocktail Ingredient Unit */}
                  <FormSelect control={ingredientForm.control} name="unit" label="Unit"
                              placeholder="Select unit"
                              enum={Unit} enumToString={unitToString} />
                </div>
              </div>

              <div className="flex gap-1">
                <Button variant="outline"
                        onClick={addShot}
                        className="text-xs">+25ml</Button>
                <Button variant="outline"
                        onClick={reset}
                        className="text-xs">
                  <RefreshCcwIcon className="w-4 h-4" />
                </Button>

                <div className="grow flex justify-end">
                  <Button onClick={ingredientForm.handleSubmit(onIngredientSubmit)}>Add</Button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </EditorTab>
  );
}
