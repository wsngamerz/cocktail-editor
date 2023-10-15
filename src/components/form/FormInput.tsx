import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, ControllerRenderProps } from "react-hook-form";
import React from "react";

type FormInputProps = {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  type?: string;
  onChange?: (field: ControllerRenderProps, e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FormInput(props: FormInputProps) {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            <Input placeholder={props.placeholder || ""} {...field} type={props.type || "text"}
                   onChange={props.onChange === undefined ? field.onChange : (e) => {
                     // @ts-ignore
                     props.onChange(field, e);
                   }} />
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