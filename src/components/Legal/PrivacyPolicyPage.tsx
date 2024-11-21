// PrivacyPolicyPage.tsx

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PrivacyPolicyContent = () => (
  <div id="policy" className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
    <p>
      <strong>Last Updated:</strong> August 19, 2024
    </p>
    <h3 className="text-xl font-semibold mt-6">1. Introduction</h3>
    <p>
      Welcome to Cortanatech Solutions Inc. ("Company", "we", "our", "us"). We
      are committed to protecting your personal information and ensuring a safe
      experience while using our services. This Privacy Policy explains how we
      collect, use, disclose, and safeguard your information when you use our
      services, including our website [cortanatechsolutions.com] and our
      Facebook integration.
    </p>
    <h3 className="text-xl font-semibold mt-6">2. Our Policy Statement</h3>
    <ul className="list-disc ml-6">
      <li>
        <strong>Data Collection:</strong> We collect personal data to provide
        and improve our services. This includes information you provide
        directly, such as your name and email address, as well as data collected
        automatically through the use of our services.
      </li>
      <li>
        <strong>Data Usage:</strong> The data we collect is used to enhance your
        experience, communicate with you, and analyze usage patterns. We do not
        share your personal data with third parties without your consent.
      </li>
      <li>
        <strong>Data Security:</strong> We implement robust security measures to
        protect your data from unauthorized access or disclosure. However,
        please be aware that no system can be completely secure.
      </li>
      <li>
        <strong>Your Rights:</strong> You have the right to access, update, or
        delete your personal information. If you have any questions or concerns
        regarding your data, please contact us directly.
      </li>
      <li>
        <strong>Changes to This Policy:</strong> We may update this policy from
        time to time. Any changes will be posted on this page, and we encourage
        you to review it periodically.
      </li>
    </ul>
    <h3 className="text-xl font-semibold mt-6">
      3. Additional Information We Collect
    </h3>
    <p>
      <strong>Personal Information:</strong> We may collect personal information
      that you provide to us directly, such as your name, email address, and any
      other information you choose to share with us.
    </p>
    <p>
      <strong>Usage Data:</strong> We may collect information about how you use
      our services, including IP address, browser type, pages viewed, and the
      dates and times of visits.
    </p>
    <p>
      <strong>Facebook Data:</strong> If you interact with our Facebook page or
      use Facebook login, we may collect information from Facebook, including
      your public profile, email address, and any other information you have
      granted us permission to access.
    </p>
    <h3 className="text-xl font-semibold mt-6">
      4. How We Use Your Information
    </h3>
    <p>We use the information we collect to:</p>
    <ul className="list-disc ml-6">
      <li>Provide, maintain, and improve our services.</li>
      <li>
        Communicate with you, including sending updates and promotional
        materials.
      </li>
      <li>
        Analyze usage trends to better understand how our services are used.
      </li>
      <li>Comply with legal obligations and protect our rights.</li>
    </ul>
    <h3 className="text-xl font-semibold mt-6">5. Sharing Your Information</h3>
    <p>
      We do not sell your personal information. We may share your information
      with:
    </p>
    <ul className="list-disc ml-6">
      <li>
        <strong>Service Providers:</strong> We may share information with
        third-party service providers who assist us in operating our services.
      </li>
      <li>
        <strong>Legal Requirements:</strong> We may disclose your information to
        comply with legal obligations or to protect our rights and interests.
      </li>
    </ul>
    <h3 className="text-xl font-semibold mt-6">6. Facebook API Compliance</h3>
    <p>
      If you use Facebook login or interact with our Facebook page, we adhere to
      Facebook's Platform Policy. This includes:
    </p>
    <ul className="list-disc ml-6">
      <li>
        <strong>Data Usage:</strong> We use the data obtained from Facebook in
        compliance with Facebook's Data Use Policy.
      </li>
      <li>
        <strong>User Consent:</strong> We obtain necessary permissions from
        users before accessing their Facebook data.
      </li>
      <li>
        <strong>Data Protection:</strong> We implement appropriate security
        measures to protect Facebook data.
      </li>
    </ul>
    <h3 className="text-xl font-semibold mt-6">7. Data Security</h3>
    <p>
      We use administrative, technical, and physical security measures to help
      protect your personal information. However, no method of transmission over
      the internet or electronic storage is 100% secure.
    </p>
    <h3 className="text-xl font-semibold mt-6">8. Your Rights</h3>
    <p>You have the right to:</p>
    <ul className="list-disc ml-6">
      <li>Access, correct, or delete your personal information.</li>
      <li>Opt-out of receiving marketing communications from us.</li>
      <li>Withdraw consent for processing your personal data.</li>
    </ul>
    <p>
      To exercise these rights, please contact us at
      customers@cortanatechsolutions.com.
    </p>
    <h3 className="text-xl font-semibold mt-6">
      9. Changes to This Privacy Policy
    </h3>
    <p>
      We may update this Privacy Policy from time to time. We will notify you of
      any changes by posting the new Privacy Policy on our website. You are
      advised to review this Privacy Policy periodically for any changes.
    </p>
    <h3 className="text-xl font-semibold mt-6">10. Contact Us</h3>
    <p>
      If you have any questions or concerns about this Privacy Policy, please
      contact us at: customers@cortanatechsolutions.com
    </p>
  </div>
);

export default function PrivacyPolicyPage() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <section className="max-w-4xl mx-auto my-8 p-4">
      <PrivacyPolicyContent />
    </section>
  );
}
