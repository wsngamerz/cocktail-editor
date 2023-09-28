import type { UseFormReturn } from "react-hook-form";
import type { Cocktail } from "@/types/cocktail";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import EditorTab from "@/components/editors/cocktail/tabs/EditorTab";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Glass, glassToString } from "@/types/glass";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Privacy, privacyToString } from "@/types/privacy";

export function DetailsTab({ form }: { form: UseFormReturn<Cocktail, any, undefined> }) {
  return (
    <EditorTab>
      {/* Cocktail name */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="" {...field} />
            </FormControl>
            <FormDescription>
              This is the name of the cocktail.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Cocktail description */}
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="" {...field} />
            </FormControl>
            <FormDescription>
              This is the description of the cocktail.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Cocktail glass */}
      <FormField
        control={form.control}
        name="glass"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Glass</FormLabel>
            <Select onValueChange={(value) => field.onChange(Glass[value as keyof typeof Glass])}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a glass" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Object.values(Glass)
                  .filter(glass => typeof glass === "string")
                  .map((glass) => {
                    return (
                      <SelectItem key={glass} value={glass as string}>
                        {glassToString(Glass[glass as keyof typeof Glass])}
                      </SelectItem>
                    );
                  })}
              </SelectContent>
            </Select>
            <FormDescription>
              This is the glass the cocktail is served in.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Cocktail privacy */}
      <FormField
        control={form.control}
        name="privacy"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Privacy</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={value => field.onChange(Privacy[value as keyof typeof Privacy])}
                defaultValue={Privacy[field.value]}
                className="flex flex-col"
              >
                {Object.values(Privacy)
                  .filter(privacy => typeof privacy === "string")
                  .map((privacy) => {
                    return (
                      <FormItem key={privacy} className="flex items-center space-x-2 space-y-0">
                        <FormControl><RadioGroupItem value={privacy as string} /></FormControl>
                        <FormLabel className="font-normal">
                          {privacyToString(Privacy[privacy as keyof typeof Privacy])}
                        </FormLabel>
                      </FormItem>
                    );
                  })}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </EditorTab>
  );
}