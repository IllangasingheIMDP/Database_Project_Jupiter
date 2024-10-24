import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'; // To get the current user's data
import Layout from '../components/Layout';
import CustomAlert from '../components/CustomAlert';

const ManageEmployeeRequests = () => {
  const { user } = useSelector((state) => state.user); // Get current user from Redux store

  // State for employee leave requests
  const [employeeLeaveRequests, setEmployeeLeaveRequests] = useState([]);
  const [fetchAlertMessage, setFetchAlertMessage] = useState('');
  const [showFetchAlert, setShowFetchAlert] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for fetch requests

  // Function to fetch leave requests for employees
  const fetchEmployeeLeaveRequests = async () => {
    setLoading(true); // Show loading spinner or feedback
    try {
      const response = await axios.get(`http://localhost:5555/approve-reject-leaves/manage_leaves?User_ID=${user.User_ID}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (response.data.success) {
        const fetchedRequests = response.data.data[0]?.result?.data || []; // Ensure proper data structure handling
        setEmployeeLeaveRequests(fetchedRequests);

        // Check if there are no leave requests
        if (fetchedRequests.length === 0) {
          setFetchAlertMessage('Warning! You have no Employee or There are no leave requests for your employees.');
          setShowFetchAlert(true); // Show an alert if no requests are found
        }
      } else {
        setFetchAlertMessage('Failed to fetch employee leave requests');
        setShowFetchAlert(true);
      }
    } catch (error) {
      console.error('Error fetching employee leave requests', error);
      setFetchAlertMessage('Error: Failed to fetch employee leave requests');
      setShowFetchAlert(true);
    } finally {
      setLoading(false); // Hide loading feedback
    }
  };

  // Fetch leave requests when component mounts
  useEffect(() => {
    fetchEmployeeLeaveRequests();
  }, []); // Empty dependency array means this effect runs once, after initial render

  const tableCellStyle = {
    border: '1px solid white', // Adds horizontal and vertical borders
    padding: '8px', // Optional padding for better readability
    textAlign: 'center', // Center-aligns text in the table cells
  };

  return (
    <Layout>
      {/* Separate alert for fetching requests */}
      {showFetchAlert && (
        <CustomAlert 
          message={fetchAlertMessage} 
          onClose={() => setShowFetchAlert(false)} // Close alert for fetching employee leave requests
        />
      )}
      
      <div className='max-h-full h-full rounded-lg shadow-2xl shadow-black' style={{ backgroundImage: 'url("/../../public/dashboard.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', }}>
        <section className='bg-gray-950 px-2.5 py-4 backdrop-blur-md bg-opacity-65 min-h-full h-full rounded-lg py-5 px-5' style={{ overflowY: 'auto' }}>
          <h1 className="text-2xl font-bold mb-4 text-white">Employee Leave Requests</h1>

          {/* Loading spinner */}
          {loading && <div className="text-white">Loading...</div>}
          
          {/* Leave Requests Table */}
          {employeeLeaveRequests.length > 0 && !loading && (
            <div className="mt-5">
              <h3 className="text-lg mb-2 text-white">Employee Leave Requests</h3>
              <table className="w-full mb-4 text-white" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={tableCellStyle}>Employee ID</th>
                    <th style={tableCellStyle}>First Name</th>
                    <th style={tableCellStyle}>Last Name</th>
                    <th style={tableCellStyle}>Leave Type</th>
                    <th style={tableCellStyle}>Start Date</th>
                    <th style={tableCellStyle}>End Date</th>
                    <th style={tableCellStyle}>Reason</th>
                    <th style={tableCellStyle}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeLeaveRequests.map((request, index) => (
                    <tr key={index}>
                      <td style={tableCellStyle}>{request.Employee_ID}</td>
                      <td style={tableCellStyle}>{request.First_Name}</td>
                      <td style={tableCellStyle}>{request.Last_Name}</td>
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

export default ManageEmployeeRequests;
