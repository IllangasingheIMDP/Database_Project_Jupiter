import React, { useEffect } from 'react';
import './CustomAlert.css'; // Import your custom styles

const CustomAlert = ({ message, onClose }) => {
  useEffect(() => {
      // Check if the message does NOT include 'failed' or 'error'
      if (!message.toLowerCase().includes('failed') && !message.toLowerCase().includes('error')) {
          const timer = setTimeout(() => {
              onClose();
          }, 3000); // Auto-close after 3 seconds

          return () => clearTimeout(timer);
      }
  }, [message, onClose]);

  // Determine the alert style based on message content
  const alertStyle = message.toLowerCase().includes('failed') || message.toLowerCase().includes('error') || message.toLowerCase().includes('invalid')
      ? { backgroundColor: 'red', color: 'white' } // Error styles
      : { backgroundColor: 'green', color: 'white' }; // Success styles

  return (
      <div className="custom-alert" style={alertStyle}>
          {message}
          <button className="custom-alert-close" onClick={onClose}>
          &times;
        </button>
      </div>
  );
};

export default CustomAlert;
