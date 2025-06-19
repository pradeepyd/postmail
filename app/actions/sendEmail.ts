"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  from,
  to,
  subject,
  html,
}: {
    from:string;
  to: string;
  subject: string;
  html: string;
}) {
  try {
    const data = await resend.emails.send({
      from, 
      to,
      subject,
      html,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error };
  }
}
