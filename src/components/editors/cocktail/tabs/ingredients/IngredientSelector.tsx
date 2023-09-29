import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDownIcon } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import React from "react";
import { CocktailIngredient } from "@/types/cocktail";
import { UseFormReturn } from "react-hook-form";
import { Ingredient } from "@/types/ingredient";

type IngredientSelectorProps = {
  ingredientForm: UseFormReturn<CocktailIngredient, any, undefined>,
  watchIngredients: CocktailIngredient[],
  ingredients: Ingredient[]
}

export default function IngredientSelector({ ingredientForm, watchIngredients, ingredients }: IngredientSelectorProps) {
  return (
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
  )
}