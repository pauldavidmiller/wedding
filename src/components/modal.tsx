import React from "react";

interface ModalProps {
  title: string;
  children?: any;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, children, isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render if modal is closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        {children}
        <button
          onClick={onClose}
          className="bg-pink-400 text-white px-4 py-2 rounded hover:bg-pink-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
