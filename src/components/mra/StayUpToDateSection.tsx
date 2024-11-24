import React, { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const StayUpToDate: React.FC = () => {
  const [viberNumber, setViberNumber] = useState('');
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setViberNumber(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!executeRecaptcha) {
      console.error('reCAPTCHA not loaded');
      return;
    }

    // Execute reCAPTCHA and get the token
    const token = await executeRecaptcha('submit');

    // Handle the form submission logic here (e.g., send viber number and token to an API)
    console.log('Viber number submitted:', viberNumber);
    console.log('reCAPTCHA token:', token);

    // Example: Send the number and token to your backend API
    // await submitViberNumber(viberNumber, token);
  };

  const handleInvalid = (e: React.FormEvent) => {
    const input = e.target as HTMLInputElement;
    if (input.validity.patternMismatch) {
      input.setCustomValidity("Please enter a valid phone number with 10 digits after +63.");
    } else {
      input.setCustomValidity("");
    }
  };

  return (
    <section id="ContactUs" className="bg-white py-52 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <div className="p-4 inline-block mb-6">
          <img src={`/images/stayuptodate.svg`} alt="Ramaland" className="h-20" />
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
            />
            <button className="btn btn-icon">
              <i className="ki-solid ki-paper-plane"></i>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default StayUpToDate;