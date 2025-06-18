"use client"
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { MotionDiv } from "./motionDiv";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="rounded-xl bg-white/5 p-6 backdrop-blur-sm border border-white/10"
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white mb-4 mx-auto">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2 text-center">
        {title}
      </h3>
      <p className="text-sm text-gray-400 text-center">{description}</p>
    </MotionDiv>
  );
};

export default FeatureCard;
