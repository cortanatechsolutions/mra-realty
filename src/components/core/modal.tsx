import { XMarkIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useRef } from "react";
import FocusLock from "react-focus-lock";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
  height?: string;
  imageSrc?: string;
  overlayClassName?: string; // Custom overlay styles
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  width = "w-full max-w-lg",
  height = "h-auto",
  imageSrc,
  overlayClassName = "bg-black bg-opacity-50",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose();
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "auto";
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${overlayClassName}`}
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <FocusLock>
        <div className="flex bg-white rounded-lg shadow-lg transform transition-all scale-95 animate-fade-in">
          <div
            ref={modalRef}
            tabIndex={-1}
            className={`flex-1 p-6 ${width} ${height} min-w-[300px] min-h-[200px] rounded-lg`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 id="modal-title" className="text-xl font-semibold">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close"
              >
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div>{children}</div>
          </div>
          {imageSrc && (
            <img
              alt="modal"
              src={imageSrc}
              className="hidden lg:block rounded-r-lg shadow-lg max-h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          )}
        </div>
      </FocusLock>
    </div>
  );
};

export default Modal;