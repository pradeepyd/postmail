"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Send, Eye, FileText, User, Mail, Link, Upload, Sparkles } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Typewriter Component
interface TypewriterProps {
  text: string | string[];
  speed?: number;
  cursor?: string;
  loop?: boolean;
  deleteSpeed?: number;
  delay?: number;
  className?: string;
}

function Typewriter({
  text,
  speed = 100,
  cursor = "|",
  loop = false,
  deleteSpeed = 50,
  delay = 1500,
  className,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textArrayIndex, setTextArrayIndex] = useState(0);

  const textArray = Array.isArray(text) ? text : [text];
  const currentText = textArray[textArrayIndex] || "";

  useEffect(() => {
    if (!currentText) return;

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentIndex < currentText.length) {
            setDisplayText((prev) => prev + currentText[currentIndex]);
            setCurrentIndex((prev) => prev + 1);
          } else if (loop) {
            setTimeout(() => setIsDeleting(true), delay);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText((prev) => prev.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentIndex(0);
            setTextArrayIndex((prev) => (prev + 1) % textArray.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed
    );

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, currentText, loop, speed, deleteSpeed, delay, displayText, text]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">{cursor}</span>
    </span>
  );
}

// File Upload Component
const FileUpload = ({ onChange }: { onChange?: (files: File[]) => void }) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    onChange && onChange(newFiles);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: true,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-6 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden border-2 border-dashed border-gray-600 hover:border-purple-400/50 transition-colors bg-gray-800/50"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          multiple
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center">
          <Upload className="h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm font-medium text-gray-200">Upload files</p>
          <p className="text-xs text-gray-400 mt-1">
            Drag or drop your files here or click to upload
          </p>
          <div className="relative w-full mt-4 max-w-xl mx-auto">
            {files.length > 0 &&
              files.map((file, idx) => (
                <motion.div
                  key={"file" + idx}
                  layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                  className="relative overflow-hidden z-40 bg-gray-700/80 flex flex-col items-start justify-start p-3 mt-2 w-full mx-auto rounded-md border border-gray-600"
                >
                  <div className="flex justify-between w-full items-center gap-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="text-sm text-gray-200 truncate max-w-xs"
                    >
                      {file.name}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="rounded px-2 py-1 text-xs text-gray-400 bg-gray-600"
                    >
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Main Email Generator Component
const formSchema = z.object({
  senderName: z.string().min(1, "Name is required"),
  senderEmail: z.string().email("Valid email is required"),
  senderPosition: z.string().min(1, "Position is required"),
  aboutSender: z.string().min(10, "Please provide more details about yourself"),
  emailReason: z.string().min(10, "Please provide a reason for sending this email"),
  recipientEmail: z.string().email("Valid recipient email is required"),
  aboutRecipient: z.string().min(5, "Please provide details about the recipient"),
  additionalLinks: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

function EmailGeneratorPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      senderName: "",
      senderEmail: "",
      senderPosition: "",
      aboutSender: "",
      emailReason: "",
      recipientEmail: "",
      aboutRecipient: "",
      additionalLinks: "",
    },
  });

  const watchedValues = form.watch();



  useEffect(() => {
    if (form.formState.isValid) {
      const content = generateEmailContent(watchedValues);
      setGeneratedEmail(content);
    }
  }, [watchedValues, files, form.formState.isValid]);

  const onSubmit = async (data: FormValues) => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const content = generateEmailContent(data);
    setGeneratedEmail(content);
    setIsGenerating(false);
    toast.success("Email generated successfully!");
  };

  const handleSendEmail = async () => {
    if (!generatedEmail) return;

    setIsSending(true);
    
    try {
      // Prepare email data for Nodemailer
      const emailData = {
        to: watchedValues.recipientEmail,
        from: watchedValues.senderEmail,
        subject: "Introduction and Collaboration Opportunity",
        text: generatedEmail,
        html: generatedEmail.replace(/\n/g, '<br>'),
        attachments: files.map(file => ({
          filename: file.name,
          content: file,
          contentType: file.type
        }))
      };

      // TODO: Replace with actual API call to your backend endpoint that handles Nodemailer
      console.log('Email data prepared for Nodemailer:', emailData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Email sent successfully!");
    } catch (error) {
      console.error('Failed to send email:', error);
      toast.error("Failed to send email. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  // Auto-resize textarea function
  const handleTextareaResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            <Typewriter
              text={["Email Generator", "Create Professional Emails", "AI-Powered Email Assistant"]}
              speed={100}
              loop={true}
              className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            />
          </h1>
          <p className="text-gray-300 text-lg">
            Generate professional emails with our intelligent form system
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="h-6 w-6 text-purple-400" />
              <h2 className="text-2xl font-semibold text-white">Fill up the details</h2>
            </div>

            <div className="p-6 rounded-lg border border-gray-700 bg-transparent backdrop-blur-sm">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="senderName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-purple-300">Your Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your name" 
                              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="senderEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-purple-300">Your Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="your.email@example.com" 
                              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="senderPosition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-purple-300">Your Position/Title</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Software Engineer, Marketing Manager" 
                            className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="aboutSender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-purple-300">About Yourself</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your background, experience, and expertise..."
                            className="min-h-[60px] bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 resize-none overflow-hidden"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              handleTextareaResize(e);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="emailReason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-purple-300">Reason for Sending Email</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Explain why you're reaching out and what you hope to achieve..."
                            className="min-h-[60px] bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 resize-none overflow-hidden"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              handleTextareaResize(e);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="recipientEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-purple-300">Recipient Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="recipient@example.com" 
                            className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="aboutRecipient"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-purple-300">About Recipient</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What do you know about the recipient? Their role, company, achievements..."
                            className="min-h-[60px] bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 resize-none overflow-hidden"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              handleTextareaResize(e);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="additionalLinks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-purple-300">Links (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Add any relevant links (LinkedIn, portfolio, website, etc.)"
                            className="min-h-[60px] bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 resize-none overflow-hidden"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              handleTextareaResize(e);
                            }}
                          />
                        </FormControl>
                        <FormDescription className="text-gray-400">
                          Separate multiple links with commas
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <Label className="text-sm font-medium mb-2 block text-purple-300">File Attachments (Optional)</Label>
                    <FileUpload onChange={setFiles} />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    disabled={isGenerating}
                    size="lg"
                  >
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
                  </Button>
                </form>
              </Form>
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Eye className="h-6 w-6 text-purple-400" />
                <h2 className="text-2xl font-semibold text-white">Email Preview</h2>
              </div>
              <Button
                onClick={handleSendEmail}
                disabled={!generatedEmail || isSending}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
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
              </Button>
            </div>

            <div className="p-6 rounded-lg border border-gray-700 bg-gray-800/50 backdrop-blur-sm min-h-[600px]">
              {generatedEmail ? (
                <div className="space-y-4">
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-gray-200 font-mono bg-gray-700 p-4 rounded-md overflow-auto border border-gray-600">
                      <Typewriter
                        text={generatedEmail}
                        speed={20}
                        className="text-gray-200"
                      />
                    </pre>
                  </div>
                  {files.length > 0 && (
                    <div className="mt-4 p-4 bg-gray-700 rounded-md border border-gray-600">
                      <h4 className="text-sm font-medium mb-2 text-white">Attachments:</h4>
                      <ul className="text-sm text-gray-300">
                        {files.map((file, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <FileText className="h-3 w-3" />
                            {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-center">
                  <div className="space-y-4">
                    <Eye className="h-12 w-12 text-gray-500 mx-auto" />
                    <div>
                      <h3 className="text-lg font-medium text-white">Email Preview</h3>
                      <p className="text-gray-400">
                        Fill out the form to see your generated email here
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailGeneratorPage;
