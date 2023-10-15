import React from "react";
import type { UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { Cocktail, CocktailInstruction } from "@/types/cocktail";

import EditorTab from "@/components/editors/cocktail/tabs/EditorTab";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RefreshCcwIcon } from "lucide-react";
import InstructionItem from "@/components/editors/cocktail/tabs/instructions/InstructionItem";
import EmptyList from "@/components/editors/cocktail/tabs/EmptyList";
import { FormTextArea } from "@/components/form/FormTextArea";

export default function InstructionsTab({ form }: { form: UseFormReturn<Cocktail, any, undefined> }) {
  const watchInstructions = form.watch("instructions");

  const instructionForm = useForm<CocktailInstruction>({
    defaultValues: {
      cocktailId: 0,
      content: "",
      order: 0
    },
    resolver: async (data) => {
      if (watchInstructions.find((instruction) => instruction.content === data.content)) {
        return {
          values: {},
          errors: {
            content: {
              type: "content",
              message: "Instruction already exists."
            }
          }
        };
      }

      if (data.content.length === 0) {
        return {
          values: {},
          errors: {
            content: {
              type: "content",
              message: "Instruction cannot be empty."
            }
          }
        };
      }

      return {
        values: data,
        errors: {}
      };
    }
  });

  const onInstructionSubmit = (data: CocktailInstruction) => {
    const instructions = form.getValues("instructions");
    form.setValue("instructions", [...instructions, {
      ...data,
      order: instructions.length
    }]);

    instructionForm.reset();
  };

  const onInstructionRemove = (content: string) => {
    const instructions = form.getValues("instructions");

    const newInstructions = instructions.filter((instruction) => instruction.content !== content);
    newInstructions.forEach((instruction, index) => instruction.order = index);

    form.setValue("instructions", newInstructions);
  };

  const onInstructionDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !active) return;

    if (active.id !== over.id) {
      const instructions = form.getValues("instructions");
      const activeIndex = instructions.findIndex((instruction) => instruction.content === active.id);
      const overIndex = instructions.findIndex((instruction) => instruction.content === over.id);

      const newInstructions = arrayMove(instructions, activeIndex, overIndex);
      newInstructions.forEach((instruction, index) => instruction.order = index);

      form.setValue("instructions", newInstructions);
    }
  };

  const reset = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    instructionForm.reset();
  };

  return (
    <EditorTab>
      <div className="h-full flex flex-col gap-4">

        <DndContext onDragEnd={onInstructionDragEnd}>
          <SortableContext items={watchInstructions.map(i => i.content)}>
            <div className="grow w-full">
              {watchInstructions.map((instruction) => (
                <InstructionItem key={`${instruction.content}`} instruction={instruction}
                                 onInstructionRemove={onInstructionRemove} />
              ))}

              {watchInstructions.length === 0 && (
                <EmptyList>
                  Add instructions to your cocktail below.
                </EmptyList>
              )}
            </div>
          </SortableContext>
        </DndContext>

        <div className="editor-internal-card grid gap-4">
          <h2 className="font-bold">Add Instruction</h2>

          <Form {...instructionForm}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <FormTextArea control={instructionForm.control} name="content" label="Instruction" />
              </div>

              <div className="flex gap-1">
                <Button variant="outline"
                        onClick={reset}
                        className="text-xs">
                  <RefreshCcwIcon className="w-4 h-4" />
                </Button>

                <div className="grow flex justify-end">
                  <Button onClick={instructionForm.handleSubmit(onInstructionSubmit)}>Add</Button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </EditorTab>
  );
}