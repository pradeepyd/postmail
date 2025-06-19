import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  position: z.string().min(1, "Position is required"),
  aboutYourself: z.string().min(10, "Please provide more details about yourself"),
  emailReason: z.string().min(10, "Please provide a reason for sending this email"),
  recipient:z.string().optional(),
  recipientEmail: z.string().email("Valid recipient email is required"),
  aboutRecipient: z.string().optional(),
  additionalLinks: z.string().optional(),
  calcom:z.string().optional()
});
