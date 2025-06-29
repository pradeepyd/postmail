"use client";
import { FileText } from "lucide-react";
import { FormCompo } from "@/components/FormCompo";
import { PreviewSection } from "@/components/PreviewSection";
import { Typewriter } from "@/components/Typewriter";
import { useEmailGenerator } from "@/hooks/useEmailGenerator";

const GenerateEmailPage = () => {
  const { handleGenerate, formData, generatedEmail} = useEmailGenerator();

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <div className="container mx-auto px-4 py-8 mt-6">
        <div className="text-center mb-8 ">
          <h1 className="text-4xl font-bold text-white mb-4 ">
            <Typewriter
              text={["Email Generator", "Create Professional Emails", "AI-Powered Email Assistant"]}
              speed={100}
              loop
              className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            />
          </h1>
          <p className="text-gray-300 text-lg">
            Generate professional emails with our intelligent form system
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="h-6 w-6 text-purple-400" />
              <h2 className="text-2xl font-semibold text-white">Fill up the details</h2>
            </div>

            <div className="p-6 rounded-lg border border-gray-700 bg-transparent backdrop-blur-sm">
              <FormCompo onGenerate={handleGenerate} />
            </div>
          </div>

          <PreviewSection
            generatedEmail={generatedEmail}
            formData={{
              email: formData?.formValues.email || "",
              recipientEmail: formData?.formValues.recipientEmail || "",
              file: formData?.file,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GenerateEmailPage;
