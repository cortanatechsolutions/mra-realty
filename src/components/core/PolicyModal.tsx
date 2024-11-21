import React from "react";
import Modal from "./modal"; // Adjust the path if necessary

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Policy Statement"
      width="w-[90%] max-w-4xl"
      height="h-[80%]"
    >
      <div className="p-1">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Our Policy Statement
        </h1>
        <div className="scrollable-y max-h-[calc(100vh-20rem)]">
          <p className="text-gray-700 mb-4">
            Welcome to our policy statement page. We are committed to protecting
            your privacy and ensuring a safe experience while using our
            services. This policy outlines how we collect, use, and safeguard
            your personal information.
          </p>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            1. Data Collection
          </h2>
          <p className="text-gray-700 mb-4">
            We collect personal data to provide and improve our services. This
            includes information you provide directly, such as your name and
            email address, as well as data collected automatically through the
            use of our services.
          </p>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            2. Data Usage
          </h2>
          <p className="text-gray-700 mb-4">
            The data we collect is used to enhance your experience, communicate
            with you, and analyze usage patterns. We do not share your personal
            data with third parties without your consent.
          </p>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            3. Data Security
          </h2>
          <p className="text-gray-700 mb-4">
            We implement robust security measures to protect your data from
            unauthorized access or disclosure. However, please be aware that no
            system can be completely secure.
          </p>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            4. Your Rights
          </h2>
          <p className="text-gray-700 mb-4">
            You have the right to access, update, or delete your personal
            information. If you have any questions or concerns regarding your
            data, please contact us directly.
          </p>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            5. Changes to This Policy
          </h2>
          <p className="text-gray-700 mb-4">
            We may update this policy from time to time. Any changes will be
            posted on this page, and we encourage you to review it periodically.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default PolicyModal;
