import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import CustomAlert from '../components/CustomAlert';
import MaterialButton from '../components/MaterialButton';
import { useSelector } from 'react-redux'; // To get the current user's data
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { storage } from '../../config/firebase.config'; // Adjust the path as needed
import api from '../axios'; 


const ADD_Employee = () => {
  //const { user } = useSelector((state) => sta te.user); // Get current user from Redux store

  const { currentuser } = useSelector((state) => state.user); // Get current user from Redux store
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [customAttributes, setCustomAttributes] = useState([]);
  const [custom_values, setCustomValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [downloadUrl,setDownloadUrl]=useState('');
  //const storage = getStorage();

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
    picture: '',
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
      const res = await api.get('/employeeTable/get_dropdown_options', {
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
      const response = await api.get('/employeeTable/get_available_custom_fields', {
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
const handleFileChangee = (e) => {
    const file = e.target.files[0];
    if (file) {
        setEmployeeData({ ...employeeData, picture: file }); // Store the file in state
    }
};
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
      //setEmployeeData({ ...employeeData, picture: file }); // Store the file in state
      uploadFile(file); // Call upload function with the file
  }
};

const uploadFile = async (file) => {
  console.log('Uploading image...');

  try {
      // Create a storage reference
      const storageRef = ref(storage, `userProfileImages/${Date.now()}.jpg`); // Use the storage instance directly

      // Upload the file to Firebase Storage
      await uploadBytes(storageRef, file); // Directly upload the file

      console.log('Uploaded a blob or file!');
      // Get the download URL of the uploaded image
      const url = await getDownloadURL(storageRef);
      setDownloadUrl(url)
      setEmployeeData({ ...employeeData, picture: url });
      console.log('File available at:', url);



      // Update the Firestore document for the current user
      
      console.log('Profile photo updated successfully!');
  } catch (error) {
      console.error('Error uploading profile image:', error);
  }
};

const handleFileChanges = (event) => {
  //console.log(currentuser.User_ID)
  const file = event.target.files[0];
  console.log('Selected file:', file); // Debugging output
  if (file) {
      uploadFile(file, currentuser); // Pass currentuser to uploadFile
  } else {
      console.error('No file selected');
  }
};

const uploadFilee = async (file, currentuser) => {
  console.log("current user console",currentuser.User_ID)
  console.log('Uploading image...');
  
  console.log("fddfgzsd",state.user);


  try {
      if (!currentuser) {
          console.error('Current user is not defined or does not have User_ID');
          return; // Exit early
      }

      const storageRef = ref(storage, `userProfileImages/${Date.now()}.jpg`);

      await uploadBytes(storageRef, file);
      console.log('Uploaded a blob or file!');

      const downloadUrl = await getDownloadURL(storageRef);
      console.log('File available at:', downloadUrl);

      const userDocRef = doc(firestoreDB, 'users', currentuser.User_ID);
      await setDoc(userDocRef, { profilePhoto: downloadUrl }, { merge: true });

      console.log('Profile photo updated successfully!');
  } catch (error) {
      console.error('Error uploading profile image:', error);
  }
};


// Handle form submit with file and data
const handleSubmit = async (e) => {
  e.preventDefault();

  // Prepare employee data
  const formattedData = { ...employeeData };
  
  // Serialize complex objects as JSON strings
  formattedData.dependents = JSON.stringify(employeeData.dependents);
  formattedData.emergency_contacts = JSON.stringify(employeeData.emergency_contacts);
  formattedData.custom_values = JSON.stringify(employeeData.custom_values);

  try {

    const response = await api.post('/employeeTable/add_employee', formattedData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });


    if (response.data.success) {
      detdropdonwdata(); // Refresh dropdown data

      // Reset the form after submission
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
        picture: '',
        custom_values: {},
      });

      setCustomValues({}); // Clear custom values
    }

    // Show success alert
    setAlertMessage(response.data.data);
    setShowAlert(true);

  } catch (error) {
    // Handle error and show alert
    setAlertMessage(error.response?.data?.data || 'Error occurred while adding employee');
    setShowAlert(true);
    console.error('Error adding employee:', error);
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
          <h2 className="text-xl mb-4 text-white">Add Employee</h2>
          <form onSubmit={handleSubmit}>
            <table className="w-full mb-4 text-white">
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
                    style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: "white", borderColor:'white', borderRadius:"8px"}}
                    required
                    maxLength={20}
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
                    style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: "white", borderColor:'white', borderRadius:"8px"}}
                    required
                    maxLength={20}
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
                    style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: "white", borderColor:'white', borderRadius:"8px"}}
                    required
                    maxLength={20}
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
                    style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: "white", borderColor:'white', borderRadius:"8px"}}
                    required
                    maxLength={20}
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
                    style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: "white", borderColor:'white', borderRadius:"8px"}}
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
                        style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: "white", borderColor:'white', borderRadius:"8px"}}
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
                        style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: "white", borderColor:'white', borderRadius:"8px"}}
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
                    style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: "white", borderColor:'white', borderRadius:"8px"}}
                    required
                    maxLength={20}
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
                    style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: "white", borderColor:'white', borderRadius:"8px"}}
                    required
                    maxLength={50}
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
                    style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: "white", borderColor:'white', borderRadius:"8px"}}
                    required
                    maxLength={50}
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
                    style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: "white", borderColor:'white', borderRadius:"8px"}}
                    required
                    maxLength={255}
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
                    style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: "white", borderColor:'white', borderRadius:"8px"}}
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
                    style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: "white", borderColor:'white', borderRadius:"8px"}}
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
                    style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: "white", borderColor:'white', borderRadius:"8px"}}
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
                    style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: "white", borderColor:'white', borderRadius:"8px"}}
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
                    style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: "white", borderColor:'white', borderRadius:"8px"}}
                    required
                    maxLength={50}
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
                    style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: "white", borderColor:'white', borderRadius:"8px"}}
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
            <div style={{borderTop: '2px solid white',width: '100%', margin: '20 0px'}}></div>
            {/* Dependent Section */}
            <h3 className="text-lg mb-2 text-white">Add Dependent</h3>
            <table className="w-full mb-4 text-white">
              <tbody>
                <tr>
                  <td><label htmlFor="dep_name">Dependent Name:</label></td>
                  <td><input
                    type="text"
                    id="dep_name"
                    name="name"
                    value={dependent.name}
                    onChange={handleDependentChange}
                    maxLength={20}
                    className="border p-2 w-full"
                    style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: "white", borderColor:'white', borderRadius:"8px"}}
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
                    maxLength={20}
                    className="border p-2 w-full"
                    style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: "white", borderColor:'white', borderRadius:"8px"}}
                  /></td>
                </tr>
              </tbody>
            </table>
            <MaterialButton
              table="Add Dependent"
              onClick={addDependent}
              variant="success"
              text_color="white"
              text_size="14px"
              margin="2px"
            />
            {/* Dependents Table */}
            <h3 className="text-lg mb-2 text-white">Dependents List</h3>
            <table className="w-full mb-4 text-white">
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
                      <MaterialButton
                        table="Remove"
                        onClick={() => removeDependent(index)}
                        variant="delete"
                        text_color="white"
                        text_size="12px"
                        margin="0px"
                      />
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
            <div style={{borderTop: '2px solid white',width: '100%', margin: '20 0px'}}></div>
            {/* Emergency Contacts Section */}
            <h3 className="text-lg mb-2 text-white">Add Emergency Contacts</h3>
            <table className="w-full mb-4 text-white">
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
                    maxLength={20}
                    style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: "white", borderColor:'white', borderRadius:"8px"}}
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
                    maxLength={20}
                    style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: "white", borderColor:'white', borderRadius:"8px"}}
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
                    maxLength={20}
                    style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: "white", borderColor:'white', borderRadius:"8px"}}
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
                    maxLength={50}
                    style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: "white", borderColor:'white', borderRadius:"8px"}}
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
                    maxLength={255}
                    style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: "white", borderColor:'white', borderRadius:"8px"}}
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
                    maxLength={20}
                    style={{ backgroundColor: 'rgba(40, 40, 40, 0.8)', color: "white", borderColor:'white', borderRadius:"8px"}}
                  /></td>
                </tr>
              </tbody>
            </table>
            <MaterialButton
              table="Add Emergency Contact"
              onClick={addEmergencyContact}
              variant="success"
              text_color="white"
              text_size="14px"
              margin="2px"
            />


            {/* Emergency Contact Table */}
            <h3 className="text-lg mb-2 text-white ">Emergency Contact List</h3>
            <table className="w-full mb-4  text-white">
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
                      <MaterialButton
                        table="Remove"
                        onClick={() => removeEmergencyContact(index)}
                        variant="delete"
                        text_color="white"
                        text_size="12px"
                        margin="0px"
                      />

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
            <h3 className="text-lg mb-2 text-white">Upload Picture</h3>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="border p-2 w-full mb-4 text-white"
                        required
                    />


            <div style={{borderTop: '2px solid white',width: '100%', margin: '20 0px'}}></div>
            {/* Custom Attributes Form */}
            <h3 className="text-lg mb-2 text-white">Custom Fields</h3>
                  {loading ? (
                    <p>Loading custom attributes...</p>
                  ) : (
                    <table className="w-full mb-4  text-white">
                      <thead>
                        <tr>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {customAttributes.map((field, index) => (
                          <tr key={index}>
                            <td>
                              <label htmlFor="con_fname">{field}: </label>
                            </td>
                            <td>
                              <input
                                type="text"
                                name={field}
                                value={custom_values[field] || ''}
                                onChange={handleCustomChange}
                                maxLength={50}
                                style={{ width: '100%', backgroundColor: 'rgba(40, 40, 40, 0.8)', color: "white", border: '2px solid white', borderRadius:"5px"}}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

            <h1 className="text-lg mb-2 text-white"> </h1>
                    <MaterialButton
                      table="Add Employee"
                      onClick={handleSubmit}
                      text_color="white"
                      text_size="16px"
                      margin="0px"
                    />

                </form>
            </section>
        </div>
    </Layout>
  );
};

export default ADD_Employee;