import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import CustomAlert from '../components/CustomAlert';
import MaterialButton from '../components/MaterialButton';
import api from '../axios';

const Manage_Employees = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [employees, setEmployees] = useState([]); // State to hold employee data
  const [selectedEmployee, setSelectedEmployee] = useState(''); // State for selected employee
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to fetch dropdown data including employee list
  const detdropdonwdata = async () => {
    try {
      const res = await api.get('/employeeTable/get_employees', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (res.data.success) {
        const { employee_list } = res.data.data; // Extract employee list from response
        setEmployees(employee_list || []); // Set employee data
      } else {
        setAlertMessage('Error: Failed to fetch dropdown data');
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage('Error fetching dropdown data');
      setShowAlert(true);
    }
  };

  useEffect(() => {
    // Fetch dropdown data on component mount
    detdropdonwdata();
  }, []);

  const handleDelete = async () => {
    if (!selectedEmployee) {
      setAlertMessage('Please select an employee to delete.');
      setShowAlert(true);
      return;
    }

    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        // Send the delete request with token in headers
        const res = await api.post(
          `/employeeTable/delete_employee/${selectedEmployee}`,
          {}, // Empty body for POST request
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        );
    
        if (res.data.success) {
          setAlertMessage('Employee deleted successfully.');
          setShowAlert(true);
    
          // Update the employee list by filtering out the deleted employee
          const updatedEmployees = employees.filter(emp => emp.NIC !== selectedEmployee); // Assuming NIC is unique
          setEmployees(updatedEmployees);
          setSelectedEmployee(''); // Clear the selection after deletion
        } else {
          // Show the message if deletion was not successful
          const errorMessage = res.data.data || 'Failed to delete employee.';
          setAlertMessage(errorMessage);
          setShowAlert(true);
        }
      } catch (error) {
        // Catch and display error message
        const errorMessage = error.response?.data?.data || 'Error deleting employee.';
        setAlertMessage(errorMessage);
        setShowAlert(true);
        console.error('Error deleting employee:', error); // Log the error for debugging
      }
    }
  };  

  return (
    <Layout>
      {/* Alert Section */}
      {showAlert && (
        <CustomAlert
          message={alertMessage}
          onClose={() => setShowAlert(false)} // Close alert when dismissed
        />
      )}

      {/* Main Container */}
      <div
        className='max-h-full h-full rounded-lg shadow-2xl shadow-black'
        style={{
          backgroundImage: 'url("/../../public/dashboard.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Content Section */}
        <section className='bg-gray-950 px-5 py-5 backdrop-blur-md bg-opacity-75 min-h-full h-full rounded-lg'>
          <h2 className="text-5xl font-bold text-center mb-4 text-white">Manage Employees</h2>

          {/* Add Employee Button */}
          <div className="mb-4">
            <MaterialButton
              table="Add Employee"
              onClick={() => navigate('/add-new-employee')}
              variant="success"
              text_color="white"
              text_size="16px"
              margin="0px"
            />
          </div>

          {/* Divider */}
          <div style={{ borderTop: '2px solid white', width: '100%', margin: '20px 0' }}></div>

          {/* Dropdown to Select Employee */}
          <div className="my-4">
            <label htmlFor="employee-select" className="text-white">Select Employee:</label>
            <select
              id="employee-select"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="border p-2 w-full mb-4"
              style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: 'white', borderColor: 'white', borderRadius: '5px' }}
            >
              <option value="">--Select an Employee--</option>
              {employees.map((emp) => (
                <option key={emp.NIC} value={emp.NIC}>
                  {` ${emp.initials} ${emp.first_Name} ${emp.last_Name} [ NIC : ${emp.NIC} ]`}
                </option>
              ))}
            </select>
          </div>

          {/* Delete Button */}
          <MaterialButton
            table="Delete Employee"
            onClick={handleDelete}
            variant="delete"
            text_color="white"
            text_size="16px"
            margin="0px"
          />
        </section>
      </div>
    </Layout>
  );
};

export default Manage_Employees;
