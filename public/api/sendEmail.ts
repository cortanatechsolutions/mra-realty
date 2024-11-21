import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

interface ContactFormData {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phoneNumber: string;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      firstName,
      lastName,
      company,
      email,
      phoneNumber,
      message,
    }: ContactFormData = req.body;

    const transporter = nodemailer.createTransport({
      host: import.meta.env.EMAIL_SERVER,
      port: Number(import.meta.env.EMAIL_PORT),
      auth: {
        user: import.meta.env.EMAIL_USER,
        pass: import.meta.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Your Name" <${import.meta.env.EMAIL_USER}>`,
      to: "recipient-email@domain.com",
      subject: "New Contact Us Form Submission",
      text: `
        First Name: ${firstName}
        Last Name: ${lastName}
        Company: ${company}
        Email: ${email}
        Phone Number: ${phoneNumber}
        Message: ${message}
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Error sending email", error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
