import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import CustomAlert from '../components/CustomAlert';
import MaterialButton from '../components/MaterialButton';
import api from '../axios';

const Manage_Users = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [username, setUsername] = useState('');
  const [authLevel, setAuthLevel] = useState('');
  const [employee, setEmployee] = useState('');
  const [authLevels, setAuthLevels] = useState([]);
  const [employees, setEmployees] = useState([]);

  const fetchUserData = async () => {
    try {
      const res = await api.get('/users/get-users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (res.data.success) {
        setUsers(res.data.data.user_accounts || []);
      } else {
        setAlertMessage('Error fetching users');
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage('Error fetching users');
      setShowAlert(true);
    }
  };

  const fetchDropdownData = async () => {
    try {
      const [empRes] = await Promise.all([
        api.get('/users/get-users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }),
      ]);
      if (empRes.data.success) {
        setAuthLevels(['Admin User','HR Manager','Employee','Second Manager']);
        setEmployees(empRes.data.data.non_account_employees || []);
      } else {
        setAlertMessage('Error fetching dropdown data');
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage('Error fetching dropdown data');
      setShowAlert(true);
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) {
      setAlertMessage('Please select an user to delete.');
      setShowAlert(true);
      return;
    }

    if (window.confirm('Are you sure you want to delete this user?')) {
  
      try {
        // Send the delete request with token in headers
        const res = await api.post(
          `/users/delete-user/${selectedUser}`,
          {}, // Empty body for POST request
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        );
    
        if (res.data.success) {
          setAlertMessage('User deleted successfully.');
          setShowAlert(true);
    
          // Update the user list by filtering out the deleted user
          fetchUserData();
          setSelectedUser(''); // Clear the selection after deletion
        } else {
          // Show the message if deletion was not successful
          const errorMessage = res.data.data || 'Failed to delete user.';
          setAlertMessage(errorMessage);
          setShowAlert(true);
        }
      } catch (error) {
        // Catch and display error message
        const errorMessage = error.response?.data?.data || 'Error deleting user.';
        setAlertMessage(errorMessage);
        setShowAlert(true);
        console.error('Error deleting user:', error); // Log the error for debugging
      }
    }
  };  

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleAddUser = async () => {
    if (!username || !authLevel || !employee) {
      setAlertMessage('Please fill the form');
      setShowAlert(true);
      return;
    }
    try {
      const res = await api.post(
        '/users/add-user',
        { username, authLevel, employee },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      if (res.data.success) {
        setAlertMessage('User added successfully');
        setShowAlert(true);
        fetchUserData(); // Refresh the user list
        setShowAddUserModal(false);
        setUsername('');
        setAuthLevel('');
        setEmployee('');
      } else {
        // Show the message if deletion was not successful
        const errorMessage = res.data.data || 'Failed to add user.';
        setAlertMessage(errorMessage);
        setShowAlert(true);
      }
    } catch (error) {
      // Catch and display error message
      const errorMessage = error.response?.data?.data || 'Error add user.';
      setAlertMessage(errorMessage);
      setShowAlert(true);
      console.error('Error add user:', error); // Log the error for debugging
    }
  };

  return (
    <Layout>
      {showAlert && (
        <CustomAlert message={alertMessage} onClose={() => setShowAlert(false)} />
      )}

      <div className='max-h-full h-full rounded-lg shadow-2xl shadow-black'
           style={{ backgroundImage: 'url("/../../public/dashboard.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <section className='bg-gray-950 px-5 py-5 backdrop-blur-md bg-opacity-75 min-h-full h-full rounded-lg'>
          <h2 className="text-5xl mb-4 font-bold text-center text-white">Manage Users</h2>

          <div className="mb-4">
            <MaterialButton
              table="Add New User"
              onClick={() => {
                fetchDropdownData();
                setShowAddUserModal(true);
              }}
              variant="success"
              text_color="white"
              text_size="16px"
              margin="0px"
            />
          </div>

          <div style={{ borderTop: '2px solid white', width: '100%', margin: '20px 0' }}></div>

          <div className="my-4">
            <label htmlFor="user-select" className="text-white">Select user:</label>
            <select
              id="user-select"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="border p-2 w-full mb-4"
              style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: 'white', borderColor: 'white', borderRadius: '5px' }}
            >
              <option value="">--Select a User--</option>
              {users.map((emp) => (
                <option key={emp.User_ID} value={emp.User_ID}>
                  {`${emp.initials} ${emp.first_Name} ${emp.last_Name} [ NIC : ${emp.NIC} ] [ Username : ${emp.User_Name} ]`}
                </option>
              ))}
            </select>
          </div>
          <MaterialButton table="Delete User" onClick={handleDelete} variant="delete" text_color="white" text_size="16px" margin="0px" />

          {showAddUserModal && (
            <div className="fixed inset-0 bg-gray-950 px-2.5 py-4 backdrop-blur-md bg-opacity-5  flex justify-center items-center">
              <div
                className="bg-gray-950 px-2.5 py-4 backdrop-blur-md bg-opacity-5 rounded-lg"
                style={{
                  maxHeight: '80vh',
                  overflowY: 'auto',
                  width: '400px'
                }}
              >
                <h3 className="text-lg text-white mb-4">Add New User</h3>

                <label className="text-white">Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border p-2 w-full mb-4"
                  style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: 'white' }}
                />

                <label className="text-white">Authentication Level:</label>
                <select
                  value={authLevel}
                  onChange={(e) => setAuthLevel(e.target.value)}
                  className="border p-2 w-full mb-4"
                  style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: 'white' }}
                >
                  <option value="">--Select Level--</option>
                  {authLevels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>

                <label className="text-white">Employee:</label>
                <select
                  value={employee}
                  onChange={(e) => setEmployee(e.target.value)}
                  className="border p-2 w-full mb-4"
                  style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: 'white' }}
                >
                  <option value="">--Select Employee--</option>
                  {employees.map((emp) => (
                    <option key={emp.NIC} value={emp.NIC}>
                      {`${emp.initials} ${emp.first_Name} ${emp.last_Name} [ NIC : ${emp.NIC} ]`}
                    </option>
                  ))}
                </select>

                <div className="flex justify-end mt-4">
                  <MaterialButton table="Add" onClick={handleAddUser} variant="success" />
                  <MaterialButton table="Cancel" onClick={() => setShowAddUserModal(false)} variant="delete" />
                </div>
              </div>
            </div>
          )}

        </section>
      </div>
    </Layout>
  );
};

export default Manage_Users;
