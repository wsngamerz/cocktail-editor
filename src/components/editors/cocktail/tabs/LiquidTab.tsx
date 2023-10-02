import type { UseFormReturn } from "react-hook-form";
import type { Cocktail } from "@/types/cocktail";

import EditorTab from "@/components/editors/cocktail/tabs/EditorTab";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Index from "@/components/picker";

export default function LiquidTab({ form }: { form: UseFormReturn<Cocktail, any, undefined> }) {
  return (
    <EditorTab>
      <FormField
        control={form.control}
        name="colour"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Colour</FormLabel>
            <FormControl>
              <Index value={field.value} onChange={field.onChange} />
            </FormControl>
            <FormDescription>
              Liquid colour in the glass
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </EditorTab>
  );
}