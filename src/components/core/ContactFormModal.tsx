import React, { useEffect, useState } from "react";
import Modal from "./modal";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "../../hooks/useForm";
import Toast from "../../core/controls/Toast";
import PolicyModal from "./PolicyModal";

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalForm: React.FC<ModalFormProps> = ({ isOpen, onClose }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const {
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
  } = useForm(onClose);

  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // Reset form values and agreement state when modal is closed
      setFullname("");
      setEmail("");
      setSubject("");
      setMessage("");
      setIsAgreed(false);
    }
  }, [isOpen, setFullname, setEmail, setSubject, setMessage, setIsAgreed]);

  const openPolicyModal = () => setIsPolicyModalOpen(true);
  const closePolicyModal = () => setIsPolicyModalOpen(false);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title=""
        imageSrc={`/images/we-want-to-hear-from-you.jpg`}
      >
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Hello there, We want to hear from you!
        </h1>
        <p className="py-5 text-gray-600">
          Do you want to find out more about our services or just say hello?
          Send us a message below. Let’s connect!
        </p>

        <form
          className="space-y-4"
          onSubmit={(e) => handleSubmit(e, executeRecaptcha)}
        >
          <input
            type="text"
            name="fullname"
            id="fullname"
            autoComplete="fullname"
            className="input"
            placeholder="Your Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            className={`input ${emailError ? "border-red-500" : ""}`}
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            name="subject"
            id="subject"
            autoComplete="subject"
            className="input"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <textarea
            className="textarea resize-none"
            placeholder="Message"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          {combinedError && (
            <p className="text-red-500 text-sm">{combinedError}</p>
          )}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="agreePolicy"
              checked={isAgreed}
              onChange={() => setIsAgreed(!isAgreed)}
              required
            />
            <label htmlFor="agreePolicy" className="text-sm text-gray-700">
              I agree to the{" "}
              <button
                type="button"
                className="text-theme-blue-500 underline hover:text-theme-royalBlue"
                onClick={openPolicyModal}
              >
                policy statement
              </button>
              .
            </label>
          </div>
          <button
            type="submit"
            disabled={sending}
            className="inline btn btn-primary text-center w-full"
            onClick={() => handleReCaptchaVerify(executeRecaptcha)}
          >
            {sending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </Modal>

      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      <PolicyModal isOpen={isPolicyModalOpen} onClose={closePolicyModal} />
    </>
  );
};

export default ModalForm;
