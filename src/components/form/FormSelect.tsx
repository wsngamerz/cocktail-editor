import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Control } from "react-hook-form";

type StandardEnum<T> = {
  [id: string]: T | string;
  [nu: number]: string;
}

type FormSelectProps<T> = {
  control: Control<any>;
  name: string;
  label: string;
  description?: string;
  placeholder?: string;
  enum: StandardEnum<T>;
  enumToString: (value: T | string) => string;
}

export function FormSelect<T>(props: FormSelectProps<T>) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <Select onValueChange={(value) => field.onChange(props.enum[value])}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={props.placeholder || ""} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.values(props.enum)
                .filter(value => typeof value === "string")
                .map((value) => {
                  const key = value as keyof typeof props.enum as string;
                  return (
                    <SelectItem key={key} value={key}>
                      {props.enumToString(props.enum[key])}
                    </SelectItem>
                  );
                })}
            </SelectContent>
          </Select>
          {props.description && (
            <FormDescription>
              This is the glass the cocktail is served in.
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}