"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";

export const EmailExampleCard = () => {
  return (
    <Card className="bg-gray-950 text-white border border-gray-800 shadow-lg max-w-2xl mx-auto rounded-xl">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center space-x-2">
          <Mail className="h-5 w-5 text-purple-400" />
          <h2 className="text-lg font-semibold">
             Subject: Frontend Developer Role at xyz.com
          </h2>
        </div>

        <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray-300 font-mono">
{`Hi Stark,

I'm Peter Parker, a full-stack developer with 5 years of experience working with the MERN stack and system design. I’ve been following xyz.com's work and was excited to see the opening for a Frontend Developer.

In my previous projects, I’ve built end-to-end applications focused on performance and user experience. I’d love the opportunity to contribute to your frontend initiatives and help improve usability, scalability, and overall experience for your users.

Would you be open to a quick conversation to explore how I can support your goals?

I've attached my resume for your reference and would be happy to share more about my work.

Best regards,  
Pradeep Yadav  
🔗 LinkedIn Profile`}
        </div>
      </CardContent>
    </Card>
  );
};
