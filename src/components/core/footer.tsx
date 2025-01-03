import React from 'react';
import { useSiteSettings } from '../../utils/SiteSettingsContext';

const Footer: React.FC = () => {
  const { settings, getSetting } = useSiteSettings();
  const emailTo = getSetting("Email");
  const officialFbPage = getSetting("OfficialFBPage");
  const officialViberNumber = getSetting("OfficialContactNumber");
  return (
    <footer className="bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 lg:px-8">
        {/* Copyright Text */}
        <p className="text-sm text-gray-500 text-center md:text-left">
          Copyright © 2024. MRA Realty.
        </p>

        {/* Logo */}
        <div className="my-4 md:my-0">
          <img
            src="/default-logo-light.svg"
            alt="MRA Realty Logo"
            className="h-20 mx-auto md:mx-0"
          />
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a
            href={officialFbPage}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900"
          >
            <img src={`/images/facebook.svg`} alt="Facebook" className="h-4" />
          </a>
          <a
            href={`mailto:${emailTo}`}
            className="text-gray-500 hover:text-gray-900"
          >
            <img src={`/images/email.svg`} alt="Send Email" className="h-4" />
          </a>
          <a
            href={`viber://chat?number=%2B${officialViberNumber}`}
            className="text-gray-500 hover:text-gray-900"
          >
            <img src={`/images/viber.svg`} alt="Viber" className="h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
