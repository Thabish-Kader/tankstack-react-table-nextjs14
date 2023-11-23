"use client";
import React from "react";

type ModalProps = {
  show: boolean;
  onClose: () => void;
  handleBtnOnClick: () => void;
  modalTitle: string;
  children?: React.ReactNode;
};

export const Modal = ({
  show,
  onClose,
  handleBtnOnClick,
  modalTitle,
  children,
}: ModalProps) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-[100] w-screen h-screen backdrop-blur"
      onClick={handleBackdropClick}
    >
      <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-md">
        <div className="flex items-center justify-between px-6 pb-4">
          <h1 className="text-xl leading-8 font-semibold tracking-wide text-gray-400 dark:text-gray-200">
            {modalTitle}
          </h1>
        </div>
        <div className="px-6 pb-4 text-gray-400 dark:text-gray-200">
          {children}
        </div>
        <div className="mt-16 flex flex-row-reverse">
          <button
            onClick={handleBtnOnClick}
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mx-2"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
