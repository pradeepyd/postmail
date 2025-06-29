
import { Sparkles } from "lucide-react";
import FeaturesSection from "./FeatureSection";
import { MotionH1,MotionP } from "./motionDiv";
import { CTAbutton } from "./CTAbutton";
const HeroSection = () => {

  return (
    <>
      <div className="mx-auto mt-10 flex max-w-fit items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 px-4 py-1 backdrop-blur-sm shadow-lg">
        <Sparkles className="h-4 w-4 text-purple-300" />
        <span className="text-sm font-medium text-purple-100">
          Powered by Google Gemini AI
        </span>
      </div>

      <div className="container mx-auto mt-10 px-6 text-center">
        <MotionH1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl"
        >
          Generate Perfect Emails with{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI Magic
          </span>
        </MotionH1>
        
        <MotionP 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-8 max-w-2xl text-lg text-gray-300 mb-16"
        >
          Create personalized, professional emails in seconds using Google Gemini AI. 
          Preview your message and send it with confidence - all in one click without signing in.
        </MotionP>

        <FeaturesSection/>
        <CTAbutton/>
      </div>
    </>
  );
};

export default HeroSection;
