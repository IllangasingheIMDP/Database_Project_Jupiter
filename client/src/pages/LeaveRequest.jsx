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
      const response = await axios.post('http://localhost:5000/leaveRequest', leaveRequestData);
      if (response.data.success) {
        alert('Leave request submitted successfully');
      }
    } catch (error) {
      console.error('Error submitting leave request', error);
      alert('Failed to submit leave request');
    }
  };

  return (
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
          style={{ ...inputStyles, height: '100px' }}
        ></textarea>
      </div>

      <button type="submit" style={buttonStyles}>Submit</button>
    </form>
  );
};

// Inline styling
const formStyles = {
  maxWidth: '500px',
  margin: '0 auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const inputContainerStyles = {
  marginBottom: '16px',
};

const labelStyles = {
  display: 'block',
  marginBottom: '8px',
  fontSize: '16px',
  fontWeight: 'bold',
};

const inputStyles = {
  width: '100%',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '14px',
};

const buttonStyles = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
};

export default LeaveRequest;
