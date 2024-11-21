// src/services/emailService.ts
import axios from "axios";
import { EmailModel } from "../models/EmailModel"; // Ensure this import path is correct

const API_URL = import.meta.env.VITE_REACT_APP_EMAIL_API_URL; // Base URL for your email service

export const sendEmail = async (email: EmailModel): Promise<void> => {
  try {
    // Create FormData object to handle file uploads and other fields
    const formData = new FormData();
    formData.append("toEmail", email.toEmail);
    if (email.fromEmail) formData.append("fromEmail", email.fromEmail);
    formData.append("subject", email.subject);
    formData.append("body", email.body);
    if (email.isHtml !== undefined)
      formData.append("isHtml", String(email.isHtml));
    if (email.ccEmails)
      formData.append("ccEmails", JSON.stringify(email.ccEmails));
    if (email.bccEmails)
      formData.append("bccEmails", JSON.stringify(email.bccEmails));

    // Attach files
    if (email.attachments) {
      email.attachments.forEach((attachment) => {
        formData.append(
          "attachments",
          new Blob([attachment.content], { type: "application/octet-stream" }),
          attachment.fileName
        );
      });
    }

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found.");
    }

    await axios.post(`${API_URL}/send`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "https://cortanatechsolutions.com",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-Requested-With, Origin, Accept",
      },
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle AxiosError specifically
      const message = error.response?.data?.message || error.message;
      throw new Error(`Error sending email: ${message}`);
    } else if (error instanceof Error) {
      // Handle generic Error
      throw new Error(`Error sending email: ${error.message}`);
    } else {
      // Handle unknown error types
      throw new Error("An unknown error occurred while sending the email.");
    }
  }
};
