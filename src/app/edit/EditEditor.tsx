"use client";
import { Cocktail } from "@/types/cocktail";
import { Privacy } from "@/types/privacy";
import { Glass } from "@/types/glass";
import { BaseCocktailEditor } from "@/components/editors/cocktail";
import { Unit } from "@/types/unit";
import { Garnish } from "@/types/garnish";

export function EditEditor() {
  const cocktailId = 1;
  const cocktail: Cocktail = {
    id: cocktailId,
    name: "Test Cocktail",
    slug: "test-cocktail",
    description: "This is a test cocktail with the sole purpose of testing the cocktail editor. Its origins lay in the mind of a madman, and it is not recommended to drink it.",
    privacy: Privacy.PUBLIC,
    userId: 1,
    abv: 0,

    glass: Glass.MARTINI,
    colour: "#ff0000",
    garnishes: [
      {
        id: 1,
        cocktailId,
        garnish: Garnish.ORANGE_WEDGE,
        x: 0,
        y: 0
      }
    ],

    ingredients: [
      {
        cocktailId,
        ingredientId: 2,
        amount: 25,
        unit: Unit.ML
      },
      {
        cocktailId,
        ingredientId: 14,
        amount: 100,
        unit: Unit.ML
      }
    ],
    instructions: [
      {
        cocktailId,
        content: "This is a test instruction.",
        order: 0
      }
    ],

    createdAt: new Date(0),
    updatedAt: new Date(0)
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