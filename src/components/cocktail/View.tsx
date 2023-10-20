import { DisplayCocktail } from "@/types/cocktail";
import { ChevronLeftIcon, StarIcon } from "lucide-react";
import { unitToString } from "@/types/unit";

type CocktailViewProps = {
  cocktail: DisplayCocktail;
}

export default function CocktailView({ cocktail }: CocktailViewProps) {
  return (
    <div className="flex flex-col">
      <div className="flex w-full py-2 items-center">
        <ChevronLeftIcon />
        <div className="flex-grow text-center">
          <h1 className="font-black text-3xl">{cocktail.name}</h1>
        </div>
        <StarIcon />
      </div>

      <div className="w-full flex items-center justify-center py-4">
        <div
          className="inline-block bg-gray-50 shadow-sm border border-gray-200 rounded p-4 dark:bg-gray-900 dark:border-none">
          <div className="w-48 h-64"></div>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:flex md:flex-wrap">
        <div className="flex flex-col flex-grow gap-2">
          <h2 className="font-bold text-xl">Description</h2>
          <p>{cocktail.description}</p>
        </div>

        <div className="flex flex-col flex-grow gap-2">
          <h2 className="font-bold text-xl">Ingredients</h2>
          <div className="grid gap-2 grid-cols-1 md:flex md:flex-wrap">
            {cocktail.ingredients.map((ingredient, index) => (
              <CocktailIngredient key={index} ingredient={ingredient} />
            ))}
          </div>
        </div>

        <div className="flex flex-col flex-grow gap-2">
          <h2 className="font-bold text-xl">Instructions</h2>
          <ol className="list-decimal list-inside">
            {cocktail.instructions.map((instruction, index) => (
              <li key={index}>{instruction.content}</li>
            ))}
          </ol>
        </div>
      </div>

    </div>
  );
}

function CocktailIngredient({ ingredient }: { ingredient: DisplayCocktail["ingredients"][number] }) {
  return (
    <div className="flex flex-row flex-grow bg-gray-200 rounded p-2 gap-1 px-4 py-2 min-w-[200px]">
      <div className="flex-grow">{ingredient.name}</div>
      <div>
        {ingredient.amount}
        <span className="pl-1">{unitToString(ingredient.unit)}</span>
      </div>
    </div>
  );
}