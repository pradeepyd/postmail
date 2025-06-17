import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="rounded-xl bg-white/5 p-6 backdrop-blur-sm border border-white/10">
      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white mb-4 mx-auto">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-400">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;