"use client"

import { Control, FieldPath } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formSchema } from "@/schemas"
import { Textarea } from "./ui/textarea"

type FormValues = z.infer<typeof formSchema>;


interface FormProps {
    name: FieldPath<FormValues>
    label:string
    control:Control<FormValues>
    placeholder:string
    description?:string
    type?:"text" | "email" | "password"
    inputOrTextArea:string
}

export function FormFieldCompo({
    name,
    control,
    label,
    placeholder,
    description,
    type,
    inputOrTextArea
} :FormProps) {

  return (
    <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-purple-300">{label}</FormLabel>
              <FormControl>
                {inputOrTextArea === "input" ? 
                <Input type={type} placeholder={placeholder} {...field} className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"/>
                :<Textarea placeholder={placeholder} {...field} className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"/>
          }
              </FormControl>
              {description && <FormDescription>
                {description}
              </FormDescription>}
              <FormMessage />
            </FormItem>
          )}
        />
  )
}

        

       