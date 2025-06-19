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
  attachedFile: File,
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
   - No generic phrases like “Quick question”.
   - Personal if possible (e.g. “frontend help”).

📎 **Instructions for the email:**
1. Include a short and effective subject line.
2. Start with a greeting. Use recipient's name if given.
3. Use 1–2 personalized opening lines or introduction based on the sender's position or background.
4. Smoothly transition to the sender’s value prop and how it might help.and what is the purpose of email
5. Add a polite call-to-action. If scheduling link is available, include it.
6. If an attached file exists, mention it like: "I've attached my resume for your reference."
7. include closing lines like "Best regards", name, or links.

---
**Important Rules:**
- Never include filler like "[mention something specific]". If no info is available, generalize professionally.
- Output ONLY valid JSON: {"subject": "...", "body": "..."}
- Don't use backticks, markdown, or code blocks.
- Be polite the starting should be sender introduction
- at last include about attachedfile if it is present
- If a resume is attached, include a brief, polite sentence that points it out. Example: "I’ve attached my resume   below for your reference."

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
  } catch (err:any) {
    return {
      subject: "Error parsing Gemini output",
      body: `Error occurred while generating email. Please try again later.\n\nDetails:\n${err.message || err}`,
    };
  }
}



export async function askGemini(prompt: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const result = await model.generateContent(prompt);
  const response = await result.response.text();

  return response;
}