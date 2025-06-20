"use client"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does the AI email generation work?",
      answer: "Our system uses Google Gemini AI to analyze your requirements and generate personalized, professional emails. Simply provide the context, tone, and purpose, and the AI will craft the perfect message for you."
    },
    {
      question: "Can I customize the generated emails?",
      answer: "Absolutely! You can edit any generated email before sending. The AI provides a great starting point, but you have full control to modify the content, tone, and formatting to match your needs."
    },
    {
      question: "Are you storing any data?",
      answer: "No, we aren't storing any data. You don't need to signin to use it."
    },
    {
      question: "What types of emails can I generate?",
      answer: "You can generate various types of emails including business correspondence, follow-ups, introductions, thank you notes, proposals, and more. The AI adapts to different tones and purposes."
    },
    {
      question: "How accurate is the AI-generated content?",
      answer: "Our Gemini AI is highly sophisticated and generates contextually relevant, grammatically correct emails. However, we always recommend reviewing the content before sending to ensure it meets your specific requirements."
    },
    {
      question: "Is there a limit to how many emails I can generate?",
      answer: "We offer different plans to suit various needs. Our free tier includes a generous number of generations per month, with premium plans offering unlimited access and additional features."
    }
  ];

  return (
    <div className="py-15 px-4 ">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-lg">
            Everything you need to know about our AI email generation service
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <span className="text-white font-medium text-lg">{faq.question}</span>
                {openFAQ === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </button>
              <AnimatePresence>
                {openFAQ === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
