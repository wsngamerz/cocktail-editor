"use client";

import BaseCocktailEditor from "./BaseCocktailEditor";
import type { Cocktail } from "@/types/cocktail";

/**
 * @name CreateCocktailEditor
 * @constructor
 * @description An example of a component that uses the BaseCocktailEditor component to create a new cocktail.
 */
export function CreateCocktailEditor() {
  const handleSave = (data: Cocktail) => {
    alert(JSON.stringify(data));
  };

  const handleCancel = () => {
    alert("Canceled");
  };

  return <BaseCocktailEditor title="Create Cocktail" onSave={handleSave} onCancel={handleCancel} />
}