import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import './Approve_leave.css';
import { useSelector } from 'react-redux';

const ApproveLeave = () => {
  const { user } = useSelector((state) => state.user);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLeaveRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5555/approve-reject-leaves/manage_leaves?User_ID=${user.User_ID}`, {
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

  const handleApprove = async (Req_ID) => {
    console.log('Approving leave request:', Req_ID);
    try {
      const response = await axios.put(
        `http://localhost:5555/approve-reject-leaves/approve?Req_ID`, 
        {"Req_ID" : Req_ID},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      if (response.data.success) {
        setAlertMessage("Leave approved successfully");
        setShowAlert(true);
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
      const response = await axios.post(
        `http://localhost:5555/approve-reject-leaves/reject`,
        { Req_ID },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      if (response.data.success) {
        setAlertMessage("Leave rejected successfully");
        setShowAlert(true);
        fetchLeaveRequests();
      }
    } catch (error) {
      console.error("Error rejecting leave:", error);
      setAlertMessage("Error: Unable to reject leave");
      setShowAlert(true);
    }
  };

  const handleSearch = () => {
    setEmployeeDetails({
      name: 'John Doe',
      nic: '123456789V',
      annualLeave: 10,
      casualLeave: 5,
      totalLeaveBalance: 15,
    });
  };

  return (
    <Layout>
      <div className='max-h-full h-full rounded-lg shadow-2xl shadow-black' style={{ backgroundImage: 'url("/../../public/dashboard.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <section className='bg-gray-950 px-2.5 py-4 backdrop-blur-md bg-opacity-65 min-h-full h-full rounded-lg py-5 px-5' style={{ overflowY: 'auto' }}>
          <h2 className="text-2xl font-bold mb-4 text-white">Leave Approve/Reject Page</h2>
          
          {showAlert && <p className="text-red-500 mb-4">{alertMessage}</p>}

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
                          <div className="flex items-center">
                            <img src="https://th.bing.com/th/id/R.f6f9bb7836e7652e98cb811351f10102?rik=SNsIkH%2brdq%2bCNA&pid=ImgRaw&r=0" alt="Employee" className="w-12 h-12 rounded-full mr-4" />
                            <div>
                              <p className="font-semibold text-white"><strong>Name:</strong> {request.Name}</p>
                              
                              <p className="text-gray-400"><strong>NIC:</strong> {request.NIC}</p>
                            </div>
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
              <div className="mb-4 p-4 bg-green-800 rounded shadow-md">
                <label htmlFor="search" className="block mb-2 text-white">Search Employee by Name or NIC:</label>
                <div className="flex">
                  <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 flex-grow mr-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                    placeholder="Enter employee name or NIC"
                  />
                  <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300">
                    Search
                  </button>
                </div>
                {employeeDetails && (
                  <div className="mt-4 p-4 bg-gray-900 rounded shadow-md">
                    <p className="text-gray-200"><strong>Name:</strong> {employeeDetails.name}</p>
                    <p className="text-gray-200"><strong>NIC:</strong> {employeeDetails.nic}</p>
                    <p className="text-gray-200"><strong>Remaining Annual Leave:</strong> {employeeDetails.annualLeave}</p>
                    <p className="text-gray-200"><strong>Remaining Casual Leave:</strong> {employeeDetails.casualLeave}</p>
                    <p className="text-gray-200"><strong>Total Leave Balance:</strong> {employeeDetails.totalLeaveBalance}</p>
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
