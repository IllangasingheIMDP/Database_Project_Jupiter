import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'; // To get the current user's data
import Layout from '../components/Layout';
import CustomAlert from '../components/CustomAlert';
import MaterialButton from '../components/MaterialButton'; 
import api from '../axios';

const LeaveRequest = () => {
  const { user } = useSelector((state) => state.user); // Get current user from Redux store
  const [Leave_Type, setLeaveType] = useState('');
  const [Start_Date, setStartDate] = useState('');
  const [End_Date, setEndDate] = useState('');
  const [Reason, setReason] = useState('');

  // State for leave requests
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  // Separate state for showing alerts for fetching requests
  const [fetchAlertMessage, setFetchAlertMessage] = useState('');
  const [showFetchAlert, setShowFetchAlert] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for fetch requests
  const sendMail = async (Req_ID,text) => {
    setLoading(true);
    try {
      const response = await api.post(`/leaveRequest/supervisorMail?Req_ID=${Req_ID}`,{text:text}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (response.data.success) {
        setAlertMessage("Email sent successfully");
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error fetching leave requests', error);
    } finally {
      setLoading(false);
    }

  }
  // Handle form submission for leave request
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(Start_Date) > new Date(End_Date)) {
      setAlertMessage('Warning! Start date cannot be after the End date. Please select valid dates.');
      setShowAlert(true);
      return; // Stop form submission
    }

    if (new Date(Start_Date).getTime() === new Date(End_Date).getTime()) {
      setAlertMessage('Warning! Start date and End date cannot be the same. Please select valid dates.');
      setShowAlert(true);
      return; // Stop form submission
    }

    const leaveRequestData = {
      User_ID: user.User_ID, // Pass the current user's ID
      Leave_Type,
      Start_Date,
      End_Date,
      Reason,
      Status: 'Pending', // Default
    };

    try {
      const response = await api.post('/leaveRequest/leave-requests', leaveRequestData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (response.data.success) {
        sendMail(response.data.data,`You have new leave request by user ${user.User_Name}\nLeave type:${Leave_Type}\n
          Start_Date: ${Start_Date}\n
          End Date: ${End_Date}\n
          Reason: ${Reason}\n`)
        setAlertMessage('Leave request submitted successfully');
        setLeaveType('');
        setStartDate('');
        setEndDate('');
        setReason('');
      } else {
        setAlertMessage('Failed to submit leave request');
      }
    } catch (error) {
      console.error('Error submitting leave request', error);
      setAlertMessage('Error: Failed to submit leave request');
    } finally {
      setShowAlert(true); // Show the alert for submission
    }
  };

  // Function to fetch leave requests
  const fetchLeaveRequests = async () => {
    setLoading(true); // Show loading spinner or feedback
    try {
      const response = await api.get(`/leaveRequest/getLeave-requests?User_ID=${user.User_ID}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (response.data.success) {
        const fetchedRequests = response.data.data[0]?.result?.data || []; // Ensure proper data structure handling
        setLeaveRequests(fetchedRequests);

        // Check if there are no leave requests
        if (fetchedRequests.length === 0) {
          setFetchAlertMessage('Warning! You have no leave requests');
          setShowFetchAlert(true); // Show an alert if no requests are found
        }
      } else {
        setFetchAlertMessage('Failed to fetch leave requests');
        setShowFetchAlert(true);
      }
    } catch (error) {
      console.error('Error fetching leave requests', error);
      setFetchAlertMessage('Error: Failed to fetch leave requests');
      setShowFetchAlert(true);
    } finally {
      setLoading(false); // Hide loading feedback
    }
  };

  const tableCellStyle = {
    border: '1px solid white', // Adds horizontal and vertical borders
    padding: '8px', // Optional padding for better readability
    textAlign: 'center', // Center-aligns text in the table cells
  };

  return (
    <Layout>
      {/* Alert System for submitting requests */}
      {showAlert && (
        <CustomAlert 
          message={alertMessage} 
          onClose={() => setShowAlert(false)} // Close alert when dismissed
        />
      )}
      
      {/* Separate alert for fetching requests */}
      {showFetchAlert && (
        <CustomAlert 
          message={fetchAlertMessage} 
          onClose={() => setShowFetchAlert(false)} // Close alert for fetching leave requests
        />
      )}
      
      <div className='max-h-full h-full rounded-lg shadow-2xl shadow-black' style={{ backgroundImage: 'url("/../../public/dashboard.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', }}>
        <section className='bg-gray-950 px-2.5 py-4 backdrop-blur-md bg-opacity-65 min-h-full h-full rounded-lg py-5 px-5' style={{ overflowY: 'auto' }}>
        <h1 className="text-5xl text-center font-bold mb-4 text-white">Request Leaves</h1>

          
          <form onSubmit={handleSubmit}>
            {/* Form Inputs */}
            <div className="mb-4">
              <label className="text-white mb-2 block">Leave Type</label>
              <select
                value={Leave_Type}
                onChange={(e) => setLeaveType(e.target.value)}
                required
                className="border p-2 w-full mb-4"
                style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: "white", borderColor: 'white', borderRadius: "8px" }}
              >
                <option value="">Select Leave Type</option>
                <option value="Annual">Annual</option>
                <option value="Casual">Casual</option>
                <option value="Maternity">Maternity</option>
                <option value="No_Pay">No-Pay</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="text-white mb-2 block">Start Date</label>
              <input
                type="date"
                value={Start_Date}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="border p-2 w-full"
                style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: "white", borderColor: 'white', borderRadius: "8px" }}
              />
            </div>

            <div className="mb-4">
              <label className="text-white mb-2 block">End Date</label>
              <input
                type="date"
                value={End_Date}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="border p-2 w-full"
                style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: "white", borderColor: 'white', borderRadius: "8px" }}
              />
            </div>

            <div className="mb-4">
              <label className="text-white mb-2 block">Reason</label>
              <textarea
                value={Reason}
                onChange={(e) => setReason(e.target.value)}
                required
                className="border p-2 w-full"
                style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: "white", borderColor: 'white', borderRadius: "8px", height: '120px', resize: 'none' }}
                placeholder="Enter the reason for leave..."
              ></textarea>
            </div>

            <MaterialButton
              table="Submit"
              variant="success"
              text_color="white"
              text_size="16px"
              margin="0px"
              onClick={handleSubmit}
            />
          </form>

          {/* Button to fetch and display leave requests */}
          <MaterialButton
            table="View Leave Requests"
            variant="info" // Choose a suitable variant for this button
            text_color="white"
            text_size="16px"
            margin="10px 0"
            onClick={fetchLeaveRequests} // Fetch requests on button click
          />

          {/* Loading spinner */}
          {loading && <div className="text-white">Loading...</div>}
          
          {/* Display message when there are no leave requests */}
          {!loading && leaveRequests.length === 0 && (
            <div className="text-white mt-5">  </div>
          )}

          {/* Leave Requests Table */}
          {leaveRequests.length > 0 && !loading && (
            <div className="mt-5">
              <h3 className="text-lg mb-2 text-white">Your Leave Requests</h3>
              <table className="w-full mb-4 text-white" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={tableCellStyle}>Leave Type</th>
                    <th style={tableCellStyle}>Start Date</th>
                    <th style={tableCellStyle}>End Date</th>
                    <th style={tableCellStyle}>Reason</th>
                    <th style={tableCellStyle}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.map((request, index) => (
                    <tr key={index}>
                      <td style={tableCellStyle}>{request.Leave_Type}</td>
                      <td style={tableCellStyle}>{new Date(request.Start_Date).toLocaleDateString()}</td>
                      <td style={tableCellStyle}>{new Date(request.End_Date).toLocaleDateString()}</td>
                      <td style={tableCellStyle}>{request.Reason}</td>
                      <td style={tableCellStyle}>{request.Status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </section>
      </div>
    </Layout>
  );
};

export default LeaveRequest;
