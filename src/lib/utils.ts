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

export function getIngredients(): any {
  return {
    "status": "success",
    "data": [{ "id": 2, "name": "White rum", "description": " ", "categoryId": 86, "abv": "40.00" }, {
      "id": 3,
      "name": "Lime Juice",
      "description": " ",
      "categoryId": 56,
      "abv": "0.00"
    }, { "id": 4, "name": "Simple Syrup", "description": " ", "categoryId": 65, "abv": "0.00" }, {
      "id": 5,
      "name": "Coconut Cream",
      "description": " ",
      "categoryId": 51,
      "abv": "0.00"
    }, { "id": 6, "name": "Pineapple juice", "description": " ", "categoryId": 58, "abv": "0.00" }, {
      "id": 8,
      "name": "Ginger beer",
      "description": " ",
      "categoryId": 43,
      "abv": "0.00"
    }, { "id": 7, "name": "Dark Rum", "description": " ", "categoryId": 83, "abv": "40.00" }, {
      "id": 9,
      "name": "Vodka",
      "description": " ",
      "categoryId": 5,
      "abv": "40.00"
    }, { "id": 10, "name": "Coffee Liqueur", "description": " ", "categoryId": 71, "abv": "20.00" }, {
      "id": 11,
      "name": "Coffee",
      "description": " ",
      "categoryId": 37,
      "abv": "0.00"
    }, { "id": 12, "name": "Citrus vodka\t", "description": " ", "categoryId": 82, "abv": "40.00" }, {
      "id": 13,
      "name": "Cointreau",
      "description": " ",
      "categoryId": 80,
      "abv": "40.00"
    }, { "id": 14, "name": "Cranberry Juice\t", "description": " ", "categoryId": 52, "abv": "0.00" }, {
      "id": 15,
      "name": "Cola",
      "description": " ",
      "categoryId": 42,
      "abv": "0.00"
    }, { "id": 16, "name": "Irish cream liqueur\t", "description": " ", "categoryId": 72, "abv": "17.00" }, {
      "id": 17,
      "name": "Amaretto",
      "description": " ",
      "categoryId": 81,
      "abv": "21.00"
    }]
  };
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