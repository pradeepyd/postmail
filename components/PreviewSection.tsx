"use client"
import { Eye, Send, Sparkles } from "lucide-react"
import { TextGenerateEffect } from "./ui/text-generate-effect"
import { useState } from "react"
import CustomButton from "./CustomButton"
import { sendEmail } from "@/app/actions/sendEmail"

type PreviewSectionProps = {
  generatedEmail: { subject: string; body: string } | null;
  formData: {
    email: string;
    recipientEmail: string;
    file?: File;
  };
};

export const PreviewSection = ({generatedEmail,formData}:PreviewSectionProps) => {
    const [isSending, setIsSending] = useState(false);

const handleSend = async () => {
     if (!generatedEmail) return;
  setIsSending(true);

  let attachmentBase64: string | null = null;

  if (formData?.file) {
    const buffer = await formData?.file.arrayBuffer();
    attachmentBase64 = Buffer.from(buffer).toString("base64");
  }

    await sendEmail({
    from: formData.email,
    to: formData.recipientEmail,
    subject: generatedEmail.subject,
    html: generatedEmail.body,
    attachment: attachmentBase64
      ? {
          content: attachmentBase64,
          filename: formData.file!.name,
          contentType: formData.file!.type,
        }
      : undefined,
  });
    setTimeout(() => {
        setIsSending(false);
  }, 10000);
};
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Eye className="h-6 w-6 text-purple-400" />
                    <h2 className="text-2xl font-semibold text-white">Email Preview</h2>
                </div>
                <CustomButton className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    disabled={!generatedEmail || isSending}
                    onClick={handleSend}>
                    {isSending ? (
                        <>
                            <Sparkles className="h-4 w-4 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>
                            <Send className="h-4 w-4" />
                            Send Email
                        </>
                    )}
                </CustomButton>
            </div>

            <div className="p-6 rounded-lg border border-gray-700  backdrop-blur-sm min-h-[800px]">
                {generatedEmail ? (
                    <div className="space-y-4">
                        <div className="prose prose-sm max-w-none">

                            <pre className="whitespace-pre-wrap text-sm bg-black p-4 rounded-md overflow-auto ">
                                <h4 className="text-white text-xl font-semibold mb-2">
                                    Subject:{generatedEmail.subject}
                                </h4>
                                <TextGenerateEffect
                                    words={generatedEmail.body}
                                    className="text-white text-xl font-normal"
                                />
                            </pre>
                        </div>
                    </div>) :

                    (<div className="flex items-center justify-center h-full text-center">
                        <div className="space-y-4">
                            <Eye className="h-8 w-8 text-gray-500 mx-auto" />
                            <div>
                                <h3 className="text-lg font-medium text-white">Email Preview</h3>
                                <p className="text-gray-400">
                                    Fill out the form to see your generated email here
                                </p>
                            </div>
                        </div>
                    </div>)}
            </div>
        </div >
    )
}