import type { Cocktail } from "@/types/cocktail";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { Privacy } from "@/types/privacy";
import { Glass } from "@/types/glass";

import { CitrusIcon, DropletIcon, GlassWaterIcon, ListIcon, ListOrderedIcon } from "lucide-react";
import * as Tabs from "@radix-ui/react-tabs";

import { Button } from "@/components/ui/button";
import { DetailsTab } from "@/components/editors/cocktail/tabs/DetailsTab";

import "./editor.css";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { slugify } from "@/lib/utils";
import LiquidTab from "@/components/editors/cocktail/tabs/LiquidTab";
import GarnishTab from "@/components/editors/cocktail/tabs/garnishes";
import IngredientsTab from "@/components/editors/cocktail/tabs/ingredients";
import InstructionsTab from "@/components/editors/cocktail/tabs/instructions";

const emptyCocktail: Cocktail = {
  id: 0,
  name: "",
  slug: "",
  description: "",
  privacy: Privacy.PUBLIC,
  userId: 0,
  abv: 0,
  glass: Glass.MARTINI,
  colour: "#000",
  garnishes: [],
  ingredients: [],
  instructions: [],
  createdAt: new Date(0),
  updatedAt: new Date(0)
};

enum EditorTab {
  DETAILS = "details",
  LIQUID = "liquid",
  GARNISHES = "garnishes",
  INGREDIENTS = "ingredients",
  INSTRUCTIONS = "instructions"
}

type CocktailEditorProps = {
  title: string;
  onSave: (data: Cocktail) => void;
  onCancel: () => void;

  initialData?: Cocktail;
}
export default function BaseCocktailEditor({ initialData, title, onSave, onCancel }: CocktailEditorProps) {
  const form = useForm<Cocktail>({
    defaultValues: initialData ?? emptyCocktail
  });

  const watchForm = form.watch();
  const watchName = form.watch("name");

  useEffect(() => form.setValue("slug", slugify(watchName)), [form, watchName]);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="grow grid grid-cols-[400px_auto] gap-4">

        <div className="editor-card flex flex-col gap-4">
          <h1 className="text-center text-xl font-bold">{title}</h1>

          <Tabs.Root className="grow flex flex-col gap-4" defaultValue={EditorTab.DETAILS}>
            <Tabs.List className="editor-internal-card rounded-md grid grid-cols-5 gap-1 !p-1">
              <EditorTabTrigger value={EditorTab.DETAILS} name="Details" icon={<ListIcon />} />
              <EditorTabTrigger value={EditorTab.LIQUID} name="Liquid" icon={<DropletIcon />} />
              <EditorTabTrigger value={EditorTab.GARNISHES} name="Garnish" icon={<CitrusIcon />} />
              <EditorTabTrigger value={EditorTab.INGREDIENTS} name="Items" icon={<GlassWaterIcon />} />
              <EditorTabTrigger value={EditorTab.INSTRUCTIONS} name="Steps" icon={<ListOrderedIcon />} />
            </Tabs.List>

            <Form {...form}>
              <form className="grow w-full" onSubmit={form.handleSubmit(onSave)}>
                <Tabs.Content className="w-full h-full" value={EditorTab.DETAILS}><DetailsTab form={form} /></Tabs.Content>
                <Tabs.Content className="w-full h-full" value={EditorTab.LIQUID}><LiquidTab form={form} /></Tabs.Content>
                <Tabs.Content className="w-full h-full" value={EditorTab.GARNISHES}><GarnishTab form={form} /></Tabs.Content>
                <Tabs.Content className="w-full h-full" value={EditorTab.INGREDIENTS}><IngredientsTab form={form} /></Tabs.Content>
                <Tabs.Content className="w-full h-full" value={EditorTab.INSTRUCTIONS}><InstructionsTab form={form} /></Tabs.Content>
              </form>
            </Form>

          </Tabs.Root>
        </div>

        <div className="editor-card overflow-hidden">
          <div className="overflow-scroll">
            <pre className="text-xs">{JSON.stringify(watchForm, null, 2)}</pre>
          </div>
        </div>
      </div>

      <div className="editor-card flex justify-end">
        <div className="space-x-2">
          <Button variant="default" onClick={form.handleSubmit(onSave)}>Save</Button>
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}

function EditorTabTrigger({ value, name, icon }: { value: EditorTab, name: string, icon: ReactNode }) {
  return (
    <Tabs.Trigger
      className="aspect-square p-1 bg-gray-50 rounded text-gray-600 data-[state=active]:text-gray-900 data-[state=active]:bg-gray-200 transition-colors duration-200 dark:bg-gray-900 dark:text-gray-500 dark:data-[state=active]:text-gray-100 dark:data-[state=active]:bg-gray-800"      value={value}>
      <div className="text-center flex flex-col items-center gap-1">
        {icon}
        <span className="text-xs">
          {name}
        </span>
      </div>
    </Tabs.Trigger>
  );
}