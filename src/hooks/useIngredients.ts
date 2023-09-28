import useSWR from "swr";
import fetcher from "@/lib/utils";

type IngredientResponse = {
  data: {
    id: number;
    name: string;
    description: string;
    categoryId: number;
    abv: number;
  }[];
  status: string;
}

export default function useIngredients() {
  const { data, error, isLoading } = useSWR<IngredientResponse>("/api/ingredients", fetcher);

  return {
    ingredients: data?.data,
    isLoading,
    isError: error,
  };
}