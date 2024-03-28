import { Toast } from "flowbite-react";
import React, { useEffect } from "react";
import { HiCheck, HiX } from "react-icons/hi";

interface Props {
  show: boolean;
  type: boolean;
  message: string;
  onClose: () => void;
}

const ToastComponent: React.FC<Props> = ({ show, type, message, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <>
      {show && (
        <div className="fixed top-4 right-4 z-50">
          <Toast>
            <div
              className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                type
                  ? "bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200"
                  : "bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200"
              }`}
            >
              {type ? (
                <HiCheck className="h-5 w-5" />
              ) : (
                <HiX className="h-5 w-5" />
              )}
            </div>
            <div className="ml-3 text-sm font-normal">{message}</div>
            <Toast.Toggle onDismiss={onClose} />
          </Toast>
        </div>
      )}
    </>
  );
};

export default ToastComponent;
