"use client"
import { Eye, Sparkles } from "lucide-react"
import { MotionDiv } from "./motionDiv"
import { useRouter } from "next/navigation"


export const CTAbutton = () => {
    const router = useRouter();
    const handleClick = () => {
        router.push("/generateEmail")
    }
    const showPreview = () => {
        router.push("/preview")
    }
    return (
                <MotionDiv 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="mt-16 mb-20 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
                >
                  <button onClick={handleClick} className="h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 text-base font-medium text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center space-x-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Start Generating Emails</span>
                  </button>
                  <button 
                    onClick={showPreview}
                    className="h-12 rounded-full border border-gray-600 px-8 text-base font-medium text-white hover:bg-white/10 transition-colors flex items-center space-x-2"
                  >
                    <Eye className="h-4 w-4" />
                    <span>See Preview</span>
                  </button>
                </MotionDiv>
    )
}