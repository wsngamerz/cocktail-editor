import type { UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { Cocktail, CocktailIngredient } from "@/types/cocktail";

import { Unit, unitToString } from "@/types/unit";
import useIngredients from "@/hooks/useIngredients";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import EditorTab from "@/components/editors/cocktail/tabs/EditorTab";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronDownIcon, ChevronsUpDownIcon, ChevronUpIcon, RefreshCcwIcon, XIcon } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";

export default function IngredientTab({ form }: { form: UseFormReturn<Cocktail, any, undefined> }) {
  const { ingredients, isError, isLoading: isIngredientsLoading } = useIngredients();
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
      {(isIngredientsLoading || !ingredients) ? (
        <span>Loading</span>
      ) : (
        <div className="h-full flex flex-col gap-4">
          <div className="grow">
            <ScrollArea className="flex items-center justify-center w-full">
              <div className="w-full">
                {watchIngredients.map((ci) => {
                  const ingredient = ingredients.find((ingredient) => ingredient.id === ci.ingredientId);
                  if (!ingredient) return null;

                  return (
                    <div key={ci.ingredientId}
                         className="flex items-center gap-2 p-2 mb-1 border rounded-md">
                      <div className="flex flex-col">
                        <ChevronUpIcon className="w-4 h-4" />
                        <ChevronDownIcon className="w-4 h-4" />
                      </div>

                      <div className="grow">
                        <h3 className="font-bold leading-none">{ingredient.name}</h3>
                        <span className="text-sm leading-none">
                          {ci.amount > 0 && ci.amount} {ci.unit !== Unit.NONE && unitToString(ci.unit)}
                        </span>
                      </div>

                      <XIcon className="w-4 h-4"
                             onClick={() => onIngredientRemove(ci.ingredientId)} />
                    </div>
                  );
                })}

                {watchIngredients.length === 0 && (
                  <span className="block w-full text-center text-gray-600 text-xs rounded-md border p-4">
                  Add ingredients to your cocktail below.
               </span>
                )}
              </div>
            </ScrollArea>
          </div>

          <div className="editor-internal-card grid gap-4">
            <h2 className="font-bold">Add Ingredient</h2>

            <Form {...ingredientForm}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    control={ingredientForm.control}
                    name="ingredientId"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Ingredient</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-full justify-between",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? ingredients.find(
                                    (ingredient) => ingredient.id === field.value
                                  )?.name
                                  : "Select ingredient"}
                                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[300px] p-0">
                            <Command>
                              <CommandInput placeholder="Search ingredients..." />
                              <CommandEmpty>No ingredient found.</CommandEmpty>
                              <CommandGroup>
                                {ingredients
                                  .filter((i) => !watchIngredients.find((ingredient) => ingredient.ingredientId === i.id))
                                  .map((ingredient) => (
                                    <CommandItem
                                      value={ingredient.name}
                                      key={ingredient.id}
                                      onSelect={() => {
                                        ingredientForm.setValue("ingredientId", ingredient.id);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          ingredient.id === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {ingredient.name}
                                    </CommandItem>
                                  ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    {/*Cocktail Ingredient Amount*/}
                    <FormField
                      control={ingredientForm.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amount</FormLabel>
                          <FormControl>
                            {/* Casting to integer within onChange event*/}
                            <Input {...field} type="number" placeholder="0"
                                   onChange={(e) => field.onChange(+e.target.value)} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Cocktail Ingredient Unit */}
                    <FormField
                      control={ingredientForm.control}
                      name="unit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unit</FormLabel>
                          <Select onValueChange={(value) => field.onChange(Unit[value as keyof typeof Unit])}
                                  defaultValue={Unit[field.value]}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a unit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.values(Unit)
                                .filter(unit => typeof unit === "string")
                                .map((unit) => {
                                  return (
                                    <SelectItem key={unit} value={unit as string}>
                                      {unitToString(Unit[unit as keyof typeof Unit])}
                                    </SelectItem>
                                  );
                                })}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
      )}
    </EditorTab>
  );
}
