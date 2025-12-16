"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmailReply(
  userEmail: string,
  userName: string,
  replyMessage: string,
  originalMessage: string
) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Exclusive Support <onboarding@resend.dev>",
      to: [userEmail],
      subject: "Response Regarding Your Inquiry - Exclusive Store",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f3f4f6; margin: 0; padding: 20px;">
          
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
            
            <div style="background-color: #000; color: #fff; padding: 24px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: bold;">Exclusive</h1>
            </div>

            <div dir="ltr" style="padding: 24px; color: #1f2937; text-align: left;">
              
              <h2 style="color: #111827; margin-top: 0;">Hello ${userName},</h2>
              
              <p style="margin-bottom: 16px; line-height: 1.6;">
                Thank you for contacting the <strong>Exclusive</strong> support team.
                We have reviewed your message, and here is our response:
              </p>
              
              <div style="background-color: #f9fafb; border-left: 4px solid #000; padding: 16px; border-radius: 4px; margin: 24px 0;">
                <strong style="display: block; margin-bottom: 8px; color: #000;">Support Reply:</strong>
                <span style="white-space: pre-wrap; color: #374151; line-height: 1.6;">${replyMessage}</span>
              </div>

              <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
              
              <div style="font-size: 14px; color: #6b7280;">
                <p style="margin-bottom: 8px;">Your original message:</p>
                <blockquote style="background-color: #fff; border: 1px solid #e5e7eb; border-left: 4px solid #d1d5db; padding: 12px; margin: 0; color: #4b5563;">
                  ${originalMessage}
                </blockquote>
              </div>

            </div>

            <div style="background-color: #f9fafb; padding: 24px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0;">&copy; ${new Date().getFullYear()} Exclusive Store. All rights reserved.</p>
            </div>

          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Server Error:", error);
    return { success: false, error: "Failed to send email" };
  }
}
