'use server';

import nodemailer from "nodemailer";
import path from "path";

export async function sendInquiry(formData: FormData) {
  const fullName = formData.get("fullName");
  const company = formData.get("company");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const location = formData.get("location");
  const message = formData.get("message");

  // Path to your logo for embedding
  const logoPath = path.join(process.cwd(), "public", "logo.png");

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    // 1. EMAIL TO YOU (Lead Data)
    await transporter.sendMail({
      from: `"Website System" <${process.env.MAIL_USER}>`,
      to: "shreyashsolutions.sales@gmail.com",
      subject: `New Technical Lead: ${company}`,
      replyTo: email as string,
      html: `
        <div style="font-family: Arial, sans-serif; color: #334155; max-width: 600px; border: 1px solid #e2e8f0; padding: 24px; border-radius: 8px;">
          <h2 style="color: #0870b8; margin-top: 0;">New Project Inquiry</h2>
          <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 20px 0;" />
          <p><strong>Client Name:</strong> ${fullName}</p>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Location:</strong> ${location}</p>
          <div style="background: #f8fafc; padding: 16px; border-radius: 6px; margin-top: 20px;">
            <strong>Requirement:</strong><br/>${message}
          </div>
        </div>
      `
    });

    // 2. PROFESSIONAL CONFIRMATION TO USER (Non-blocking)
    try {
      await transporter.sendMail({
        from: `"Shreyash Solutions" <${process.env.MAIL_USER}>`,
        to: email as string,
        subject: "Inquiry Received | Shreyash Solutions",
        attachments: [{
          filename: 'logo.png',
          path: logoPath,
          cid: 'companylogo' // CID matches the src in the HTML below
        }],
        html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; line-height: 1.6;">
        <div style="padding: 40px 20px; text-align: center; background-color: #ffffff;">
          
          <img src="cid:companylogo" alt="Shreyash Solutions" style="width: 180px; height: auto; margin-bottom: 30px;" />
  
          <h1 style="font-size: 22px; font-weight: 900; color: #0f172a; margin-bottom: 10px;">
            Thank you for contacting us
          </h1>
  
          <p style="color: #64748b; font-size: 16px; margin-bottom: 30px;">
            We’ve received your message and will get back to you shortly.
          </p>
  
          <div style="text-align: left; background-color: #fcfcfd; border: 1px solid #f1f5f9; padding: 26px; border-radius: 12px;">
            <p style="margin-top: 0;">Hi <strong>${fullName}</strong>,</p>
  
            <p>
              Thank you for reaching out to <strong>Shreyash Solutions</strong>.
              Our team has received your enquiry and we’ll review the details you shared.
            </p>
  
            <p>
              We usually respond within the next working day.
            </p>
          </div>
  
          <div style="margin-top: 30px; text-align: left;">
            <p style="font-size: 14px; margin-bottom: 4px; font-weight: bold; color: #0f172a;">
              Shreyash Solutions
              <i>Empowering Innovation Through Sensor Technology</i>
            </p>
            <p style="font-size: 12px; color: #94a3b8; margin: 0;">
              Pune, Maharashtra, India
            </p>
          </div>
  
          <div style="margin-top: 24px; font-size: 11px; color: #cbd5e1;">
            This is an automated confirmation email. Please do not reply directly.
          </div>
        </div>
      </div>
    `
      });
    } catch (confirmError) {
      console.error("User confirmation email failed to send (likely logo path issue), but lead was delivered:", confirmError);
    }

    return { success: true };

  } catch (err) {
    console.error("Main Mail Error (Lead didn't send):", err);
    return { success: false };
  }
}
