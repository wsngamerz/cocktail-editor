import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Cocktail, DisplayCocktail } from "@/types/cocktail";
import { Ingredient } from "@/types/ingredient";
import { Privacy } from "@/types/privacy";
import { Glass } from "@/types/glass";
import { Garnish } from "@/types/garnish";
import { Unit } from "@/types/unit";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/(^-|-$)/g, "")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-");
}

export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

export function getCocktail(): Cocktail {
  const cocktailId = 1;
  return {
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
}

export function cocktailAsDisplayCocktail(cocktail: Cocktail, ingredients: Ingredient[]): DisplayCocktail {
  return {
    ...cocktail,
    ingredients: cocktail.ingredients.map((ingredient) => {
      const ing = ingredients.find((i) => i.id === ingredient.ingredientId);

      return ({
        ...ingredient,
        name: ing?.name ?? "",
        abv: ing?.abv ?? 0
      });
    })
  };
}