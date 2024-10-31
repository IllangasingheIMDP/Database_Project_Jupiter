import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import './Approve_leave.css';
import CustomAlert from '../components/CustomAlert';
import { useSelector } from 'react-redux';
import { FaChevronRight } from 'react-icons/fa';
import api from '../axios';

const ApproveLeave = () => {
  const { user } = useSelector((state) => state.user);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [selectedSearchType, setSelectedSearchType] = useState('nic'); 
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email,setEmail]=useState('');
  const [fetchAlertMessage, setFetchAlertMessage] = useState('');
  const [showFetchAlert, setShowFetchAlert] = useState(false);
  // Fetch leave requests
  const fetchLeaveRequests = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/approve-reject-leaves/manage_leaves?User_ID=${user.User_ID}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (response.data.success) {
        const fetchedRequests = response.data.data[0]?.result?.data || [];
        setLeaveRequests(fetchedRequests);
      }
    } catch (error) {
      console.error('Error fetching leave requests', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const toggleCardExpansion = (index) => {
    setExpandedCardIndex(expandedCardIndex === index ? null : index);
  };

  // Function to search for a specific employee automatically
  const searchEmployeeByRequest = (request) => {
    setSearchTerm(request.NIC); // Set search term to the NIC of the request
    setSelectedSearchType('nic'); // Ensure NIC search type is selected
    searchEmployees(request.NIC); // Automatically call the search function with the NIC
  };

  const sendMail = async (Req_ID,Approved) => {
    setLoading(true);
    try {
      const response = await api.get(`/leaveRequest/apprejmail?Req_ID=${Req_ID}&Approved=${Approved}`, {
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

  const handleApprove = async (Req_ID) => {
    try {
      const response = await api.put(
        `/approve-reject-leaves/approve?Req_ID`, 
        { "Req_ID": Req_ID },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      if (response.data.success) {
        setAlertMessage("Leave approved successfully");
        
        setShowAlert(true);
        sendMail(Req_ID,1);
        fetchLeaveRequests(); // Refresh leave requests
      }
    } catch (error) {
      console.error("Error approving leave:", error);
      setAlertMessage("Error: Unable to approve leave");
      setShowAlert(true);
    }
  };

  const handleReject = async (Req_ID) => {
    try {
      const response = await api.post(
        `/approve-reject-leaves/reject`,
        { Req_ID },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      if (response.data.success) {
        setAlertMessage("Leave rejected successfully");
       
        setShowAlert(true);
        sendMail(Req_ID,2);
        fetchLeaveRequests();
      }
    } catch (error) {
      console.error("Error rejecting leave:", error);
      setAlertMessage("Error: Unable to reject leave");
      setShowAlert(true);
    }
  };

  // Update searchEmployees to take NIC as parameter
  const searchEmployees = async (nic) => {
    try {
      const params = {
        NIC: selectedSearchType === 'nic' ? nic : null,
        Name: selectedSearchType === 'name' ? searchTerm : null,
      };

      const response = await api.get(`/approve-reject-leaves/getallleaves`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        params,
      });

      if (response.data.success) {
        setEmployeeDetails(response.data.data);
      } else {
        setEmployeeDetails(null);
        setAlertMessage(response.data.data);
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error searching employees:", error);
      setAlertMessage("Error: Unable to fetch employee details.");
      setShowAlert(true);
    }
  };

  const handleSearch = () => {
    searchEmployees(searchTerm); // Ensure that the search is executed with the current term
  };

  return (
    <Layout>
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
      <div className='max-h-full h-full rounded-lg shadow-2xl shadow-black' style={{ backgroundImage: 'url("/../../public/dashboard.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <section className='bg-gray-950 px-2.5 py-4 backdrop-blur-md bg-opacity-65 min-h-full h-full rounded-lg py-5 px-5' style={{ overflowY: 'auto' }}>
          <h2 className="text-5xl text-center mb-5 font-bold text-white">Approve / Reject leave requests</h2>
          
         

          <div className="row g-0 text-center">
            <div className="col-sm-6 col-md-8">
              <div className="flex">
                <div className="w-full p-4">
                  <h3 className="text-xl mb-4 text-white">Pending Leave Requests</h3>
                  <div className="overflow-y-auto h-full bg-gray-800 p-4 rounded shadow-md">
                    {leaveRequests.length > 0 ? (
                      leaveRequests.map((request, index) => (
                        <div
                          key={index}
                          className={`mb-4 p-4 bg-gray-900 rounded-lg shadow-lg cursor-pointer transition-all duration-300 ease-in-out ${expandedCardIndex === index ? 'border-l-4 border-blue-500' : ''}`}
                          onClick={() => toggleCardExpansion(index)}
                          style={{
                            transform: expandedCardIndex === index ? 'scale(1.02)' : 'scale(1)',
                            boxShadow: expandedCardIndex === index ? '0 4px 20px rgba(0, 0, 0, 0.2)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                            
                              <div>
                                <p className="font-semibold text-white"><strong>Name:</strong> {request.Name}</p>
                                <p className="text-gray-400"><strong>NIC:</strong> {request.NIC}</p>
                              </div>
                            </div>
                            <button onClick={() => searchEmployeeByRequest(request)} className="text-white hover:text-blue-500 transition duration-300">
                              <FaChevronRight />
                            </button>
                          </div>
                          {expandedCardIndex === index && (
                            <div className="mt-4">
                              <p className="text-gray-300"><strong>Start Date:</strong> {request.Start_Date}</p>
                              <p className="text-gray-300"><strong>End Date:</strong> {request.End_Date}</p>
                              <p className="text-gray-300"><strong>Reason:</strong> {request.Reason}</p>
                              <div className="flex mt-4">
                                <button onClick={() => handleApprove(request.Req_ID)} className="bg-green-500 text-white p-2 rounded mr-2 hover:bg-green-600 transition duration-300">Approve</button>
                                <button onClick={() => handleReject(request.Req_ID)} className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-300">Reject</button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400">No pending leave requests found.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-4">
              <div className="mb-4 p-4 bg-gray-400 rounded shadow-md">
                <label className="block mb-2 text-white">Search by:</label>
                <div className="flex mb-4">
                  <label className="mr-4">
                    <input
                      type="radio"
                      value="nic"
                      checked={selectedSearchType === 'nic'}
                      onChange={() => setSelectedSearchType('nic')}
                      className="mr-1"
                    />
                    NIC
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="name"
                      checked={selectedSearchType === 'name'}
                      onChange={() => setSelectedSearchType('name')}
                      className="mr-1"
                    />
                    Name
                  </label>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border p-2 mb-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                  placeholder={`Enter ${selectedSearchType === 'nic' ? 'NIC' : 'Name'}`}
                />
                <button onClick={handleSearch} className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300">Search</button>

                {employeeDetails && (
                  <div className="mt-4 bg-gray-900 p-4 rounded">
                    <h4 className="text-xl text-white">Employee Details</h4>
                    <p className="text-gray-200"><strong>Profile Picture:</strong> <img src={employeeDetails.data.Profile_Pic} alt="Profile" className="w-100 h-100" /></p>
                    <p className="text-gray-200"><strong>Full Name:</strong> {employeeDetails.data.Full_Name}</p>
                    <p className="text-gray-200"><strong>NIC:</strong> {employeeDetails.data.NIC}</p>
                    <p className="text-gray-200"><strong>Remaining Total Leaves:</strong> {employeeDetails.data.Total_Leave_Count}</p>
                    <p className="text-gray-200"><strong>Remaining Annual Leaves:</strong> {employeeDetails.data.Remaining_Annual}</p>
                    <p className="text-gray-200"><strong>Remaining Casual Leaves:</strong> {employeeDetails.data.Remaining_Casual}</p>
                    <p className="text-gray-200"><strong>Remaining Maternity Leaves:</strong> {employeeDetails.data.Remaining_Maternity}</p>
                    <p className="text-gray-200"><strong>Remaining No-Pay Leaves:</strong> {employeeDetails.data.Remaining_No_Pay}</p>

                    <h5 className="text-lg text-white">Leave Requests:</h5>
                    <ul className="list-disc pl-5 text-gray-300">
                      {Array.isArray(employeeDetails.leave_requests_of_user) && employeeDetails.leave_requests_of_user.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                          {employeeDetails.leave_requests_of_user.map((leave, index) => (
                            <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
                              <p className="font-semibold text-white"><strong>Reason:</strong> {leave.Reason}</p>
                              <p className="text-gray-300"><strong>From:</strong> {leave.Start_Date}</p>
                              <p className="text-gray-300"><strong>To:</strong> {leave.End_Date}</p>
                              <p className={`text-gray-300 ${leave.Status === 'Approve' ? 'text-green-400' : leave.Status === 'Reject' ? 'text-red-400' : 'text-yellow-400'}`}>
                                <strong>Status:</strong> {leave.Status}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                          <p className="text-gray-400">No leave requests found.</p>
                        </div>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ApproveLeave;
