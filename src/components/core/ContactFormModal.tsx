import React, { useEffect, useState } from "react";
import Modal from "./modal";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "../../hooks/useForm";
import Toast from "../../core/controls/Toast";
import PolicyModal from "./PolicyModal";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Reset form values and set ready state
      setFullname("");
      setEmail("");
      setSubject("");
      setMessage("");
      setIsAgreed(false);
      setTimeout(() => setIsReady(true), 500); // Simulate loading time
    } else {
      setIsReady(false);
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
        imageSrc={`/images/formcover.svg`}
      >
        {isReady ? (
          <>
            <h1 className="text-xl font-normal tracking-tight text-gray-900 sm:text-4xl">
              Connect with Us!
            </h1>
            <p className="py-3 font-sm text-gray-600">
              Thank you for reaching out! We’ve received your inquiry and will
              review it carefully. Our team will get back to you as soon as
              possible to assist with your real estate needs. Talk soon!
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
                placeholder="Name"
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
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <textarea
                className="textarea resize-none"
                placeholder="Inquiry"
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
          </>
        ) : (
          <div className="space-y-4">
            <Skeleton height={32} width="60%" />
            <Skeleton count={2} />
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton height={100} />
            <Skeleton height={32} width="40%" />
            <Skeleton height={45} />
          </div>
        )}
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
