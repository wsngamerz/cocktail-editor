import CocktailView from "@/components/cocktail/View";
import { cocktailAsDisplayCocktail, getCocktail, getIngredients } from "@/lib/utils";

export default async function CocktailPage() {
  const cocktail = getCocktail();
  const displayCocktail = cocktailAsDisplayCocktail(cocktail, getIngredients()?.data);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <CocktailView cocktail={displayCocktail} />
    </div>
  );
}