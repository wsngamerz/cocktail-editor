import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Control } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

type FormTextAreaProps = {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
}

export function FormTextArea(props: FormTextAreaProps) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            <Textarea placeholder={props.placeholder || ""} {...field} />
          </FormControl>
          {props.description && (
            <FormDescription>
              {props.description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}