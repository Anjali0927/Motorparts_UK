import React from 'react';

const Notification = ({ message, type, onClose }) => {
  if (!message) {
    return null;
  }

  const notificationStyles = {
    success: 'bg-green-500',
    error: 'bg-red-500',
  };

  return (
    <div className={`fixed top-4 right-4 p-4 rounded shadow-lg ${notificationStyles[type]} text-white`}>
      {message}
      <button onClick={onClose} className="ml-4 text-white">x</button>
    </div>
  );
};

export default Notification;
