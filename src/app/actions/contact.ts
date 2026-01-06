'use server';

import nodemailer from "nodemailer";

export async function sendInquiry(formData: FormData) {

  const fullName = formData.get("fullName");
  const company = formData.get("company");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const location = formData.get("location");
  const message = formData.get("message");

  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    // EMAIL TO YOU
    await transporter.sendMail({
      from: `"Website Lead" <${process.env.MAIL_USER}>`,
      to: "shreyashsolutions.sales@gmail.com",
      subject: `New Website Inquiry — ${fullName}`,
      html: `
        <h3>New Inquiry Received</h3>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `
    });

    // CONFIRMATION TO USER
    await transporter.sendMail({
      from: `"Shreyash Solutions" <${process.env.MAIL_USER}>`,
      to: email as string,
      subject: "We received your inquiry",
      html: `
        <p>Dear ${fullName},</p>

        <p>Thank you for contacting <strong>Shreyash Solutions</strong>.</p>

        <p>We have received your message and our team will get back to you shortly.</p>

        <p>Regards,<br/>
        Shreyash Solutions<br/>
        Pune, India</p>
      `
    });

    return { success: true };

  } catch (err) {
    console.error(err);
    return { success: false };
  }
}
