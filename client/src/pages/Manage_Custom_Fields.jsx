import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import CustomAlert from '../components/CustomAlert';

const Manage_Custom_Fields = () => {
  const [customField, setCustomField] = useState('');
  const [customFields, setCustomFields] = useState([]);
  const [loading, setLoading] = useState(false);

  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);


  const fetchCustomFields = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5555/employeeTable/get_available_custom_fields', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
  
      if (response.data.success) {
        // Accessing the custom_fields correctly
        const customFieldsData = response.data.data.custom_fields;
        const formattedFields = customFieldsData.map((field, index) => ({ id: index, name: field }));
  
        setCustomFields(formattedFields); 
      } else {
        console.log('Error: Failed to fetch custom fields');
      }
    } catch (error) {
      console.log('Error fetching custom fields:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchCustomFields();
  }, []);

  const handleInputChange = (e) => {
    setCustomField(e.target.value);
  };

  const addCustomField = async (e) => {
    e.preventDefault();
    if (!customField) {
      setAlertMessage('Please enter a custom field name.');
      setShowAlert(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5555/employeeTable/add_custom_field', { name: customField }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        setCustomField(''); // Reset input field
        await fetchCustomFields();  // Ensure it completes fetching before continuing
        console.log(customFields);  // Check if customFields gets updated
      }
      setAlertMessage(response.data.data);

    } catch (error) {
      console.error('Error adding custom field:', error);
    } finally {
      setShowAlert(true);
    }
  };

  const removeCustomField = async (NAME) => {
    try {
      const response = await axios.post('http://localhost:5555/employeeTable/delete_custom_field', { name: NAME }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        fetchCustomFields(); // Refresh custom fields list
      } else {
        setAlertMessage('Error: Failed to remove custom field');
      }
      setAlertMessage(response.data.data);
    } catch (error) {
      console.error('Error removing custom field:', error);
    } finally {
      setShowAlert(true);
    }
  };

  return (
    <Layout>
      <div className='max-h-full h-full rounded-lg shadow-2xl shadow-black'>
        <section className='bg-gray-300 min-h-full h-full rounded-lg py-5 px-5' style={{ overflowY: 'auto' }}>
          <h2 className="text-xl mb-4">Add Custom Field</h2>
          <form onSubmit={addCustomField}>
            <input
              type="text"
              value={customField}
              onChange={handleInputChange}
              className="border p-2 w-full mb-4"
              placeholder="Enter custom field name"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">Add Custom Field</button>
          </form>

          {showAlert && (
            <CustomAlert 
              message={alertMessage} 
              onClose={() => setShowAlert(false)} // Close alert when dismissed
            />
          )}


          {/* Custom Fields Table */}
          <h3 className="text-lg mb-2">Custom Fields List</h3>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="w-full mb-4">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {customFields.length > 0 ? (
                  customFields.map((field) => (
                    <tr key={field.id}>
                      <td>{field.name}</td>
                      <td>
                        <button 
                          type="button" 
                          onClick={() => removeCustomField(field.name)} 
                          className="bg-red-500 text-white p-1 rounded"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2">No custom fields added.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default Manage_Custom_Fields;
