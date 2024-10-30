import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import CustomAlert from '../components/CustomAlert';
import MaterialButton from '../components/MaterialButton';
import api from '../axios';

const Manage_Custom_Fields = () => {
  const [customField, setCustomField] = useState('');
  const [customFields, setCustomFields] = useState([]);
  const [loading, setLoading] = useState(false);

  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);


  const fetchCustomFields = async () => {
    setLoading(true);
    try {
      const response = await api.get('/employeeTable/get_available_custom_fields', {
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
      setAlertMessage(error.response.data.data);
      setShowAlert(true);
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
      const response = await api.post('/employeeTable/add_custom_field', { name: customField }, {
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
      setAlertMessage(error.response.data.data);
      setShowAlert(true);
      console.error('Error adding custom field:', error);
    } finally {
      setShowAlert(true);
    }
  };

  const removeCustomField = async (NAME) => {
    if (window.confirm('Are you sure you want to delete this CustomField?')) {
      try {
        const response = await api.post('/employeeTable/delete_custom_field', { name: NAME }, {
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
        setAlertMessage(error.response.data.data);
        setShowAlert(true);
        console.error('Error removing custom field:', error);
      } finally {
        setShowAlert(true);
      }
    }
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
          <h2 className="text-5xl text-center font-bold mb-4 text-white">Add Custom Field</h2>
          <form onSubmit={addCustomField}>
            <input
              type="text"
              value={customField}
              onChange={handleInputChange}
              className="border p-2 w-full mb-4"
              placeholder="Enter custom field name"
              maxLength={20}
              style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: "white", borderColor:'white', borderRadius:"8px"}}
            />
            <MaterialButton
                table="Add Custom Field"
                onClick={addCustomField}
                variant="success"
                text_color="white"
                text_size="16px"
                margin="0px"
              />
          </form>

          {/* Custom Fields Table */}
          <h3 className="text-lg mb-2 text-white">Custom Fields List</h3>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="w-full mb-4 text-white">
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
                      <MaterialButton
                        table="Remove"
                        onClick={() => removeCustomField(field.name)}
                        variant="delete"
                        text_color="white"
                        text_size="14px"
                        margin="0px"
                      />
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
