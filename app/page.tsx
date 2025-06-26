import FAQSection from "@/components/FAQsection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import TwinklingStars from "@/components/TwinklingStars";

export default function HomePage() {
  return (
    <div className="w-full h-full bg-black m-0 p-0">
      {/* Full screen background */}
      <div className="fixed inset-0 bg-black">
        <div className="absolute -right-40 -top-10 w-full h-full">
          <div className="h-[30rem] rounded-full w-[60rem] bg-gradient-to-b blur-[6rem] from-purple-600/30 to-sky-600/30"></div>
          <div className="h-[20rem] rounded-full w-[90rem] bg-gradient-to-b blur-[6rem] from-pink-900/30 to-yellow-400/30 -mt-10"></div>
          <div className="h-[10rem] rounded-full w-[60rem] bg-gradient-to-b blur-[6rem] from-yellow-600/30 to-sky-500/30 -mt-10"></div>
        </div>
      </div>

      {/* Content - remove all margins */}
      <div className="relative z-10 w-full">
        <div className="w-full m-0 p-0">
          <TwinklingStars />
        </div>
        <div className="w-full m-0 p-0">
          <HeroSection />
        </div>
        <div className="w-full m-0 p-0">
          <FAQSection />
        </div>
        <div className="w-full m-0 p-0">
          <Footer />
        </div>
      </div>
    </div>
  )
}
