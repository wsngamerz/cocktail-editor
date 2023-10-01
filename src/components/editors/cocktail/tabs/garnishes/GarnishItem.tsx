import React from "react";
import { ChevronDownIcon, ChevronUpIcon, XIcon } from "lucide-react";
import { CocktailGarnish } from "@/types/cocktail";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { garnishToString } from "@/types/garnish";

type GarnishItemProps = {
  garnish: CocktailGarnish
  onGarnishRemove: (id: number) => void
}

export default function GarnishItem({ garnish, onGarnishRemove }: GarnishItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: garnish.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    onGarnishRemove(garnish.id);
  };

  return (
    <div className="relative bg-white dark:bg-gray-900 rounded-md" style={style}>
      <div ref={setNodeRef} {...attributes} {...listeners}
           className="mb-1 flex items-center gap-2 rounded-md border p-2">
        <div className="flex flex-col">
          <ChevronUpIcon className="h-4 w-4" />
          <ChevronDownIcon className="h-4 w-4" />
        </div>

        <div className="text-sm grow flex flex-col">
          <h2>{garnishToString(garnish.garnish)}</h2>
          <p className="text-gray-700 dark:text-gray-300 flex gap-1">
            <span>x: {garnish.x}</span>
            <span>y: {garnish.y}</span>
          </p>
        </div>
      </div>

      <Button variant="outline" className="absolute top-1 right-3 z-10 p-1 py-0" onClick={handleDelete}>
        <XIcon className="text-gray-500 h-4 w-4" />
      </Button>
    </div>
  );
}
