// /app/actions/generate.ts
'use server';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateEmail({
  name,
  role,
  website,
  url,
  recipientContext,
  calcom,
  linkedin,
  aboutYourself,
  recipient,
  company,
  reason,
}: {
  name: string;
  website:string;
  role: string;
  linkedin:string;
  aboutYourself:string;
  recipient: string;
  company: string;
  reason: string;
  calcom:string;
  recipientContext:string;
  url?:string;
}) {
const prompt = `
      You are "Grove," a world-class cold email strategist. Your task is to write a highly professional, concise, and personalized cold email that feels human and compels a response.

      **Output format MUST be a single, raw JSON object with two keys: "subject" and "body". Do NOT add any markdown like \`\`\`json, introductory text, or explanations.**

      ---
      **SENDER'S PROFILE:**
      - Name: ${name}
      - Title: ${role}
      - Company: ${company || 'Not provided (acting as an individual)'}
      - Website: ${website || 'Not provided'}
      - Unique Value Proposition (What they do): ${role}
      - About the sender: ${aboutYourself || 'Not provided'}
      - Scheduling Link (cal.com/calendly): ${calcom || 'Not provided'}
      - LinkedIn: ${linkedin || 'Not provided'}
      ---
      **RECIPIENT INFORMATION:**
      - Name: ${recipient || 'Not provided'}
      - The Goal of this Email: "${reason}"
      - Personalization Context (The key for the opening line): ${recipientContext || "No specific context provided. Infer the recipient's role and potential pain points from the 'Email Goal' to craft a relevant, but slightly more general, opening line."}
      ---
      **CRITICAL INSTRUCTIONS:**

      1.  **Subject Line ("subject"):**
          *   Create a short, intriguing, and professional subject (4-7 words).
          *   Avoid generic subjects like "Quick Question". Make it relevant to the personalization context if possible.
          *   Use lowercase, except for proper nouns. It feels more personal. Example: "your post on scaling engineering teams"

      2.  **Email Body ("body"):**
          *   **Greeting:** Start the 'body' with a greeting. 
              - If a 'recipientName' is provided, use it. Example: "Hi ${recipient},"
              - If no name is provided, use a professional, neutral greeting like "Hi there,".
          *   **Formatting:** Use newline characters (\\n\\n) to create short, easy-to-read paragraphs. The entire body should be a single string in the JSON output.
          *   **Opening Line (1-2 sentences):** This is the MOST important part. Use the "Personalization Context" to write a genuine, specific opening line that shows you've done your research. It should NOT be about you (the sender).
          *   **Bridge & Value Prop (2-3 sentences):** Smoothly transition from your opening line to the sender's value proposition. Connect their achievement/interest to a problem you solve. Frame it as "I saw you did X, which is why I thought you might be interested in Y."
          *   **Call to Action (CTA - 1 sentence):** Create a clear, low-friction CTA.
              - If a scheduling link is available and the goal is a meeting, incorporate it naturally. Example: "Open to exploring this further? You can find a time on my calendar that works for you: ${calcom}"
              - If no link is available, ask a simple, interest-gauging question. Example: "Is improving developer onboarding a priority for you in Q3?"
          *   **Closing:** The 'body' MUST end before the signature. Do NOT include "Best regards,", the sender's name, or any contact info. This will be added by the application.
      ---
      
      Generate the JSON output now.
    `;

  const output = await askGemini(prompt);

  try {
    return JSON.parse(output); // Ensure Gemini returns valid JSON
  } catch (err) {
    return {
      subject: "Error parsing Gemini output",
      email: `<p>Raw response from Gemini:<br/>${output}</p>`,
    };
  }
}



export async function askGemini(prompt: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); 
  const result = await model.generateContent(prompt);
  const response = await result.response.text();

  return response;
}