import { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when the user scrolls down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
  onClick={scrollToTop}
  className={`fixed bottom-6 left-6 p-3 bg-brand-active text-white rounded-full shadow-lg transition-opacity duration-300 transform hover:scale-110 hover:bg-brand-default ${
    isVisible ? "opacity-100" : "opacity-0"
  }`}
  aria-label="Scroll to top"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 15l7-7 7 7"
    />
  </svg>
</button>

  );
};

export default ScrollToTopButton;
