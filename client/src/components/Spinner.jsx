// Spinner.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Spinner = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirectToLogin = setTimeout(() => {
      navigate('/login');
    }, 5000); // Redirect after 5 seconds

    // Clean up the timer
    return () => {
      clearInterval(timer);
      clearTimeout(redirectToLogin);
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="loader"></div>
      <p className="mt-4 text-lg">{countdown} Redirecting to Login ....</p>
      <style>
        {`
          .loader {
            border: 8px solid rgba(0, 0, 0, 0.1);
            border-left-color: #3498db;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 1s ease infinite;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Spinner;
