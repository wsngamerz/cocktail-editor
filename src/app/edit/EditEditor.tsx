"use client";
import { Cocktail } from "@/types/cocktail";
import { BaseCocktailEditor } from "@/components/editors/cocktail";
import useIngredients from "@/hooks/useIngredients";
import { getCocktail } from "@/lib/utils";

export function EditEditor() {
  const { ingredients, isLoading, isError } = useIngredients();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !ingredients) return <div>Error loading ingredients</div>;

  const cocktail = getCocktail();


  const handleSave = (data: Cocktail) => {
    alert(JSON.stringify(data));
  };

  const handleCancel = () => {
    alert("Canceled");
  };

  return <BaseCocktailEditor title="Edit Cocktail"
                             onSave={handleSave}
                             onCancel={handleCancel}
                             initialData={cocktail}
                             ingredients={ingredients} />;
}