import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import ThreadsIcon from "../Icons/ThreadsIcon";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface NavbarProps {
  data: {
    brand: string;
    links: { name: string; href: string }[];
  };
}

const Footer: React.FC<NavbarProps> = ({ data }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (href: string) => {
    const targetId = href.startsWith("#") ? href.substring(1) : null;

    if (location.pathname !== "/" && targetId) {
      // If the user is not on the homepage, navigate to the homepage and scroll to the section
      navigate(`/${href}`);
    } else if (targetId) {
      // If the user is already on the homepage, smooth scroll to the section
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="overflow-hidden py-15 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center py-10 sm:flex-row sm:justify-between">
          <img
            alt=""
            src={`/default-logo.svg`}
            className="flex h-10 mb-10 sm:mb-0"
          />
          <nav
            className="-my-1 flex text-2sm sm:text-sm"
            aria-label="quick links"
          >
            <div className="-my-1 justify-center text-gray-600 hover:text-primary gap-x-12 gap-y-6 md:gap-x-10 grid grid-cols-3 sm:grid-cols-6">
              {data.links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-sm py-2 font-heading leading-6 text-gray-900 hover:text-theme-royalBlue"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </nav>
        </div>
        <div className="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between">
          <div className="flex gap-x-6 mb-5 sm:mb-0">
            <a
              href="https://www.facebook.com/cortanatechsolutions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl"
            >
              <FontAwesomeIcon
                icon={faFacebook}
                className="hover:text-blue-500"
              />
            </a>
            <a
              href="https://www.instagram.com/cortanatechsolutions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                className="hover:text-pink-500"
              />
            </a>
            <a
              href="https://www.linkedin.com/company/cortanatech-solutions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl"
            >
              <FontAwesomeIcon
                icon={faLinkedin}
                className="hover:text-blue-700"
              />
            </a>
            <a
              href="https://www.threads.net/@cortanatechsolutions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl"
            >
              <ThreadsIcon className="w-6 h-6 hover:text-gray-400" />
            </a>
          </div>
          <p className="flex gap-x-6 mb-5 sm:mb-0 text-sm">
            <span className="text-gray-500">2024 © </span>
            <a
              className="text-gray-600 hover:text-primary"
              href="https://cortanatechsolutions.com/"
            >
              Cortanatech Solutions, Inc.
            </a>
            <span className="text-gray-500"> | </span>
            <Link
              to="/privacyPolicy"
              className="flex gap-x-6 mb-5 sm:mb-0 text-gray-600 hover:text-primary"
            >
              Privacy Policy
            </Link>
            <Link
              to="/termsOfService"
              className="flex gap-x-6 mb-5 sm:mb-0 text-gray-600 hover:text-primary"
            >
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
