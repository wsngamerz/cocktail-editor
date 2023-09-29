import React from "react";
import { ChevronDownIcon, ChevronUpIcon, XIcon } from "lucide-react";
import { CocktailInstruction } from "@/types/cocktail";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";

type InstructionItemProps = {
  instruction: CocktailInstruction
  onInstructionRemove: (content: string) => void
}

export default function InstructionItem({ instruction, onInstructionRemove }: InstructionItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: instruction.content });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    onInstructionRemove(instruction.content);
  };

  return (
    <div className="relative bg-white" style={style}>
      <div ref={setNodeRef} {...attributes} {...listeners}
           className="mb-1 flex items-center gap-2 rounded-md border p-2">
        <div className="flex flex-col">
          <ChevronUpIcon className="h-4 w-4" />
          <ChevronDownIcon className="h-4 w-4" />
        </div>

        <div className="text-sm grow flex gap-1">
          <span>{instruction.order + 1}.</span>
          <p className="text-gray-700">
            {instruction.content}
          </p>
        </div>
      </div>

      <Button variant="outline" className="absolute top-1 right-3 z-10 p-1 py-0" onClick={handleDelete}>
        <XIcon className="text-gray-500 h-4 w-4" />
      </Button>
    </div>
  );
}
