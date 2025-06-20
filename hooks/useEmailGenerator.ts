// hooks/useEmailGenerator.ts
import { useState } from "react";
import { generateEmail } from "@/app/actions/generate";
import { FormValues } from "@/components/FormCompo";

export type FormPayload = {
  formValues: FormValues;
  file?: File;
};

export const useEmailGenerator = () => {
  const [formData, setFormData] = useState<FormPayload | null>(null);
  const [generatedEmail, setGeneratedEmail] = useState<{
    subject: string;
    body: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async ({ formValues, file }: FormPayload) => {
    setLoading(true);
    const email = await generateEmail({
      ...formValues,
      reason: formValues.emailReason || "",
      aboutRecipient: formValues.aboutRecipient || "",
      attachedFile: file,
    });

    setFormData({ formValues, file });
    setGeneratedEmail(email);
    setLoading(false);
  };

  return {
    handleGenerate,
    formData,
    generatedEmail,
  };
};
