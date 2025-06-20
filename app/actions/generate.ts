// /app/actions/generate.ts
'use server';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateEmail({
  name,
  email,
  position,
  aboutYourself,
  recipient,
  recipientEmail,
  aboutRecipient,
  reason,
  additionalLinks,
  calcom,
  attachedFile,

}: {
  name: string;
  email: string;
  position: string;
  aboutYourself: string;
  recipient?: string;
  recipientEmail: string;
  aboutRecipient: string;
  reason: string;
  additionalLinks?: string;
  calcom?: string;
  attachedFile?: File | null 
}) {


const prompt = `
You are "Grove," a world-class cold email strategist. Your task is to write a highly professional, concise, and personalized cold email that feels human and compels a response.

**Return ONLY a valid raw JSON object with two fields: "subject" and "body". No explanations, no formatting, no markdown.**

---

📌 **IMPORTANT OUTPUT INSTRUCTION — READ CAREFULLY:**
Return a valid, raw JSON object ONLY, like:
{"subject": "frontend role", "body": "Hi John,\\n\\nI saw your post about...\\n\\nWould you be open to..."}
⚠️ DO NOT include \`\`\`json, any markdown code blocks, extra text, or explanations. Only output the JSON object. Nothing else.

---

✉️ **SENDER'S PROFILE:**
- Name: ${name}
- Email: ${email}
- Title: ${position}
- Company: Not provided (individual)
- About: ${aboutYourself || 'Not provided'}
- Scheduling link: ${calcom || 'Not provided'}
- Additional Links (LinkedIn, portfolio, etc): ${additionalLinks || 'Not provided'}
- Attached File: ${attachedFile ? `Yes – ${attachedFile.name}` : "None"}
- Reason for the Email: "${reason}"
---

👤 **RECIPIENT DETAILS:**
- Name: ${recipient || 'Not provided'}
- Email: ${recipientEmail}
- About Recipient (for personalization): ${aboutRecipient || "No specific context provided. You may infer from role and goal."}

---
  **Instruction for email subject:**
1. **"subject":**
   - Short, clear, and relevant (max 8 words).
   - Clear and relevant to the job (e.g., "Frontend Developer Role at xyz.com")
   - No generic phrases like “Quick question”.
   - Personal if possible (e.g. “frontend help”).

📎 **Instructions for the email:**
2. **Greeting:** Use recipient’s name if available.

3. **Introduction:** 1–2 lines introducing the sender, experience, and background.

4. **Value:** 1–2 lines on how the sender can add value to the company/team.

5. **Call to Action:** Ask politely if they are open to a quick chat or further discussion if scheduling link or    calcom link is available 
6. If an attached file exists, mention it like: "I've attached my resume for your reference."
7. include closing lines like "Best regards", name, or links.

---
**Important Rules:**
- Never include filler like "[mention something specific]". If no info is available, generalize professionally.
- Output ONLY valid JSON: {"subject": "...", "body": "..."}
- Don't use backticks, markdown, or code blocks.
- Be polite the starting should be sender introduction
- at last include about attachedfile if it is present
- Be friendly, professional, and confident
- Include newline characters (\\n) where needed
- If a resume is attached, include a brief, polite sentence that points it out. Example: "I’ve attached my resume   below for your reference."
- Never include filler or placeholders like “[mention something]”. Always replace or remove them. If context is missing, rephrase or generalize it professionally.

🎯 Your job is to generate the perfect cold email. Keep it crisp, human, and compelling.
Generate the JSON now.
`;
  
    try {
    const output = await askGemini(prompt);
    const cleanedOutput = output
    .replace(/^```json/, "")
    .replace(/^```/, "")
    .replace(/```$/, "")
    .trim();
    return JSON.parse(cleanedOutput); // Ensure Gemini returns valid JSON
  } catch (err:unknown) {
    return {
      subject: "Error parsing Gemini output",
      body: `Error occurred while generating email. Please try again later.\n\nDetails:\n${err}}`,
    };
  }
}



export async function askGemini(prompt: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const result = await model.generateContent(prompt);
  const response = await result.response.text();

  return response;
}