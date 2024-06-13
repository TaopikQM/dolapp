import React from 'react';

const Popup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg relative">
        <button onClick={onClose} className="absolute top-0 right-0 p-2">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
