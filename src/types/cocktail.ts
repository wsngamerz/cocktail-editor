import type { Glass } from "@/types/glass";
import type { Privacy } from "@/types/privacy";
import type { Unit } from "@/types/unit";
import type { Garnish } from "@/types/garnish";

export type Cocktail = {
  id: number;
  name: string;
  slug: string;
  description: string;
  privacy: Privacy;
  abv: number;
  userId: number;

  glass: Glass;
  colour: string;
  garnishes: CocktailGarnish[];

  ingredients: CocktailIngredient[];
  instructions: CocktailInstruction[];

  createdAt: Date;
  updatedAt: Date;
}

export type CocktailGarnish = {
  id: number;
  cocktailId: number;
  garnish: Garnish;
  x: number;
  y: number;
}

export type CocktailIngredient = {
  ingredientId: number;
  cocktailId: number;
  amount: number;
  unit: Unit;
}

export type CocktailInstruction = {
  cocktailId: number;
  order: number;
  content: string;
}

export type DisplayCocktail = Omit<Cocktail, "ingredients"> & {
  ingredients: (CocktailIngredient & {
    name: string;
    abv: number;
  })[];
};