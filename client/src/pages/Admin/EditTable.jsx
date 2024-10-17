import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import CustomAlert from '../../components/CustomAlert';

const EditTable = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const { tableName } = useParams();
  const [tableData, setTableData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editRow, setEditRow] = useState(null); // To hold the row being edited

  const fetchTableData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5555/admin/getTableData/${tableName}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Adding Authorization header
        }
      );

      if (response.data.success) {
        const actualData = Array.isArray(response.data.data) && Array.isArray(response.data.data[0])
          ? response.data.data[0]  // Get the first element of the data array (the actual data)
          : [];
        setTableData(actualData);
      } else {
        console.error('Failed to fetch table data');
      }
    } catch (error) {
      setAlertMessage(error.response.data.data);
      setShowAlert(true);
      console.error('Error fetching table data:', error);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, [tableName]);

  const openEditPopup = (row) => {
    setEditRow(row);
    setIsPopupOpen(true);
  };

  const closeEditPopup = () => {
    setIsPopupOpen(false);
    setEditRow(null);
  };

  const handleInputChange = (e, column) => {
    setEditRow({ ...editRow, [column]: e.target.value });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5555/admin/updateTableData/${tableName}`, 
        editRow, 
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Adding Authorization header
        }
      );

      if (response.data.success) {
        // Update tableData after successful edit
        fetchTableData();
        closeEditPopup();
      } else {
        console.error('Failed to save changes');
      }
      setAlertMessage(response.data.data);
      setShowAlert(true);
    } catch (error) {
      console.error('Error saving changes:', error);
      setAlertMessage(error.response.data.data);
      setShowAlert(true);
    }
  };

// Function to handle row deletion by sending row data as JSON
const handleDeleteRow = async (row) => {
  if (window.confirm('Are you sure you want to delete this row?')) {
    try {
      const response = await axios.post(
        `http://localhost:5555/admin/deleteTableData/${tableName}`, // Assuming you handle the deletion in your server logic
        row, // Sending the entire row data as JSON
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Adding Authorization header
        }
      );

      if (response.data.success) {
        // Refresh table data after deletion
        fetchTableData();
        setAlertMessage('Row deleted successfully');
        setShowAlert(true);
      } else {
        console.error('Failed to delete row');
        setAlertMessage(response.data.data);
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error deleting row:', error);
      setAlertMessage(error.response.data.data);
      setShowAlert(true);
    }
    }
  };


  return (
    <Layout>
      <div className='max-h-full h-full rounded-lg shadow-2xl shadow-black'>
        <section className='bg-gray-300 min-h-full h-full rounded-lg py-5 px-5' style={{ overflowY: 'auto' }}>
          <h2 className="text-xl mb-4" style={{ textTransform: 'uppercase' }}>Editing Table: {tableName}</h2>

          {showAlert && (
            <CustomAlert 
              message={alertMessage} 
              onClose={() => setShowAlert(false)} // Close alert when dismissed
            />
          )}

          {/* Wrapping table in a scrollable container */}
          <div style={{ maxWidth: '100%', overflowX: 'auto', overflowY: 'auto' }}>
            <table className="table-auto w-full border-collapse border border-gray-400">
              <thead>
                <tr>
                  {tableData.length > 0 && Object.keys(tableData[0]).map((column) => (
                    <th key={column} className="border border-gray-400 p-2">{column.toUpperCase()}</th>
                  ))}
                  <th className="border border-gray-400 p-2"></th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border border-gray-400">
                    {Object.values(row).map((value, index) => (
                      <td key={index} className="border border-gray-400 p-2">{value}</td>
                    ))}
                    <td className="border border-gray-400 p-2">
                      <button className="bg-green-500 text-white p-2" style={{ margin: '2px' }} onClick={() => openEditPopup(row)}>Edit</button>
                      <button className="bg-red-500 text-white p-2" style={{ margin: '2px' }} onClick={() => handleDeleteRow(row)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isPopupOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
              <div
                className="bg-white p-5 rounded-lg"
                style={{
                  maxHeight: '80vh',
                  overflowY: 'auto',
                  width: '400px'
                }}
              >
                {Object.keys(editRow).map((column) => (
                  <div key={column} className="mb-2">
                    <label>{column.toUpperCase()}:</label>
                    <input
                      type="text"
                      value={editRow[column]}
                      onChange={(e) => handleInputChange(e, column)}
                      className="border p-2 w-full"
                      //readOnly={['Branch_ID', 'Field_ID', 'Dept_ID', 'Employee_ID', 'NIC', 'Pic_ID', 'Employment_Stat_ID', 'Title_ID', 'Request_ID', 'User_ID', 'Organization_ID', 'PayGrade_ID'].includes(column)}
                    />
                  </div>
                ))}
                <button className="bg-blue-500 text-white p-2 rounded-lg mr-2" onClick={handleSaveChanges}>Save</button>
                <button className="bg-red-500 text-white p-2 rounded-lg" onClick={closeEditPopup}>Cancel</button>
              </div>
            </div>
          )}

        </section>
      </div>
    </Layout>
  );
};

export default EditTable;
