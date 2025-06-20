"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
type EmailPayload = {
  from: string;
  to: string;
  subject: string;
  html: string;
  attachment?: {
    content: string;
    filename: string;
    contentType: string;
  };
};

export async function sendEmail(data: EmailPayload) {
  try {
    const email = {
      from: data.from,
      to: data.to,
      subject: data.subject,
      html: data.html,
      attachments: data.attachment
        ? [
            {
              content: data.attachment.content,
              filename: data.attachment.filename,
              type: data.attachment.contentType,
              disposition: "attachment",
            },
          ]
        : [],
    }
    const response = await resend.emails.send(email);
    return { success: true, response };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error };
  }
}
