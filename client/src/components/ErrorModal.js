import React from 'react';
import './ErrorModal.css';

const ErrorModal = ({ open, message, onClose }) => {
  if (!open || !message) return null;
  return (
    <div className="error-modal-backdrop" onClick={onClose}>
      <div className="error-modal" onClick={e => e.stopPropagation()}>
        <button className="error-modal-close" onClick={onClose}>×</button>
        <div className="error-modal-message">{message}</div>
      </div>
    </div>
  );
};

export default ErrorModal; 