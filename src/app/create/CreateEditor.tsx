"use client";

import { BaseCocktailEditor } from "@/components/editors/cocktail";
import { Cocktail } from "@/types/cocktail";
import useIngredients from "@/hooks/useIngredients";

export function CreateEditor() {
  const {ingredients, isLoading, isError} = useIngredients();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !ingredients) return <div>Error loading ingredients</div>;


  const handleSave = (data: Cocktail) => {
    alert(JSON.stringify(data));
  };

  const handleCancel = () => {
    alert("Canceled");
  };

  return <BaseCocktailEditor title="Create Cocktail" onSave={handleSave} onCancel={handleCancel} ingredients={ingredients} />;
}