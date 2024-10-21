import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'; // To get the current user's data

const LeaveRequest = () => {
  const { user } = useSelector((state) => state.user); // Get current user from Redux store
  const [Leave_Type, setLeaveType] = useState('');
  const [Start_Date, setStartDate] = useState('');
  const [End_Date, setEndDate] = useState('');
  const [Reason, setReason] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const leaveRequestData = {
      User_ID: user.User_ID, // Pass the current user's ID
      Leave_Type,
      Start_Date,
      End_Date,
      Reason,
      Status: 'Reject', // Default
    };

    try {
      const response = await axios.post('http://localhost:5555/leaveRequest/leave-requests', leaveRequestData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (response.data.success) {
        alert('Leave request submitted successfully');
      }
    } catch (error) {
      console.error('Error submitting leave request', error);
      alert('Failed to submit leave request');
    }
  };

  return (
    <div style={containerStyles}>
      <h2 style={headingStyles}>Submit Leave Request</h2>
      <form onSubmit={handleSubmit} style={formStyles}>
        <div style={inputContainerStyles}>
          <label style={labelStyles}>Leave Type</label>
          <select
            value={Leave_Type}
            onChange={(e) => setLeaveType(e.target.value)}
            required
            style={inputStyles}
          >
            <option value="">Select Leave Type</option>
            <option value="Annual">Annual</option>
            <option value="Casual">Casual</option>
            <option value="Maternity">Maternity</option>
            <option value="No-Pay">No-Pay</option>
          </select>
        </div>

        <div style={inputContainerStyles}>
          <label style={labelStyles}>Start Date</label>
          <input
            type="date"
            value={Start_Date}
            onChange={(e) => setStartDate(e.target.value)}
            required
            style={inputStyles}
          />
        </div>

        <div style={inputContainerStyles}>
          <label style={labelStyles}>End Date</label>
          <input
            type="date"
            value={End_Date}
            onChange={(e) => setEndDate(e.target.value)}
            required
            style={inputStyles}
          />
        </div>

        <div style={inputContainerStyles}>
          <label style={labelStyles}>Reason</label>
          <textarea
            value={Reason}
            onChange={(e) => setReason(e.target.value)}
            required
            style={{ ...inputStyles, height: '120px', resize: 'none' }}
            placeholder="Enter the reason for leave..."
          ></textarea>
        </div>

        <button type="submit" style={buttonStyles}>Submit</button>
      </form>
    </div>
  );
};

// Inline styling

const containerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#f4f4f9',
  padding: '40px',
};

const formStyles = {
  maxWidth: '600px',
  width: '100%',
  padding: '30px',
  border: '1px solid #e0e0e0',
  borderRadius: '12px',
  backgroundColor: '#fff',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  fontFamily: 'Arial, sans-serif',
};

const headingStyles = {
  textAlign: 'center',
  fontSize: '24px',
  color: '#333',
  fontWeight: 'bold',
  marginBottom: '20px',
};

const inputContainerStyles = {
  marginBottom: '20px',
};

const labelStyles = {
  display: 'block',
  marginBottom: '10px',
  fontSize: '16px',
  fontWeight: '600',
  color: '#555',
};

const inputStyles = {
  width: '100%',
  padding: '12px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  fontSize: '16px',
  color: '#333',
  boxSizing: 'border-box',
  transition: 'border-color 0.3s',
};

const buttonStyles = {
  backgroundColor: '#007BFF',
  color: '#fff',
  padding: '14px 20px',
  border: 'none',
  borderRadius: '6px',
  fontSize: '18px',
  cursor: 'pointer',
  width: '100%',
  transition: 'background-color 0.3s',
};

// Add hover and focus effects
inputStyles[':focus'] = {
  borderColor: '#007BFF',
};

buttonStyles[':hover'] = {
  backgroundColor: '#0056b3',
};

export default LeaveRequest;
