import React from 'react';

const Modal = ({ show, title, message, onClose, onConfirm }) => {
  if (!show) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-gray-300 text-black p-2 mr-2 rounded">Cancel</button>
          <button onClick={onConfirm} className="bg-blue-500 text-white p-2 rounded">Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
