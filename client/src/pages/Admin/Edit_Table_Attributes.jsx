// src/pages/Edit_Table_Attributes.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import { useNavigate } from 'react-router-dom';
import MaterialButton from '../../components/MaterialButton';
import CustomAlert from '../../components/CustomAlert';
import api from '../../axios';

const Edit_Table_Attributes = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const [tables, setTables] = useState([]);
  const navigate = useNavigate();

  // Function to fetch table names
  const fetchTableNames = async () => {
    try {
      const res = await api.get('/admin/getTables', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (res.data.success) {
        setTables(res.data.data);
      } else {
        console.error('Failed to fetch tables');
      }
    } catch (error) {
      console.error('Error fetching table names:', error);
    }
  };

  // Fetch table names when the component mounts
  useEffect(() => {
    fetchTableNames();
    setAlertMessage("Caution: This function is intended for advanced users only.");
    setShowAlert(true);
  }, []);

  const handleEditTable = (tableName) => {
    console.log(`Editing table: ${tableName}`);
    navigate(`/edit-table-data/${tableName}`);
  };

  return (
    <Layout>
                      {showAlert && (
            <CustomAlert 
              message={alertMessage} 
              onClose={() => setShowAlert(false)} // Close alert when dismissed
            />
          )}

      <div className='max-h-full h-full rounded-lg shadow-2xl shadow-black' style={{ backgroundImage: 'url("/../../public/dashboard.jpg")', backgroundSize: 'cover', backgroundPosition: 'center',}}>
        <section className='bg-gray-950 px-2.5 py-4 backdrop-blur-md bg-opacity-75 min-h-full h-full rounded-lg py-5 px-5' style={{ overflowY: 'auto' }}>
          <h2 className="text-5xl font-bold text-center mb-4 text-white">Edit Tables</h2>
          <h3 className="text-m mb-4 text-white">Please select a table to edit</h3>
          
          <div>
            <center>
              {tables.map((table, index) => (
                <MaterialButton
                table={table}
                index={index}
                is_upper={true}
                text_color='rgb(230, 230, 230)'
                onClick={() => handleEditTable(table)}
              />
              ))}
            </center>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Edit_Table_Attributes;
