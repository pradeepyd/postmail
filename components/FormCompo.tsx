"use client"
import { useForm } from "react-hook-form"
import { FormFieldCompo } from "./FormField"
import { Form} from "./ui/form"
import { formSchema } from "@/schemas"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FileUpload } from "./ui/file-upload"
import CustomButton from "./CustomButton"
import { Sparkles } from "lucide-react"
import { useState } from "react"

export type FormValues = z.infer<typeof formSchema>;



export const FormCompo = ({onGenerate}:{onGenerate: (data:{ formValues: FormValues; file?: File }) => void}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      position: "",
      aboutYourself: "",
      emailReason: "",
      recipient: "",
      recipientEmail: "",
      aboutRecipient: "",
      additionalLinks: "",
      calcom:"",
    },
  })

  async function onSubmit(values: FormValues) {
     const formData = new FormData();

  // Add all form fields
  Object.entries(values).forEach(([key, value]) => {
    if (typeof value === "string") {
      formData.append(key, value);
    }
  });

  // Only append file if it's selected
  if (selectedFile) {
    formData.append("file", selectedFile);
  }
    setIsGenerating(true);
    await onGenerate({ formValues: values, file: selectedFile ?? undefined }); // send data up
    setIsGenerating(false);
  }


  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          <FormFieldCompo
            name="position"
            control={form.control}
            label="Your Position"
            inputOrTextArea="input"
            placeholder="e.g. Software Engineer"
          />

          <FormFieldCompo
            name="calcom"
            control={form.control}
            label="Cal.com"
            inputOrTextArea="input"
            placeholder="e.g. Software Engineer"
          />

          <FormFieldCompo
            name="aboutYourself"
            control={form.control}
            label="About Yourself"
            inputOrTextArea=""
            placeholder="Tell us about your background,expertise,experience..."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormFieldCompo
              name="recipient"
              control={form.control}
              label="Recipient Name"
              inputOrTextArea="input"
              placeholder="Enter recipient name"
            />

            <FormFieldCompo
              name="recipientEmail"
              control={form.control}
              label="Recipient Email"
              inputOrTextArea="input"
              type="email"
              placeholder="recipient@example.com"
            />
          </div>

          <FormFieldCompo
            name="emailReason"
            control={form.control}
            label="Reason for sending email"
            inputOrTextArea=""
            placeholder="Explain why are you reaching out..."
          />


          <FormFieldCompo
            name="aboutRecipient"
            control={form.control}
            label="About Recipient"
            inputOrTextArea=""
            placeholder="their role, company.."
          />

          <FormFieldCompo
            name="additionalLinks"
            control={form.control}
            label="Links"
            inputOrTextArea=""
            placeholder="relevent links (LinkedIn, portfolio, websites, etc.)"
            description="Separate multiple links with commas"
          />
          <FileUpload onChange={(files) => setSelectedFile(files[0])}/>
          <CustomButton type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            size="lg"
            disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                Generating Email...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Email
              </>
            )}
          </CustomButton>
        </form>
      </Form>
    </div>
  )
}