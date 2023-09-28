import type { UseFormReturn } from "react-hook-form";
import type { Cocktail } from "@/types/cocktail";

import EditorTab from "@/components/editors/cocktail/tabs/EditorTab";

export default function GarnishTab({ form }: {form: UseFormReturn<Cocktail, any, undefined>}) {
  return (
    <EditorTab>
       Garnishes
    </EditorTab>
  )
}