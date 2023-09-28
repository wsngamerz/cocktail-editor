"use client";

import BaseCocktailEditor from "./BaseCocktailEditor";
import type { Cocktail } from "@/types/cocktail";
import { Privacy } from "@/types/privacy";
import { Glass } from "@/types/glass";

/**
 * @name EditCocktailEditor
 * @constructor
 * @description An example of a component that uses the BaseCocktailEditor component to create a new cocktail.
 */
export function EditCocktailEditor() {
  const cocktail: Cocktail = {
    id: 1,
    name: "Test Cocktail",
    slug: "test-cocktail",
    description: "This is a test cocktail with the sole purpose of testing the cocktail editor. Its origins lay in the mind of a madman, and it is not recommended to drink it.",
    privacy: Privacy.PUBLIC,
    userId: 1,
    abv: 0,

    glass: Glass.MARTINI,
    colour: "",
    garnishes: [],

    ingredients: [],
    instructions: [],

    createdAt: new Date(),
    updatedAt: new Date()
  };

  const handleSave = (data: Cocktail) => {
    alert(JSON.stringify(data));
  };

  const handleCancel = () => {
    alert("Canceled");
  };

  return <BaseCocktailEditor title="Edit Cocktail"
                             onSave={handleSave}
                             onCancel={handleCancel}
                             initialData={cocktail} />;
}