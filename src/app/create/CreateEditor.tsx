"use client";

import { BaseCocktailEditor } from "@/components/editors/cocktail";
import { Cocktail } from "@/types/cocktail";

export function CreateEditor() {
  const handleSave = (data: Cocktail) => {
    alert(JSON.stringify(data));
  };

  const handleCancel = () => {
    alert("Canceled");
  };

  return <BaseCocktailEditor title="Create Cocktail" onSave={handleSave} onCancel={handleCancel} />;
}