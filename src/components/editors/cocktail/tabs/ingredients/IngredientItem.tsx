import React from "react";
import { ChevronDownIcon, ChevronUpIcon, XIcon } from "lucide-react";
import { Unit, unitToString } from "@/types/unit";
import { CocktailIngredient } from "@/types/cocktail";
import { Ingredient } from "@/types/ingredient";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type IngredientItemProps = {
  ci: CocktailIngredient,
  ingredient: Ingredient,
  onIngredientRemove: (ingredientId: number) => void
}

export default function IngredientItem({ ci, ingredient, onIngredientRemove }: IngredientItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    active
  } = useSortable({ id: ci.ingredientId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    onIngredientRemove(ci.ingredientId);
  };

  return (
    <div className={cn("relative bg-white", active ? "z-10" : "z-0")} style={style}>
      <div ref={setNodeRef} {...attributes} {...listeners}
           className="mb-1 flex items-center gap-2 rounded-md border p-2">
        <div className="flex flex-col">
          <ChevronUpIcon className="h-4 w-4" />
          <ChevronDownIcon className="h-4 w-4" />
        </div>

        <div className="grow">
          <h3 className="font-bold leading-none">{ingredient.name}</h3>
          <span className="text-sm leading-none">
          {ci.amount > 0 && ci.amount} {ci.unit !== Unit.NONE && unitToString(ci.unit)}
        </span>
        </div>
      </div>

      <Button variant="outline" className="absolute top-2 right-3 z-10 px-2 py-1/2" onClick={handleDelete}>
        <XIcon className="text-gray-500 h-4 w-4" />
      </Button>
    </div>
  );
}
