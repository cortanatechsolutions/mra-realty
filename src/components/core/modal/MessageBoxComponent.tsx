import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

export type MessageBoxType =
  | "info"
  | "warning"
  | "error"
  | "success"
  | "confirmation"
  | "question";

interface MessageBoxProps {
  type: MessageBoxType;
  title: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const icons = {
  info: {
    icon: <InformationCircleIcon className="h-6 w-6 text-blue-600" />,
    bgColor: "bg-blue-100",
  },
  warning: {
    icon: <ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" />,
    bgColor: "bg-yellow-100",
  },
  error: {
    icon: <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />,
    bgColor: "bg-red-100",
  },
  success: {
    icon: <CheckCircleIcon className="h-6 w-6 text-green-600" />,
    bgColor: "bg-green-100",
  },
  confirmation: {
    icon: <QuestionMarkCircleIcon className="h-6 w-6 text-gray-600" />,
    bgColor: "bg-gray-100",
  },
  question: {
    icon: <QuestionMarkCircleIcon className="h-6 w-6 text-purple-600" />,
    bgColor: "bg-purple-100",
  },
};

const buttonMap = {
  info: { confirm: "OK", cancel: "" },
  warning: { confirm: "Proceed", cancel: "Cancel" },
  error: { confirm: "Retry", cancel: "Cancel" },
  success: { confirm: "Great!", cancel: "" },
  confirmation: { confirm: "Yes", cancel: "No" },
  question: { confirm: "Yes", cancel: "No" },
};

export default function MessageBoxComponent({
  type,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
}: MessageBoxProps) {
  return (
    <Dialog open={true} onClose={() => onCancel} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div
                  className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${icons[type].bgColor} sm:mx-0 sm:h-10 sm:w-10`}
                >
                  {icons[type].icon}
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    {title}
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{message}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              {buttonMap[type].confirm && (
                <button
                  type="button"
                  onClick={() => {
                    onConfirm?.();
                    // Optionally close the dialog here if needed
                  }}
                  className="btn btn-primary inline-flex w-full justify-center px-3 py-2 text-sm text-white shadow-sm sm:ml-3 sm:w-auto"
                >
                  {confirmText || buttonMap[type].confirm}
                </button>
              )}
              {buttonMap[type].cancel && (
                <button
                  type="button"
                  data-autofocus
                  onClick={() => {
                    onCancel?.();
                    // Optionally close the dialog here if needed
                  }}
                  className="btn btn-secondary mt-3 inline-flex w-full justify-center bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  {cancelText || buttonMap[type].cancel}
                </button>
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
