"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Control, FieldPath, useForm } from "react-hook-form"
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

export const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email:"",
      position:"",
      aboutYourself:"",
      emailReason:"",
      recipient:"",
      recipientEmail:"",
      aboutRecipient:"",
      additionalLinks:"",
    },
  })

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
                <Input type={type} placeholder={placeholder} {...field} className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"/>
                :<Textarea placeholder={placeholder} {...field} className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"/>
          }
              </FormControl>
              <FormDescription>
                {description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
  )
}

        

       