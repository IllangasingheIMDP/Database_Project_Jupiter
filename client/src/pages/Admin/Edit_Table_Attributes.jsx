import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import { useNavigate } from 'react-router-dom';

const Edit_Table_Attributes = () => {
  const [tables, setTables] = useState([]);
  const navigate = useNavigate();
  
  // Function to fetch table names
  const fetchTableNames = async () => {
    try {
      const res = await axios.get('http://localhost:5555/admin/getTables', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (res.data.success) {
        setTables(res.data.data);
      } else {
        console.error('Failed to fetch tables');
      }
    } catch (error) {
      console.error('Error fetching table names:', error);
      setAlertMessage(error.response.data.data);
      setShowAlert(true);
    }
  };

  // Fetch table names when the component mounts
  useEffect(() => {
    fetchTableNames();
  }, []);

  const handleEditTable = (tableName) => {
    console.log(`Editing table: ${tableName}`);
    navigate(`/edit-table-data/${tableName}`);
  };

  return (
    <Layout>
      <div className='max-h-full h-full rounded-lg shadow-2xl shadow-black'>
        <section className='bg-gray-300 min-h-full h-full rounded-lg py-5 px-5' style={{ overflowY: 'auto' }}>
          <h2 className="text-xl mb-4">Edit Tables</h2>
          <h3 className="text-m mb-4">Please select a table to edit</h3>
          <div>
            {tables.map((table, index) => (
              <button
                key={index}
                className="bg-green-500 text-white p-2 rounded-lg mb-2 w-full"
                style={{ maxWidth: '250px', margin: '10px', textTransform: 'uppercase'}}
                onClick={() => handleEditTable(table)}
              >
                {table.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Edit_Table_Attributes;
