import { Eye, Send, Sparkles } from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "AI-Powered Generation",
    description: "Generate personalized emails using advanced Gemini AI",
  },
  {
    icon: <Eye className="h-6 w-6" />,
    title: "Live Preview",
    description: "See your email in real-time before sending",
  },
  {
    icon: <Send className="h-6 w-6" />,
    title: "One-Click Send",
    description: "Send your perfect email with just one click",
  },
];

const FeaturesSection = () => {
  return (
    <div className="mx-auto mt-20 mb-16 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3 px-4">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
};

export default FeaturesSection;
