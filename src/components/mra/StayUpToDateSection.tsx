import React, { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { sendEmail } from '../../services/emailService';
import { EmailModel } from '../../models/EmailModel';
import { logMessage } from '../../hooks/logger';
import { useSiteSettings } from '../../utils/SiteSettingsContext';
import { getToken } from '../../api/authApi';

const StayUpToDate: React.FC = () => {
  const { settings, getSetting } = useSiteSettings();
  const [viberNumber, setViberNumber] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setViberNumber(e.target.value);
  };

  const handleInvalid = (e: React.FormEvent) => {
    const input = e.target as HTMLInputElement;
    if (input.validity.patternMismatch) {
      input.setCustomValidity('Please enter a valid phone number with 10 digits after +63.');
    } else {
      input.setCustomValidity('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!executeRecaptcha) {
      setError('reCAPTCHA is not loaded. Please try again later.');
      return;
    }

    try {
      // Execute reCAPTCHA
      const token = await executeRecaptcha('submit');
      const toEmail = getSetting("Email");
      const fromEmail = import.meta.env.VITE_REACT_APP_SUPPORT_EMAIL;

      // Create the email model
      const emailModel: EmailModel = {
        toEmail: toEmail, // Replace with the owner's email
        fromEmail: fromEmail, // Replace with a valid from-email
        subject: 'New Viber Subscription',
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
        <img src="https://mra-realty.com/mrarealty-default-logo.png" alt="MRA Realty Logo">
        <h1>MRA Realty</h1>
        <p>Your Gateway for New Beginners</p>
      </div>
      <h2>New Subscription from <i>mra-realty.com</i></h2>
      <p>You have received a new subscription request.. Below are the details:</p>
      <table>
        <tr>
          <td><strong>Viber Number:</strong></td>
          <td>+63${viberNumber}</td>
        </tr>
      </table>
      <p>Please record this manually as requested.</p>
      <p>Best regards,<br/>Cortanatech Solutions Team</p>
    </body>
    </html>`,
        isHtml: true,
        ccEmails: [],
        bccEmails: [],
        attachments: [],
      };

      //ensure user has valid token
      const authToken = localStorage.getItem("token");
      if (!authToken) {
        await getToken(
          import.meta.env.VITE_REACT_APP_AUTH_USERNAME!,
          import.meta.env.VITE_REACT_APP_AUTH_PASSWORD!
        );
      }      

      setSending(true);

      // Send the email
      await sendEmail(emailModel);

      logMessage('Viber subscription email sent successfully.');
      setSuccessMessage('Thank you for subscribing! You will receive updates via Viber.');
      setViberNumber('');
    } catch (error) {
      logMessage(
        error instanceof Error ? error.message : String(error),
        'error'
      );
      setError('Failed to send your subscription request. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="ContactUs" className="bg-white py-52 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <div className="p-4 inline-block mb-6">
          <img src={`/images/stayuptodate.svg`} alt="Stay Up to Date" className="h-20" />
        </div>
        <h2 className="text-3xl font-regular text-gray-900 mb-4">Stay Up to Date</h2>
        <p className="text-sm text-gray-700 mb-8">
          Subscribe to Viber to receive regular updates of listings.
        </p>
        <form onSubmit={handleSubmit} className="flex justify-center items-center">
          <div className="input input-lg">
            <span className="btn btn-input">+63</span>
            <input
              type="tel"
              value={viberNumber}
              onInvalid={handleInvalid}
              onChange={handleInputChange}
              placeholder="Your viber number"
              className="border-none focus:outline-none focus:ring-0"
              pattern="^[0-9]{10}$"
              required
              disabled={sending}
            />
            <button className="btn btn-icon" type="submit" disabled={sending}>
              <i className="ki-solid ki-paper-plane"></i>
            </button>
          </div>
        </form>
        {error && <p className="text-red-600 mt-4">{error}</p>}
        {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
      </div>
    </section>
  );
};

export default StayUpToDate;
