import { useState, useCallback } from "react";
import { sendEmail } from "../services/emailService";
import { EmailModel } from "../models/EmailModel";
import { getToken } from "../api/authApi";
import { logMessage } from "./logger";

export const useForm = (onClose: () => void) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [sending, setSending] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [combinedError, setCombinedError] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const resetForm = () => {
    setFullname("");
    setEmail("");
    setSubject("");
    setMessage("");
    setEmailError("");
    setCombinedError("");
    setIsAgreed(false);
  };

  const handleReCaptchaVerify = useCallback(async (executeRecaptcha: any) => {
    if (!executeRecaptcha) {
      console.error("Execute recaptcha not yet available");
      return;
    }

    try {
      const token = await executeRecaptcha("submit_form");
      setCaptchaToken(token);
    } catch (error) {
      console.error("Error during reCAPTCHA verification:", error);
      setCombinedError(
        "An error occurred while verifying CAPTCHA. Please try again."
      );
    }
  }, []);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    executeRecaptcha: any
  ) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    let errorMessages = "";

    if (!captchaToken) {
      errorMessages += "Click again to complete the CAPTCHA validation. ";
    }

    if (errorMessages) {
      setCombinedError(errorMessages.trim());
      return;
    }

    setCombinedError("");
    setSending(true);

    const emailModel: EmailModel = {
      toEmail: import.meta.env.VITE_REACT_APP_SUPPORT_EMAIL!,
      fromEmail: import.meta.env.VITE_REACT_APP_SUPPORT_EMAIL!,
      subject: "You have received an inquiry from " + fullname,
      body: `
    <html>
    <head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@400;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&family=Urbanist:wght@400;700&display=swap');
        body {
          font-family: 'DM Sans', sans-serif;
          color: #333;
          line-height: 1.6;
        }
        .header {
          background-color: #F1EDED;
          padding: 10px;
          text-align: center;
          color: #2b3990;
          font-family: 'Urbanist', sans-serif;
        }
        .header img {
          max-width: 150px;
          margin-bottom: 10px;
        }
        .header h1 {
          margin: 0;
        }
        .header p {
          margin: 0;
          font-size: 14px;
        }
        h2 {
          color: #454C59;
          margin-top: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        td {
          padding: 8px;
          border: 1px solid #ddd;
        }
        tr:nth-child(even) {
          background-color: #f2f2f2;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <img src="https://cortanatechsolutions.com/default-logo.svg" alt="Cortanatech Solutions Logo">
        <h1>Cortanatech Solutions</h1>
        <p>Your trusted business aid for Digital Innovation</p>
      </div>
      <h2>New Inquiry from <i>cortanatechsolutions.com</i></h2>
      <p>You have received a new inquiry through the website. Below are the details:</p>
      <table>
        <tr>
          <td><strong>Full Name:</strong></td>
          <td>${fullname}</td>
        </tr>
        <tr>
          <td><strong>Email:</strong></td>
          <td>${email}</td>
        </tr>
        <tr>
          <td><strong>Subject:</strong></td>
          <td>${subject}</td>
        </tr>
        <tr>
          <td><strong>Message:</strong></td>
          <td>${message}</td>
        </tr>
      </table>
      <p>Please respond to this inquiry promptly.</p>
      <p>Best regards,<br/>Cortanatech Solutions Team</p>
    </body>
    </html>
  `,
      isHtml: true,
      ccEmails: [],
      bccEmails: [],
      attachments: [],
    };

    try {
      const token = await getToken(
        import.meta.env.VITE_REACT_APP_AUTH_USERNAME!,
        import.meta.env.VITE_REACT_APP_AUTH_PASSWORD!
      );

      if (!token) {
        throw new Error("Token is not defined.");
      }

      await sendEmail(emailModel);
      logMessage("Email sent successfully");
      resetForm();
      onClose();
      setToastMessage("Message sent successfully.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    } catch (error) {
      // Log the error and show a failure message
      logMessage(
        error instanceof Error ? error.message : String(error),
        "error"
      );
      setCombinedError("Failed to send email. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return {
    fullname,
    setFullname,
    email,
    setEmail,
    subject,
    setSubject,
    message,
    setMessage,
    emailError,
    combinedError,
    sending,
    showToast,
    toastMessage,
    handleReCaptchaVerify,
    handleSubmit,
    setShowToast,
    isAgreed,
    setIsAgreed,
  };
};
