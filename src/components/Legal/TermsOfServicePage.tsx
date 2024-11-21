// TermsOfServicePage.tsx

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TermsOfServiceContent = () => (
  <div id="terms" className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold mb-4">Terms of Service</h2>
    <p>
      <strong>Last Updated:</strong> August 19, 2024
    </p>
    <h3 className="text-xl font-semibold mt-6">1. Acceptance of Terms</h3>
    <p>
      By accessing or using our services, including our website
      [cortanatechsolutions.com] and our Facebook integration, you agree to be
      bound by these Terms of Service and our Privacy Policy. If you do not
      agree to these terms, please do not use our services.
    </p>
    <h3 className="text-xl font-semibold mt-6">2. Use of Services</h3>
    <p>
      You agree to use our services only for lawful purposes and in accordance
      with these Terms. You are responsible for complying with all applicable
      laws and regulations.
    </p>
    <h3 className="text-xl font-semibold mt-6">3. Account Responsibility</h3>
    <p>
      If you create an account with us, you are responsible for maintaining the
      confidentiality of your account information and for all activities that
      occur under your account.
    </p>
    <h3 className="text-xl font-semibold mt-6">4. Facebook Integration</h3>
    <p>If you use Facebook login or interact with our Facebook page:</p>
    <ul className="list-disc ml-6">
      <li>
        <strong>Compliance:</strong> We comply with Facebook’s Platform Policy
        and Data Use Policy.
      </li>
      <li>
        <strong>Permissions:</strong> You grant us permission to access the
        information you provide through Facebook.
      </li>
    </ul>
    <h3 className="text-xl font-semibold mt-6">5. Intellectual Property</h3>
    <p>
      All content and materials on our services are owned by or licensed to us
      and are protected by intellectual property laws. You may not reproduce,
      distribute, or create derivative works from our content without our
      express written permission.
    </p>
    <h3 className="text-xl font-semibold mt-6">6. Disclaimers</h3>
    <p>
      Our services are provided "as is" and "as available" without any
      warranties of any kind. We do not guarantee that our services will be
      error-free or uninterrupted.
    </p>
    <h3 className="text-xl font-semibold mt-6">7. Limitation of Liability</h3>
    <p>
      To the fullest extent permitted by law, we will not be liable for any
      indirect, incidental, special, consequential, or punitive damages arising
      from your use of our services.
    </p>
    <h3 className="text-xl font-semibold mt-6">8. Termination</h3>
    <p>
      We reserve the right to terminate or suspend your access to our services
      for any reason, including if you breach these Terms of Service.
    </p>
    <h3 className="text-xl font-semibold mt-6">9. Changes to Terms</h3>
    <p>
      We may update these Terms of Service from time to time. Any changes will
      be posted on this page, and your continued use of our services constitutes
      acceptance of the updated terms.
    </p>
    <h3 className="text-xl font-semibold mt-6">10. Contact Us</h3>
    <p>
      If you have any questions or concerns about these Terms of Service, please
      contact us at: customers@cortanatechsolutions.com
    </p>
  </div>
);

export default function TermsOfServicePage() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <section className="max-w-4xl mx-auto my-8 p-4">
      <TermsOfServiceContent />
    </section>
  );
}
