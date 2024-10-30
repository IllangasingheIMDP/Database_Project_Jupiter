import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import Layout from '../../components/Layout';
import CustomAlert from '../../components/CustomAlert';
import MaterialButton from '../../components/MaterialButton';
import api from '../../axios';

const EditTable = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const { tableName } = useParams();
  const [tableData, setTableData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false); // Popup for adding new row
  const [editRow, setEditRow] = useState(null);
  const [newRow, setNewRow] = useState({}); // State for new row

  const fetchTableData = async () => {
    try {
      const response = await api.get(
        `/admin/getTableData/${tableName}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      if (response.data.success) {
        const actualData = Array.isArray(response.data.data) && Array.isArray(response.data.data[0])
          ? response.data.data[0]
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

  const openAddPopup = () => {
    const emptyRow = tableData.length > 0 ? Object.keys(tableData[0]).reduce((obj, key) => ({ ...obj, [key]: '' }), {}) : {};
    setNewRow(emptyRow);
    setIsAddPopupOpen(true);
  };

  const closeAddPopup = () => {
    setIsAddPopupOpen(false);
    setNewRow({});
  };

  const handleInputChange = (e, column) => {
    setEditRow({ ...editRow, [column]: e.target.value });
  };

  const handleNewRowInputChange = (e, column) => {
    setNewRow({ ...newRow, [column]: e.target.value });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await api.put(
        `/admin/updateTableData/${tableName}`,
        editRow,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      if (response.data.success) {
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

  const handleAddNewRow = async () => {
    try {
      const response = await api.post(
        `/admin/addTableData/${tableName}`,
        newRow,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      if (response.data.success) {
        fetchTableData();
        closeAddPopup();
        setAlertMessage('New row added successfully');
      } else {
        console.error('Failed to add new row');
        setAlertMessage(response.data.data);
      }
      setShowAlert(true);
    } catch (error) {
      console.error('Error adding new row:', error);
      setAlertMessage(error.response.data.data);
      setShowAlert(true);
    }
  };

  const handleDeleteRow = async (row) => {
    if (window.confirm('Are you sure you want to delete this row?')) {
      try {
        const response = await api.post(
          `/admin/deleteTableData/${tableName}`,
          row,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        );

        if (response.data.success) {
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
      {showAlert && (
        <CustomAlert 
          message={alertMessage} 
          onClose={() => setShowAlert(false)} 
        />
      )}

      <div className='max-h-full h-full rounded-lg shadow-2xl shadow-black' style={{ backgroundImage: 'url("/../../public/dashboard.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', }}>
        <section className='bg-gray-950 px-2.5 py-4 backdrop-blur-md bg-opacity-75 min-h-full h-full rounded-lg py-5 px-5' style={{ overflowY: 'auto' }}>
          <h2 className="text-5xl font-bold text-center  mb-4 text-white" style={{ textTransform: 'uppercase' }}>Editing Table: {tableName.replace(/_/g, ' ')}</h2>
          <MaterialButton
            table="Add Row"
            is_upper={true}
            text_color='rgb(230, 230, 230)'
            variant="success"
            margin='2px'
            onClick={openAddPopup}
          />

          <div style={{ maxWidth: '100%', overflowX: 'auto', overflowY: 'auto' }}>
            <table className="table-auto w-full border-collapse border border-gray-400">
              <thead>
                <tr>
                  {tableData.length > 0 && Object.keys(tableData[0]).map((column) => (
                    <th key={column} className="border border-gray-400 p-2 text-white">{column.toUpperCase().replace(/_/g, ' ')}</th>
                  ))}
                  <th className="border border-gray-400 p-2"></th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border border-gray-400">
                    {Object.values(row).map((value, index) => (
                      <td key={index} className="border border-gray-400 p-2 text-white">{value}</td>
                    ))}
                    <td className="border border-gray-400 p-2">
                      <MaterialButton
                        table="Edit"
                        index={rowIndex}
                        is_upper={true}
                        text_color='rgb(230, 230, 230)'
                        variant="success"
                        margin='2px'
                        onClick={() => openEditPopup(row)}
                      />
                      <MaterialButton
                        table="Delete"
                        index={rowIndex + 1}
                        is_upper={true}
                        text_color='rgb(230, 230, 230)'
                        variant="delete"
                        margin='2px'
                        onClick={() => handleDeleteRow(row)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isPopupOpen && (
            <div className="fixed inset-0 bg-gray-950 flex justify-center items-center bg-opacity-5">
              <div className="bg-gray-950 p-4 rounded-lg" style={{ maxHeight: '80vh', overflowY: 'auto', width: '400px' }}>
                {Object.keys(editRow).map((column) => (
                  <div key={column} className="mb-2">
                    <label className="text-white">{column.toUpperCase().replace(/_/g, ' ')}:</label>
                    <input
                      type="text"
                      value={editRow[column]}
                      onChange={(e) => handleInputChange(e, column)}
                      className="border p-2 w-full"
                      style={{ backgroundColor: 'black', color: "white"}}
                    />
                  </div>
                ))}
                <MaterialButton table="Save" is_upper={true} variant="success" onClick={handleSaveChanges} />
                <MaterialButton table="Cancel" is_upper={true} variant="delete" onClick={closeEditPopup} />
              </div>
            </div>
          )}

          {isAddPopupOpen && (
            <div className="fixed inset-0 bg-gray-950 flex justify-center items-center bg-opacity-5">
              <div className="bg-gray-950 p-4 rounded-lg" style={{ maxHeight: '80vh', overflowY: 'auto', width: '400px' }}>
                {Object.keys(newRow).map((column) => (
                  <div key={column} className="mb-2">
                    <label className="text-white">{column.toUpperCase().replace(/_/g, ' ')}:</label>
                    <input
                      type="text"
                      value={newRow[column]}
                      onChange={(e) => handleNewRowInputChange(e, column)}
                      className="border p-2 w-full"
                      style={{ backgroundColor: 'black', color: "white"}}
                    />
                  </div>
                ))}
                <MaterialButton table="Save" is_upper={true} variant="success" onClick={handleAddNewRow} />
                <MaterialButton table="Cancel" is_upper={true} variant="delete" onClick={closeAddPopup} />
              </div>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default EditTable;
