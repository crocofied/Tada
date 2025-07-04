"use client";

import { useEffect } from "react";

type SuccessToastProps = {
  message: string;
  show: boolean;
  onClose: () => void;
};

export default function SuccessToast({ message, show, onClose }: SuccessToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="toast toast-end">
      <div className="alert alert-success alert-soft">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <span className="font-bold">SUCCESS: </span>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
}