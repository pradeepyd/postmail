"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Eye, Send } from "lucide-react";
import FeatureCard from "./FeatureCard";

const HeroSection = () => {
  const [showPreview, setShowPreview] = useState(false);

  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI-Powered Generation",
      description: "Generate personalized emails using advanced Gemini AI"
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Live Preview",
      description: "See your email in real-time before sending"
    },
    {
      icon: <Send className="h-6 w-6" />,
      title: "One-Click Send",
      description: "Send your perfect email with just one click"
    }
  ];

  return (
    <>
      {/* Badge */}
      <div className="mx-auto mt-12 flex max-w-fit items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 px-6 py-3 backdrop-blur-sm shadow-lg">
        <Sparkles className="h-4 w-4 text-purple-300" />
        <span className="text-sm font-medium text-purple-100">
          Powered by Google Gemini AI
        </span>
      </div>

      {/* Hero section */}
      <div className="container mx-auto mt-16 px-6 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl"
        >
          Generate Perfect Emails with{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI Magic
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-8 max-w-2xl text-lg text-gray-300 mb-16"
        >
          Create personalized, professional emails in seconds using Google Gemini AI. 
          Preview your message and send it with confidence - all in one click.
        </motion.p>

        {/* Feature Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-20 mb-16 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3 px-4"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 mb-20 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        >
          <button className="h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 text-base font-medium text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center space-x-2">
            <Sparkles className="h-4 w-4" />
            <span>Start Generating Emails</span>
          </button>
          <button 
            onClick={() => setShowPreview(!showPreview)}
            className="h-12 rounded-full border border-gray-600 px-8 text-base font-medium text-white hover:bg-white/10 transition-colors flex items-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            <span>See Preview</span>
          </button>
        </motion.div>
      </div>

      {/* <EmailPreviewModal 
        showPreview={showPreview} 
        onClose={() => setShowPreview(false)} 
      /> */}
    </>
  );
};

export default HeroSection;
