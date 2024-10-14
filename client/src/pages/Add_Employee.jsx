import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import CustomAlert from '../components/CustomAlert';

const ADD_Employee = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [customAttributes, setCustomAttributes] = useState([]);
  const [custom_values, setCustomValues] = useState({});
  const [loading, setLoading] = useState(false);

  const [employeeData, setEmployeeData] = useState({
    NIC: '',
    initials: '',
    first_Name: '',
    last_Name: '',
    date_of_birth: '',
    gender: '',
    marital_status: '',
    phone: '',
    email_work: '',
    email_private: '',
    address: '',
    department: '',
    title: '',
    paygrade: '',
    employment_stat: '',
    pf_number: '',
    supervisor: '',
    dependents: [],
    emergency_contacts: [],
    picture: null,
    custom_values: custom_values
  });

  const [dependent, setDependent] = useState({
    name: '',
    relationship: ''
  });

  const [emergencyContact, setEmergencyContact] = useState({
    first_Name: '',
    last_Name: '',
    phone: '',
    email: '',
    address: '',
    relationship: ''
  });

  const [dropdownOptions, setDropdownOptions] = useState({
    departments: [],
    titles: [],
    paygrades: [],
    employmentStats: [],
    employee_list: []
  });

  const detdropdonwdata = async () => {
    try {
      const res = await axios.get('http://localhost:5555/employeeTable/get_dropdown_options', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (res.data.success) {
        const {
          titles,
          paygrades,
          departments,
          employment_statuses,
          employee_list,
        } = res.data.data;

        setDropdownOptions({
          titles: titles || [],
          paygrades: paygrades || [],
          departments: departments || [],
          employmentStats: employment_statuses || [],
          employee_list: employee_list || [],
        });
      } else {
        console.log('Error: Failed to fetch dropdown data');
        setAlertMessage('Error: Failed to fetch dropdown data');
        setShowAlert(true);
      }
    } catch (error) {
      console.log('Error fetching dropdown data:', error);
    } finally {
    }
  };

  useEffect(() => {
    detdropdonwdata();
    fetchCustomAttributes();
  }, []);

  const handleEmployeeChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleDependentChange = (e) => {
    const { name, value } = e.target;
    setDependent({ ...dependent, [name]: value });
  };

  const addDependent = () => {
    if (dependent.name && dependent.relationship) {
      setEmployeeData({
        ...employeeData,
        dependents: [...employeeData.dependents, dependent] // Add dependent to the array
      });
      setDependent({ name: '', relationship: '' }); // Reset dependent fields
    } else {
      console.log('Please fill in both dependent fields.');
      setAlertMessage('Please fill in both dependent fields.');
      setShowAlert(true);
    }
  };

  const removeDependent = (index) => {
    const updatedDependents = employeeData.dependents.filter((_, i) => i !== index);
    setEmployeeData({
      ...employeeData,
      dependents: updatedDependents
    });
  };

  const fetchCustomAttributes = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5555/employeeTable/get_available_custom_fields', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (response.data.success) {
        const customFieldsData = response.data.data.custom_fields;
        setCustomAttributes(customFieldsData); 
      } else {
        console.log('Error: Failed to fetch custom fields');
      }
    } catch (error) {
      console.log('Error fetching custom fields:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomChange = (e) => {
    const { name, value } = e.target;
    setCustomValues({
      ...custom_values,
      [name]: value,
    });
    setEmployeeData({
      ...employeeData,
      custom_values: {
        ...custom_values,
        [name]: value,
      },
    });
  };

   const handleEmergencyContactChange = (e) => {
    const { name, value } = e.target;
    setEmergencyContact({ ...emergencyContact, [name]: value });
  };

  const addEmergencyContact = () => {
    if (
      emergencyContact.first_Name &&
      emergencyContact.last_Name &&
      emergencyContact.phone &&
      emergencyContact.email &&
      emergencyContact.address &&
      emergencyContact.relationship
    ) {
      setEmployeeData({
        ...employeeData,
        emergency_contacts: [...(employeeData.emergency_contacts || []), emergencyContact],
      });
      setEmergencyContact({
        first_Name: '',
        last_Name: '',
        phone: '',
        email: '',
        address: '',
        relationship: '',
      });
    } else {
      console.log('Please fill in all emergency contact fields.');
      setAlertMessage('Please fill in all emergency contact fields.');
      setShowAlert(true);
    }
  };

  const removeEmergencyContact = (index) => {
    const updatedContacts = employeeData.emergency_contacts.filter((_, i) => i !== index);
    setEmployeeData({
      ...employeeData,
      emergency_contacts: updatedContacts
    });
  };

// Function to handle file input change
const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setEmployeeData({ ...employeeData, picture: file }); // Store the file in state
    }
};

// Handle form submit with file and data
const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();

  // Append all employee data fields
  for (const key in employeeData) {
    if (key === 'dependents' || key === 'emergency_contacts') {
      formData.append(key, JSON.stringify(employeeData[key])); // Serialize arrays as JSON
    } else if (key === 'custom_values') {
      formData.append(key, JSON.stringify(employeeData.custom_values)); // Serialize custom attributes
    } else {
      formData.append(key, employeeData[key]);
    }
  }

  try {
    const response = await axios.post('http://localhost:5555/employeeTable/add_employee', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.data.success) {
      detdropdonwdata();
      // Reset form after submission
      setEmployeeData({
        NIC: '',
        initials: '',
        first_Name: '',
        last_Name: '',
        date_of_birth: '',
        gender: '',
        marital_status: '',
        phone: '',
        email_work: '',
        email_private: '',
        address: '',
        department: '',
        title: '',
        paygrade: '',
        employment_stat: '',
        pf_number: '',
        supervisor: '',
        dependents: [],
        emergency_contacts: [],
        picture: null,
        custom_values: {},
      });
      setCustomValues({});  // Clear custom values
    }
    setAlertMessage(response.data.data);
    setShowAlert(true);

    
  } catch (error) {
    console.error('Error adding employee:', error);
  }
};

  return (
    <Layout>
      <div className='max-h-full h-full rounded-lg shadow-2xl shadow-black'>
        <section className='bg-gray-300 min-h-full h-full rounded-lg py-5 px-5' style={{ overflowY: 'auto' }} >
          
          <h2 className="text-xl mb-4">Add Employee</h2>

          {showAlert && (
            <CustomAlert 
              message={alertMessage} 
              onClose={() => setShowAlert(false)} // Close alert when dismissed
            />
          )}

          <form onSubmit={handleSubmit}>
            <table className="w-full mb-4">
              <tbody>
                <tr>
                  <td><label htmlFor="NIC">NIC:</label></td>
                  <td><input
                    type="text"
                    id="NIC"
                    name="NIC"
                    value={employeeData.NIC}
                    onChange={handleEmployeeChange}
                    className="border p-2 w-full"
                    required
                  /></td>
                </tr>
                <tr>
                  <td><label htmlFor="initials">Initials:</label></td>
                  <td><input
                    type="text"
                    id="initials"
                    name="initials"
                    value={employeeData.initials}
                    onChange={handleEmployeeChange}
                    className="border p-2 w-full"
                    required
                  /></td>
                </tr>
                <tr>
                  <td><label htmlFor="first_Name">First Name:</label></td>
                  <td><input
                    type="text"
                    id="first_Name"
                    name="first_Name"
                    value={employeeData.first_Name}
                    onChange={handleEmployeeChange}
                    className="border p-2 w-full"
                    required
                  /></td>
                </tr>
                <tr>
                  <td><label htmlFor="last_Name">Last Name:</label></td>
                  <td><input
                    type="text"
                    id="last_Name"
                    name="last_Name"
                    value={employeeData.last_Name}
                    onChange={handleEmployeeChange}
                    className="border p-2 w-full"
                    required
                  /></td>
                </tr>
                <tr>
                  <td><label htmlFor="date_of_birth">Date of Birth:</label></td>
                  <td><input
                    type="date"
                    id="date_of_birth"
                    name="date_of_birth"
                    value={employeeData.date_of_birth}
                    onChange={handleEmployeeChange}
                    className="border p-2 w-full"
                    required
                  /></td>
                </tr>
                <tr>
                <td><label htmlFor="gender">Gender:</label></td>
                <td>
                    <select
                        id="gender"
                        name="gender"
                        value={employeeData.gender}
                        onChange={handleEmployeeChange}
                        className="border p-2 w-full"
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td><label htmlFor="marital_status">Marital Status:</label></td>
                <td>
                    <select
                        id="marital_status"
                        name="marital_status"
                        value={employeeData.marital_status}
                        onChange={handleEmployeeChange}
                        className="border p-2 w-full"
                        required
                    >
                        <option value="">Select Marital Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                    </select>
                </td>
            </tr>
                <tr>
                  <td><label htmlFor="phone">Phone:</label></td>
                  <td><input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={employeeData.phone}
                    onChange={handleEmployeeChange}
                    className="border p-2 w-full"
                    required
                  /></td>
                </tr>
                <tr>
                  <td><label htmlFor="email_work">Work Email:</label></td>
                  <td><input
                    type="email"
                    id="email_work"
                    name="email_work"
                    value={employeeData.email_work}
                    onChange={handleEmployeeChange}
                    className="border p-2 w-full"
                    required
                  /></td>
                </tr>
                <tr>
                  <td><label htmlFor="email_private">Private Email:</label></td>
                  <td><input
                    type="email"
                    id="email_private"
                    name="email_private"
                    value={employeeData.email_private}
                    onChange={handleEmployeeChange}
                    className="border p-2 w-full"
                    required
                  /></td>
                </tr>
                <tr>
                  <td><label htmlFor="address">Address:</label></td>
                  <td><input
                    type="text"
                    id="address"
                    name="address"
                    value={employeeData.address}
                    onChange={handleEmployeeChange}
                    className="border p-2 w-full"
                    required
                  /></td>
                </tr>
                <tr>
                <td><label htmlFor="department">Department:</label></td>
                <td>
                  <select
                    id="department"
                    name="department"
                    value={employeeData.department}
                    onChange={handleEmployeeChange}
                    className="border p-2 w-full"
                    required
                  >
                    <option value="">None</option>
                    {dropdownOptions.departments.map((dept, index) => (
                      <option key={index} value={dept}>{dept}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td><label htmlFor="title">Title:</label></td>
                <td>
                  <select
                    id="title"
                    name="title"
                    value={employeeData.title}
                    onChange={handleEmployeeChange}
                    className="border p-2 w-full"
                    required
                  >
                    <option value="">None</option>
                    {dropdownOptions.titles.map((title, index) => (
                      <option key={index} value={title}>{title}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td><label htmlFor="paygrade">Paygrade:</label></td>
                <td>
                  <select
                    id="paygrade"
                    name="paygrade"
                    value={employeeData.paygrade}
                    onChange={handleEmployeeChange}
                    className="border p-2 w-full"
                    required
                  >
                    <option value="">None</option>
                    {dropdownOptions.paygrades.map((paygrade, index) => (
                      <option key={index} value={paygrade}>{paygrade}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td><label htmlFor="employment_stat">Employment Status:</label></td>
                <td>
                  <select
                    id="employment_stat"
                    name="employment_stat"
                    value={employeeData.employment_stat}
                    onChange={handleEmployeeChange}
                    className="border p-2 w-full"
                    required
                  >
                    <option value="">None</option>
                    {dropdownOptions.employmentStats.map((status, index) => (
                      <option key={index} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
              </tr>
                <tr>
                  <td><label htmlFor="pf_number">PF Number:</label></td>
                  <td><input
                    type="text"
                    id="pf_number"
                    name="pf_number"
                    value={employeeData.pf_number}
                    onChange={handleEmployeeChange}
                    className="border p-2 w-full"
                    required
                  /></td>
                </tr>
                <tr>
                <td><label htmlFor="employm">Supervisor:</label></td>
                <td>
                  <select
                    id="supervisor"
                    name="supervisor"
                    value={employeeData.supervisor}
                    onChange={handleEmployeeChange}
                    className="border p-2 w-full"
                  >
                    <option value="">None</option>
                    {dropdownOptions.employee_list.map((status, index) => (
                      <option key={index} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
                </tr>
              </tbody>
            </table>

            {/* Dependent Section */}
            <h3 className="text-lg mb-2">Add Dependent</h3>
            <table className="w-full mb-4">
              <tbody>
                <tr>
                  <td><label htmlFor="dep_name">Dependent Name:</label></td>
                  <td><input
                    type="text"
                    id="dep_name"
                    name="name"
                    value={dependent.name}
                    onChange={handleDependentChange}
                    className="border p-2 w-full"
                  /></td>
                </tr>
                <tr>
                  <td><label htmlFor="relationship">Relationship:</label></td>
                  <td><input
                    type="text"
                    id="relationship"
                    name="relationship"
                    value={dependent.relationship}
                    onChange={handleDependentChange}
                    className="border p-2 w-full"
                  /></td>
                </tr>
              </tbody>
            </table>
            <button type="button" onClick={addDependent} className="bg-green-500 text-white p-2 rounded-lg mb-4">Add Dependent</button>

            {/* Dependents Table */}
            <h3 className="text-lg mb-2">Dependents List</h3>
            <table className="w-full mb-4">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Relationship</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {employeeData.dependents && employeeData.dependents.length > 0 ? (
                  employeeData.dependents.map((dep, index) => (
                    <tr key={index}>
                      <td>{dep.name}</td>
                      <td>{dep.relationship}</td>
                      <td>
                        <button type="button" onClick={() => removeDependent(index)} className="bg-red-500 text-white p-1 rounded">Remove</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No dependents added.</td>
                  </tr>
                )}
              </tbody>
            </table>
            
            {/* Emergency Contacts Section */}
            <h3 className="text-lg mb-2">Add Emergency Contacts</h3>
            <table className="w-full mb-4">
              <tbody>
                <tr>
                  <td><label htmlFor="con_fname">First Name:</label></td>
                  <td><input
                    type="text"
                    id="con_fname"
                    name="first_Name"
                    value={emergencyContact.first_Name}
                    onChange={handleEmergencyContactChange}
                    className="border p-2 w-full"
                  /></td>
                </tr>
                <tr>
                  <td><label htmlFor="con_lname">Last Name:</label></td>
                  <td><input
                    type="text"
                    id="con_lname"
                    name="last_Name"
                    value={emergencyContact.last_Name}
                    onChange={handleEmergencyContactChange}
                    className="border p-2 w-full"
                  /></td>
                </tr>
                <tr>
                  <td><label htmlFor="con_phone">Phone:</label></td>
                  <td><input
                    type="text"
                    id="con_phone"
                    name="phone"
                    value={emergencyContact.phone}
                    onChange={handleEmergencyContactChange}
                    className="border p-2 w-full"
                  /></td>
                </tr>
                <tr>
                  <td><label htmlFor="con_name">Email:</label></td>
                  <td><input
                    type="text"
                    id="con_email"
                    name="email"
                    value={emergencyContact.email}
                    onChange={handleEmergencyContactChange}
                    className="border p-2 w-full"
                  /></td>
                </tr>
                <tr>
                  <td><label htmlFor="con_address">Address:</label></td>
                  <td><input
                    type="text"
                    id="con_address"
                    name="address"
                    value={emergencyContact.address}
                    onChange={handleEmergencyContactChange}
                    className="border p-2 w-full"
                  /></td>
                </tr>
                <tr>
                  <td><label htmlFor="con_relationship">Relationship:</label></td>
                  <td><input
                    type="text"
                    id="con_relationship"
                    name="relationship"
                    value={emergencyContact.relationship}
                    onChange={handleEmergencyContactChange}
                    className="border p-2 w-full"
                  /></td>
                </tr>
              </tbody>
            </table>
            <button type="button" onClick={addEmergencyContact} className="bg-green-500 text-white p-2 rounded-lg mb-4">
              Add Emergency Contact
            </button>

            {/* Emergency Contact Table */}
            <h3 className="text-lg mb-2 ">Emergency Contact List</h3>
            <table className="w-full mb-4 ">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Relationship</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {employeeData.emergency_contacts && employeeData.emergency_contacts.length > 0 ? (
                  employeeData.emergency_contacts.map((con, index) => (
                    <tr key={index}>
                      <td>{con.first_Name} {con.last_Name}</td>
                      <td>{con.phone}</td>
                      <td>{con.relationship}</td>
                      <td>
                        <button type="button" onClick={() => removeEmergencyContact(index)} className="bg-red-500 text-white p-1 rounded">
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No emergency contacts added.</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Picture Upload Section */}
            <h3 className="text-lg mb-2">Upload Picture</h3>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="border p-2 w-full mb-4"
                        required
                    />

            {/* Custom Attributes Form */}
            <h3 className="text-lg mb-2">Custom Fields</h3>
                  {loading ? (
                    <p>Loading custom attributes...</p>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>Field</th>
                          <th>Data</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customAttributes.map((field, index) => (
                          <tr key={index}>
                            <td>
                              <label>{field}: </label>
                            </td>
                            <td>
                              <input
                                type="text"
                                name={field}
                                value={custom_values[field] || ''}
                                onChange={handleCustomChange}
                                style={{ width: '140%' }}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

            <h1 className="text-lg mb-2"> </h1>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">Add Employee</button>
                </form>
            </section>
        </div>
    </Layout>
  );
};

export default ADD_Employee;