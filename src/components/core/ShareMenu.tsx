import React from "react";
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ShareMenuProps {
  postUrl: string;
  onClose: () => void;
}

const ShareMenu: React.FC<ShareMenuProps> = ({ postUrl, onClose }) => {
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      postUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      postUrl
    )}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      postUrl
    )}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(postUrl)}`,
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
      <div className="p-2">
        {/* Facebook Share */}
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faFacebookF} className="h-5 w-5 mr-2" />
          <span>Facebook</span>
        </a>
        {/* Twitter Share */}
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2 text-blue-400 dark:text-blue-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faTwitter} className="h-5 w-5 mr-2" />
          <span>Twitter</span>
        </a>
        {/* LinkedIn Share */}
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2 text-blue-700 dark:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faLinkedinIn} className="h-5 w-5 mr-2" />
          <span>LinkedIn</span>
        </a>
        {/* WhatsApp Share */}
        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2 text-green-500 dark:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faWhatsapp} className="h-5 w-5 mr-2" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

export default ShareMenu;
