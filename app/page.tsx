
import FAQSection from "@/components/FAQsection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import  TwinklingStars  from "@/components/TwinklingStars";
import { div } from "motion/react-client";


export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Gradient background */}
      <div className="flex flex-col items-end absolute -right-60 -top-10 blur-xl z-0">
        <div className="h-[10rem] rounded-full w-[60rem] z-1 bg-gradient-to-b blur-[6rem] from-purple-600 to-sky-600"></div>
        <div className="h-[10rem] rounded-full w-[90rem] z-1 bg-gradient-to-b blur-[6rem] from-pink-900 to-yellow-400"></div>
        <div className="h-[10rem] rounded-full w-[60rem] z-1 bg-gradient-to-b blur-[6rem] from-yellow-600 to-sky-500"></div>
      </div>

      {/* Content container */}
      <div className="relative z-10">
        {/* Twinkling Stars */}
        <TwinklingStars />

        {/* Hero Section */}
        <HeroSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )

}

