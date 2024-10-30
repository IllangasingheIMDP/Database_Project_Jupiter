import React, { useEffect } from 'react';
import './CustomAlert.css'; // Import your custom styles

const CustomAlert = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      // Auto-close after 3 seconds if the message doesn't include 'failed' or 'error'
      if (!message.toLowerCase().includes('failed') && !message.toLowerCase().includes('error')) {
        const timer = setTimeout(() => {
          onClose();
        }, 3000); // Auto-close after 3 seconds

        return () => clearTimeout(timer); // Clean up the timer
      }
    }
  }, [message, onClose]);

  // If no message, return null (don't render anything)
  if (!message) {
    return null;
  }

  // Determine the alert style based on message content
  const alertStyle = message.toLowerCase().includes('failed') ||
    message.toLowerCase().includes('error') ||
    message.toLowerCase().includes('invalid') || message.toLowerCase().includes('not')
    ? { backgroundColor: 'red', color: 'white' } // Error styles
    : message.toLowerCase().includes('warning') || message.toLowerCase().includes('caution')
    ? { backgroundColor: 'orange', color: 'black' } // Warning styles
    : { backgroundColor: 'green', color: 'white' }; // Success styles

  return (
    <div className="custom-alert" style={alertStyle}>
      {message + " "}
      <button className="custom-alert-close text-lg" onClick={onClose} style={alertStyle}>
        &times;
      </button>
    </div>
  );
};

export default CustomAlert;
