import type { UseFormReturn } from "react-hook-form";
import type { Cocktail } from "@/types/cocktail";
import EditorTab from "@/components/editors/cocktail/tabs/EditorTab";
import { Glass, glassToString } from "@/types/glass";
import { Privacy, privacyToString } from "@/types/privacy";
import { FormInput } from "@/components/form/FormInput";
import { FormTextArea } from "@/components/form/FormTextArea";
import { FormSelect } from "@/components/form/FormSelect";

export function DetailsTab({ form }: { form: UseFormReturn<Cocktail, any, undefined> }) {
  return (
    <EditorTab>
      <div className="space-y-4">
        {/* Cocktail name */}
        <FormInput control={form.control} name="name" label="Name"
                   placeholder="Name of the cocktail"
                   description="This is the name of the cocktail." />

        {/* Cocktail description */}
        <FormTextArea control={form.control} name="description" label="Description"
                      placeholder="Description of the cocktail"
                      description="This is the description of the cocktail." />

        {/* Cocktail glass */}
        <FormSelect control={form.control} name="glass" label="Glass"
                    enum={Glass} enumToString={glassToString}
                    placeholder="Select a glass"
                    description="This is the glass the cocktail is served in." />

        {/* Cocktail privacy */}
        <FormSelect control={form.control} name="privacy" label="Privacy"
                    placeholder="Select a privacy level"
                    enum={Privacy} enumToString={privacyToString} />
      </div>
    </EditorTab>
  );
}