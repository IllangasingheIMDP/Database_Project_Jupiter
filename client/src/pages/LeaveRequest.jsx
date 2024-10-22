import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'; // To get the current user's data
import Layout from '../components/Layout';
import CustomAlert from '../components/CustomAlert';
import MaterialButton from '../components/MaterialButton'; 

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

  // Handle form submission for leave request
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(Start_Date) > new Date(End_Date)) {
      setAlertMessage('Warning! Start date cannot be after the End date. Please select valid dates.');
      setShowAlert(true);
      return; // Stop form submission
    }

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
      setShowAlert(true); // Show the alert
    }
  };

  // Function to fetch leave requests
  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get(`http://localhost:5555/leaveRequest/getLeave-requests?User_ID=${user.User_ID}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (response.data.success) {
        setLeaveRequests(response.data.data); // Assuming the data structure returned includes the leave requests
      } else {
        setAlertMessage('Failed to fetch leave requests');
      }
    } catch (error) {
      console.error('Error fetching leave requests', error);
      setAlertMessage('Error: Failed to fetch leave requests');
    } finally {
      setShowAlert(true); // Show the alert
    }
  };

  return (
    <Layout>
      {/* Alert System */}
      {showAlert && (
        <CustomAlert 
          message={alertMessage} 
          onClose={() => setShowAlert(false)} // Close alert when dismissed
        />
      )}
      
      <div className='max-h-full h-full rounded-lg shadow-2xl shadow-black' style={{ backgroundImage: 'url("/../../public/dashboard.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', }}>
        <section className='bg-gray-950 px-2.5 py-4 backdrop-blur-md bg-opacity-65 min-h-full h-full rounded-lg py-5 px-5' style={{ overflowY: 'auto' }}>
          <h2 className="text-x1 mb-4 text-white">Submit Leave Request</h2>
          
          <form onSubmit={handleSubmit}>
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

          {/* Leave Requests Table */}
          {leaveRequests.length > 0 && (
            <div className="mt-5">
              <h3 className="text-lg mb-2 text-white">Your Leave Requests</h3>
              <table className="w-full mb-4 text-white">
                <thead>
                  <tr>
                    <th>Leave Type</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.map((request, index) => (
                    <tr key={index}>
                      <td>{request.Leave_Type}</td>
                      <td>{new Date(request.Start_Date).toLocaleDateString()}</td>
                      <td>{new Date(request.End_Date).toLocaleDateString()}</td>
                      <td>{request.Reason}</td>
                      <td>{request.Status}</td>
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
