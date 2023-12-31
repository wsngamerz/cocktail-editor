import React from "react";
import type { UseFormReturn } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { Cocktail, CocktailGarnish } from "@/types/cocktail";

import EditorTab from "@/components/editors/cocktail/tabs/EditorTab";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { RefreshCcwIcon } from "lucide-react";
import EmptyList from "@/components/editors/cocktail/tabs/EmptyList";
import { Garnish, garnishToString } from "@/types/garnish";
import GarnishItem from "@/components/editors/cocktail/tabs/garnishes/GarnishItem";
import { FormSelect } from "@/components/form/FormSelect";
import { FormInput } from "@/components/form/FormInput";

export default function GarnishesTab({ form }: {
  form: UseFormReturn<Cocktail, any, undefined>
}) {
  const watchGarnishes = form.watch("garnishes");

  const garnishForm = useForm<CocktailGarnish>({
    defaultValues: {
      id: 0,
      cocktailId: 0,
      garnish: Garnish.LEMON_WEDGE,
      x: 0,
      y: 0
    },
    resolver: async (data) => {
      return {
        values: data,
        errors: {}
      };
    }
  });

  const onGarnishSubmit = (data: CocktailGarnish) => {
    const garnishes = form.getValues("garnishes");

    const largestId = garnishes.reduce((acc, curr) => {
      if (curr.id > acc) return curr.id;
      return acc;
    }, 0);
    form.setValue("garnishes", [...garnishes, { ...data, id: largestId + 1 }]);

    garnishForm.reset();
  };

  const onGarnishRemove = (id: number) => {
    const garnishes = form.getValues("garnishes");
    const newGarnishes = garnishes.filter((garnish) => garnish.id !== id);
    form.setValue("garnishes", newGarnishes);
  };

  const onGarnishDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !active) return;

    if (active.id !== over.id) {
      const garnishes = form.getValues("garnishes");
      const activeIndex = garnishes.findIndex((garnish) => garnish.id === active.id);
      const overIndex = garnishes.findIndex((garnish) => garnish.id === over.id);

      const newGarnishes = arrayMove(garnishes, activeIndex, overIndex);
      form.setValue("garnishes", newGarnishes);
    }
  };

  const reset = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    garnishForm.reset();
  };

  return (
    <EditorTab>
      <div className="h-full flex flex-col gap-4">

        <DndContext onDragEnd={onGarnishDragEnd}>
          <SortableContext items={watchGarnishes.map(i => i.id)}>
            <div className="grow w-full">
              {watchGarnishes.map((garnish) => (
                <GarnishItem key={garnish.id} garnish={garnish}
                             onGarnishRemove={onGarnishRemove} />
              ))}

              {watchGarnishes.length === 0 && (
                <EmptyList>
                  Add garnishes to your cocktail below.
                </EmptyList>
              )}
            </div>
          </SortableContext>
        </DndContext>

        <div className="editor-internal-card grid gap-4">
          <h2 className="font-bold">Add Garnish</h2>

          <Form {...garnishForm}>
            <div className="space-y-4">

              {/* Garnish type */}
              <FormSelect control={garnishForm.control} name="garnish" label="Garnish"
                          placeholder="Select a garnish"
                          enum={Garnish} enumToString={garnishToString} />

              <div className="grid grid-cols-2 gap-4">
                {/* Garnish x */}
                <FormInput control={garnishForm.control} name="x" label="X" placeholder="0" type="number"
                           onChange={(field, e) => field.onChange(+e.target.value)} />


                {/* Garnish y */}
                <FormInput control={garnishForm.control} name="y" label="Y" placeholder="0" type="number"
                           onChange={(field, e) => field.onChange(+e.target.value)} />
              </div>

              <div className="flex gap-1">
                <Button variant="outline"
                        onClick={reset}
                        className="text-xs">
                  <RefreshCcwIcon className="w-4 h-4" />
                </Button>

                <div className="grow flex justify-end">
                  <Button onClick={garnishForm.handleSubmit(onGarnishSubmit)}>Add</Button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </EditorTab>
  );
}