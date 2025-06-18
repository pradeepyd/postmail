import { Form } from "react-hook-form"
import { form, FormFieldCompo } from "./FormField"
import { Button } from "./ui/button"
import { FormField } from "./ui/form"
import { formSchema } from "@/schemas"
import * as z from "zod"

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }


export const FormCompo = () => {
    return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormFieldCompo
            name="name"
            control={form.control}
            label="Your Name"
            type="text"
            inputOrTextArea="input"
            placeholder="Enter your name"
            />
            <FormFieldCompo
            name="email"
            control={form.control}
            label="Your Email"
            inputOrTextArea="input"
            type="email"
            placeholder="Enter your email"
            />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    )
}