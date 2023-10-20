import CocktailView from "@/components/cocktail/View";
import fetcher, { cocktailAsDisplayCocktail, getCocktail } from "@/lib/utils";
import { IngredientResponse } from "@/hooks/useIngredients";

export default async function CocktailPage() {
  const ingredientsResponse = await fetcher<IngredientResponse>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ingredients`);

  const cocktail = getCocktail();
  const displayCocktail = cocktailAsDisplayCocktail(cocktail, ingredientsResponse.data);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <CocktailView cocktail={displayCocktail} />
    </div>
  );
}