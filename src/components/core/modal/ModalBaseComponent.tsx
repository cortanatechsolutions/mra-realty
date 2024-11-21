import { XMarkIcon } from "@heroicons/react/20/solid";
import React from "react";

interface IModalBaseProps {
  modalId: string;
  title: string;
  content: React.ReactNode; // Allow any JSX or HTML elements
  modalType?: string; // Optional to customize modal type
  onClose?: () => void; // Callback for closing the modal
  footer?: React.ReactNode; // Optional footer for actions
  additionalClasses?: string; // Additional classes for customization
}

const ModalBaseComponent: React.FC<IModalBaseProps> = ({
  modalId,
  title,
  content,
  modalType,
  onClose,
  footer,
  additionalClasses,
}) => {
  return (
    <div
      className={`modal ${additionalClasses || ""}`}
      data-modal="true"
      id={modalId}
      role="dialog"
      aria-labelledby={`${modalId}-title`}
      aria-describedby={`${modalId}-content`}
    >
      <div className="modal-content max-w-[600px] top-[20%]">
        <div className="modal-header flex justify-between items-center">
          <h3 className="modal-title" id={`${modalId}-title`}>
            {title}
          </h3>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700"
            data-modal-dismiss="true"
            aria-label="Close modal"
            onClick={onClose}
          >
            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="modal-body" id={`${modalId}-content`}>
          {content}
        </div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default ModalBaseComponent;
