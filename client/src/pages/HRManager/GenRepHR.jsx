import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './GenRepHR.css';
import api from '../../axios';
  

const GenRepHR = () => {
  const navigate = useNavigate();
  const [showOB, setShowOB] = useState(false);
  const [showE, setShowE] = useState(false);
  const [nic, setNic] = useState(""); 
  const [name, setName] = useState("");
  const [showEBD, setShowEBD] = useState(false);
  const [showEBB, setShowEBB] = useState(false);
  const [showEBP, setShowEBP] = useState(false);
  const [showEBT, setShowEBT] = useState(false);
  const [showLB, setShowLB] = useState(false);
  const [showLR, setShowLR] = useState(false);
  const [showLPR, setShowLPR] = useState(false);
  const [showLRR, setShowLRR] = useState(false);
  const [showCF, setShowCF] = useState(false);
  const [validated, setValidated] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [titles, setTitles] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [branches, setBranches] = useState([]);
  const [payGrades, setPayGrades] = useState([]);
  const [customFields, setCustomFields] = useState([]);
  const [selectedOrganizationID, setSelectedOrganizationID] = useState('');
  const [selectedDepartmentID, setSelectedDepartmentID] = useState('');
  const [selectedTitleID, setSelectedTitleID] = useState('');
  const [selectedStatusID, setSelectedStatusID] = useState('');
  const [selectedBranchID, setSelectedBranchID] = useState('');
  const [selectedPayGradeID, setSelectedPayGradeID] = useState('');
  const [selectedCustomFieldID, setSelectedCustomFieldID] = useState('');
  const [selectedFromDate, setSelectedFromDate] = useState('');
  const [selectedToDate, setSelectedToDate] = useState('');
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    const fetchDropdownOptions = async () => {
      try {
        const response = await api.get('/genarateReport/get_dropdown_options', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,  // Added Authorization header
          },
        });
      
        console.log(response.data);  // Check the structure of the fetched data
        if (response.data.success) {
          setOrganizations(response.data.data.organization || []);
          setDepartments(response.data.data.departments || []);
          setTitles(response.data.data.titles || []);
          setStatuses(response.data.data.employment_statuses || []);
          setBranches(response.data.data.branches || []);
          setPayGrades(response.data.data.pay_grades || []);
          setCustomFields(response.data.data.cutom_field || [])  // Update here to match the returned key
        } else {
          console.error('Failed to fetch dropdown options');
        }
      } catch (error) {
        console.error('Error fetching dropdown options:', error);
      }
      
    };
    
    fetchDropdownOptions();
  }, []);

  // Handle the form submission
  const handleOB = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      await handleOBGen();
    }
    setValidated(true);
  };

  const handleOBGen = async () => {
    try {
      const response = await api.post(
        '/genarateReport/get_branch_details',  // Adjusted API endpoint
        {
          organization: selectedOrganizationID || 0,  // Default to 0 if not selected
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      if (response.data.success) {
        console.log('Employee data fetched successfully:', response.data.data);
        setFetchedData(response.data.data);  // Store data to display in the modal
        setShowOB(true);  // Show the modal on success
      } else {
        setAlertMessage('Error: No matching data found');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error fetching employee details:', error);
      setAlertMessage('Error: Unable to fetch employee details');
      setShowAlert(true);
    }
  };  

  const handleDownloadOB = () => {
    const doc = new jsPDF();

    const organization = organizations.find(org => org.id === Number(selectedOrganizationID))?.name || "All Organizations";
    // Define the title for the PDF
    const headingText = `Branches of ${organization}`;
    
    // Add the heading to the PDF at the top
    doc.setFontSize(16);
    doc.text(headingText, 10, 10);

    // Define columns for the table
    const columns = [
        { header: 'Organization Name', dataKey: 'Organization Name' },
        { header: 'Registration No', dataKey: 'Registration No' },
        { header: 'Head Office', dataKey: 'Head Office' },
        { header: 'Branch Name', dataKey: 'Branch Name' }
    ];

    // Check if there is data to export
    if (fetchedData && fetchedData.length > 0) {
        doc.autoTable({
            head: [columns.map(col => col.header)],
            body: fetchedData.map(org => columns.map(col => org[col.dataKey])),
            startY: 20,
            theme: 'grid',
            styles: { fontSize: 10 }
        });

        const now = new Date();
        const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
        const fileName = `Branches of ${organization} on ${formattedDate}.pdf`;
        doc.save(fileName);
    } else {
        alert('No data available to export.');
    }
  };

  // Handle the form submission
  const handleE = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      await handleEGen();
    }
    setValidated(true);
  };

  const handleEGen = async () => {
    try {
      const response = await api.post(
        '/genarateReport/get_employee_details',  // Adjusted API endpoint
        {
          nic: nic || '',  // Default to 0 if not selected
          name: name || '',
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      if (response.data.success) {
        console.log('Employee data fetched successfully:', response.data.data);
        setFetchedData(response.data.data);  // Store data to display in the modal
        setShowE(true);  // Show the modal on success
      } else {
        setAlertMessage('Error: No matching data found');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error fetching employee details:', error);
      setAlertMessage('Error: Unable to fetch employee details');
      setShowAlert(true);
    }
  };  

  const handleDownloadE = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Employee Details", 10, 10);
    
    if (fetchedData && fetchedData.length > 0) {
        const employee = fetchedData[0]; // Assuming we want to export the first employee record

        // Set starting Y position for text
        let y = 20;

        // Define employee details to display
        const employeeDetails = [
            { label: "Full Name:", value: employee.Full_Name },
            { label: "NIC:", value: employee.NIC },
            { label: "Gender:", value: employee.Gender },
            { label: "Work Email:", value: employee.Email_Work },
            { label: "Private Email:", value: employee.Email_Private },
            { label: "Phone:", value: employee.Phone },
            { label: "Address:", value: employee.Address },
            { label: "Department:", value: employee.Department },
            { label: "Branch:", value: employee.Branch },
            { label: "Organization:", value: employee.Organization },
            { label: "Job Title:", value: employee.Job_Title },
            { label: "Pay Grade:", value: employee.Pay_Grade },
            { label: "Employment Status:", value: employee.Employment_Status },
        ];

        // Loop through employee details and add them to the PDF
        employeeDetails.forEach(detail => {
            doc.text(`${detail.label} ${detail.value}`, 10, y);
            y += 10; // Move down for next line
        });

        // Add dependents if available
        if (employee.Dependents && employee.Dependents.length > 0) {
            doc.text("Dependents:", 10, y);
            y += 10; // Move down for dependents

            employee.Dependents.forEach(dependent => {
                doc.text(`- ${dependent.Dependent_Name} (${dependent.Relationship})`, 10, y);
                y += 10; // Move down for next dependent
            });
        }

        // Add emergency contacts if available
        if (employee.Emergency_Contact && employee.Emergency_Contact.length > 0) {
            doc.text("Emergency Contacts:", 10, y);
            y += 10; // Move down for emergency contacts

            employee.Emergency_Contact.forEach(contact => {
                doc.text(`- ${contact.Contact_Name} (${contact.Relationship}), Phone: ${contact.Phone}, Email: ${contact.Email}, Address: ${contact.Address}`, 10, y);
                y += 10; // Move down for next contact
            });
        }

        // Save the PDF with the filename based on employee name and NIC
        const fileName = `${employee.Full_Name.replace(/\s+/g, "_")}_${employee.NIC}.pdf`;
        doc.save(fileName);
    } else {
        alert("No data available to export.");
    }
  };



  // Handle the form submission
  const handleEBD = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      await handleEBDGen();
    }
    setValidated(true);
  };

  const handleEBDGen = async () => {
    try {
      const response = await api.post(
        '/genarateReport/get_employee_detail_by_department',  // Adjusted API endpoint
        {
          department: selectedDepartmentID || 0,  // Default to 0 if not selected
          title: selectedTitleID || 0,
          status: selectedStatusID || 0,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      if (response.data.success) {
        console.log('Employee data fetched successfully:', response.data.data);
        setFetchedData(response.data.data);  // Store data to display in the modal
        setShowEBD(true);  // Show the modal on success
      } else {
        setAlertMessage('Error: No matching data found');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error fetching employee details:', error);
      setAlertMessage('Error: Unable to fetch employee details');
      setShowAlert(true);
    }
  };  

  const handleDownloadEBD = () => {
    const doc = new jsPDF();
  
    // Define the title using selected values
    const department = departments.find(dept => dept.id === Number(selectedDepartmentID))?.name || "All";
    const title = titles.find(tit => tit.id === Number(selectedTitleID))?.name || "Title";
    const status = statuses.find(stat => stat.id === Number(selectedStatusID))?.name || "All";
  
    // Construct the heading text
    const headingText = `${status} ${title}s of ${department} department`;
  
    // Add the heading to the PDF at the top
    doc.setFontSize(16); // Optional: Set font size for the heading
    doc.text(headingText, 10, 10); // Position the heading on the PDF (x, y coordinates)
  
    // Define columns for the table
    const columns = [
      { header: 'Full Name', dataKey: 'Full_Name' },
      { header: 'NIC', dataKey: 'NIC' },
      { header: 'Department', dataKey: 'Dept_Name' },
      { header: 'Branch', dataKey: 'Branch_Name' },
      { header: 'Status', dataKey: 'Status' },
      { header: 'Title', dataKey: 'Title' },
    ];
  
    // Check if there is data to export
    if (fetchedData && fetchedData.length > 0) {
      // Use jspdf-autotable to generate the table
      doc.autoTable({
        head: [columns.map(col => col.header)], // Use headers from columns
        body: fetchedData.map(employee => columns.map(col => employee[col.dataKey])), // Extract data based on keys
        startY: 20, // Position the table after the heading
        theme: 'grid', // Optional: table theme
        styles: { fontSize: 10 }, // Optional: font size for table content
      });
      
      const now = new Date();
      const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
      const fileName = `${status} ${title}s of ${department} department on ${formattedDate}.pdf`;
      doc.save(fileName); // Save PDF with the specified file name
    } else {
      alert('No data available to export.');
    }
  };

  // Handle the form submission
  const handleEBB = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      await handleEBBGen();
    }
    setValidated(true);
  };

  const handleEBBGen = async () => {
    try {
      const response = await api.post(
        '/genarateReport/get_employee_detail_by_branch',  // Adjusted API endpoint
        {
          branch: selectedBranchID || 0,  // Default to 0 if not selected
          title: selectedTitleID || 0,
          status: selectedStatusID || 0,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      if (response.data.success) {
        console.log('Employee data fetched successfully:', response.data.data);
        setFetchedData(response.data.data);  // Store data to display in the modal
        setShowEBB(true);  // Show the modal on success
      } else {
        setAlertMessage('Error: No matching data found');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error fetching employee details:', error);
      setAlertMessage('Error: Unable to fetch employee details');
      setShowAlert(true);
    }
  }; 

  const handleDownloadEBB = () => {
    const doc = new jsPDF();
  
    // Define the title using selected values
    const branch = branches.find(dept => dept.id === Number(selectedBranchID))?.name || "All Branches";
    const title = titles.find(tit => tit.id === Number(selectedTitleID))?.name || "Title";
    const status = statuses.find(stat => stat.id === Number(selectedStatusID))?.name || "All";
  
    // Construct the heading text
    const headingText = `${status} ${title}s of ${branch}`;
  
    // Add the heading to the PDF at the top
    doc.setFontSize(16); // Optional: Set font size for the heading
    doc.text(headingText, 10, 10); // Position the heading on the PDF (x, y coordinates)
  
    // Define columns for the table
    const columns = [
      { header: 'Full Name', dataKey: 'Full_Name' },
      { header: 'NIC', dataKey: 'NIC' },
      { header: 'Department', dataKey: 'Dept_Name' },
      { header: 'Branch', dataKey: 'Branch_Name' },
      { header: 'Status', dataKey: 'Status' },
      { header: 'Title', dataKey: 'Title' },
    ];
  
    // Check if there is data to export
    if (fetchedData && fetchedData.length > 0) {
      // Use jspdf-autotable to generate the table
      doc.autoTable({
        head: [columns.map(col => col.header)], // Use headers from columns
        body: fetchedData.map(employee => columns.map(col => employee[col.dataKey])), // Extract data based on keys
        startY: 20, // Position the table after the heading
        theme: 'grid', // Optional: table theme
        styles: { fontSize: 10 }, // Optional: font size for table content
      });
      
      const now = new Date();
      const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
      const fileName = `${status} ${title}s of ${branch} on ${formattedDate}.pdf`;
      doc.save(fileName); // Save PDF with the specified file name
    } else {
      alert('No data available to export.');
    }
  };

  // Handle the form submission
  const handleEBP = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      await handleEBPGen();
    }
    setValidated(true);
  };

  const handleEBPGen = async () => {
    try {
      const response = await api.post(
        '/genarateReport/get_employee_detail_by_pay_grade',  // Adjusted API endpoint
        {
          department: selectedDepartmentID || 0,  // Default to 0 if not selected
          branch: selectedBranchID || 0,
          pay_grade: selectedPayGradeID || 0,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      if (response.data.success) {
        console.log('Employee data fetched successfully:', response.data.data);
        setFetchedData(response.data.data);  // Store data to display in the modal
        setShowEBP(true);  // Show the modal on success
      } else {
        setAlertMessage('Error: No matching data found');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error fetching employee details:', error);
      setAlertMessage('Error: Unable to fetch employee details');
      setShowAlert(true);
    }
  };  

  const handleDownloadEBP = () => {
    const doc = new jsPDF();

    // Define the title using selected values
    const department = departments.find(dept => dept.id === Number(selectedDepartmentID))?.name || "All Departments";
    const branch = branches.find(br => br.id === Number(selectedBranchID))?.name || "All Branches";
    const payGrade = payGrades.find(pg => pg.id === Number(selectedPayGradeID))?.name || "All";
    const headingText = `Employees in Pay Grade: ${payGrade}, ${department}, ${branch}`;

    // Add the heading to the PDF at the top
    doc.setFontSize(16);
    doc.text(headingText, 10, 10);

    // Define columns for the table
    const columns = [
        { header: 'Full Name', dataKey: 'Full_Name' },
        { header: 'NIC', dataKey: 'NIC' },
        { header: 'Department', dataKey: 'Dept_Name' },
        { header: 'Branch', dataKey: 'Branch_Name' },
        { header: 'Pay Grade', dataKey: 'Pay_Grade' }
    ];

    // Check if there is data to export
    if (fetchedData && fetchedData.length > 0) {
        doc.autoTable({
            head: [columns.map(col => col.header)], // Use headers from columns
            body: fetchedData.map(employee => columns.map(col => employee[col.dataKey])), // Extract data based on keys
            startY: 20,
            theme: 'grid',
            styles: { fontSize: 10 }
        });

        const now = new Date();
        const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
        const fileName = `Pay Grade Report ${department} ${branch} ${formattedDate}.pdf`;
        doc.save(fileName);
    } else {
        alert('No data available to export.');
    }
  };

  // Handle the form submission
  const handleEBT = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      await handleEBTGen();
    }
    setValidated(true);
  };

  const handleEBTGen = async () => {
    try {
      const response = await api.post(
        '/genarateReport/get_employee_detail_by_title',  // Adjusted API endpoint
        {
          department: selectedDepartmentID || 0,  // Default to 0 if not selected
          branch: selectedBranchID || 0,
          title: selectedTitleID || 0,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      if (response.data.success) {
        console.log('Employee data fetched successfully:', response.data.data);
        setFetchedData(response.data.data);  // Store data to display in the modal
        setShowEBT(true);  // Show the modal on success
      } else {
        setAlertMessage('Error: No matching data found');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error fetching employee details:', error);
      setAlertMessage('Error: Unable to fetch employee details');
      setShowAlert(true);
    }
  };  

  const handleDownloadEBT = () => {
    const doc = new jsPDF();

    const department = departments.find(dept => dept.id === Number(selectedDepartmentID))?.name || "All Departments";
    const branch = branches.find(br => br.id === Number(selectedBranchID))?.name || "All Branches";
    const title = titles.find(jt => jt.id === Number(selectedTitleID))?.name || "All Titles";
    const headingText = `Employees: ${title}, ${department}, ${branch}`;

    doc.setFontSize(16);
    doc.text(headingText, 10, 10);

    const columns = [
        { header: 'Full Name', dataKey: 'Full_Name' },
        { header: 'NIC', dataKey: 'NIC' },
        { header: 'Job Title', dataKey: 'Job_Title' },
        { header: 'Department', dataKey: 'Dept_Name' },
        { header: 'Branch', dataKey: 'Branch_Name' }
    ];

    if (fetchedData && fetchedData.length > 0) {
        doc.autoTable({
            head: [columns.map(col => col.header)],
            body: fetchedData.map(employee => columns.map(col => employee[col.dataKey])),
            startY: 20,
            theme: 'grid',
            styles: { fontSize: 10 }
        });

        const now = new Date();
        const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
        const fileName = `Employee_Report_${title}_${department}_${branch}_${formattedDate}.pdf`;
        doc.save(fileName);
    } else {
        alert('No data available to export.');
    }
  };

  // Handle the form submission
  const handleLB = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      await handleLBGen();
    }
    setValidated(true);
  };

  const handleLBGen = async () => {
    try {
      const response = await api.post(
        '/genarateReport/get_annual_leave_balance',  // Adjusted API endpoint
        {
          department: selectedDepartmentID || 0,
          branch: selectedBranchID || 0,  // Default to 0 if not selected
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      if (response.data.success) {
        console.log('Employee data fetched successfully:', response.data.data);
        setFetchedData(response.data.data);  // Store data to display in the modal
        setShowLB(true);  // Show the modal on success
      } else {
        setAlertMessage('Error: No matching data found');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error fetching employee details:', error);
      setAlertMessage('Error: Unable to fetch employee details');
      setShowAlert(true);
    }
  }; 

  const handleDownloadLB = () => {
    const doc = new jsPDF('landscape');

    // Define the title using selected values
    const branch = branches.find(br => br.id === Number(selectedBranchID))?.name || "All Branches";
    const department = departments.find(dep => dep.id === Number(selectedDepartmentID))?.name || "All Departments";
    const headingText = `Annual Leave Balance Report for ${department}, ${branch}`;

    // Add the heading to the PDF at the top
    doc.setFontSize(16);
    doc.text(headingText, 10, 10);

    // Define columns for the table with additional leave details
    const columns = [
        { header: 'Full Name', dataKey: 'Full_Name' },
        { header: 'Status', dataKey: 'Employment_Status' },
        { header: 'Pay Grade', dataKey: 'Pay_Grade_Level' },
        
        { header: 'Annual Balance', dataKey: 'Annual_Leave_Balance' },
        { header: 'Annual Entitlement', dataKey: 'Annual_Leave_Entitlement' },
        { header: 'Annual Taken', dataKey: 'Annual_Leave_Taken' },
        
        { header: 'Casual Balance', dataKey: 'Casual_Leave_Balance' },
        { header: 'Casual Entitlement', dataKey: 'Casual_Leave_Entitlement' },
        { header: 'Casual Taken', dataKey: 'Casual_Leave_Taken' },
        
        { header: 'Maternity Balance', dataKey: 'Maternity_Leave_Balance' },
        { header: 'Maternity Entitlement', dataKey: 'Maternity_Leave_Entitlement' },
        { header: 'Maternity Taken', dataKey: 'Maternity_Leave_Taken' },
        
        { header: 'No Pay Balance', dataKey: 'No_Pay_Leave_Balance' },
        { header: 'No Pay Entitlement', dataKey: 'No_Pay_Leave_Entitlement' },
        { header: 'No Pay Taken', dataKey: 'No_Pay_Leave_Taken' },
        
        { header: 'Total Balance', dataKey: 'Total_Leave_Balance' },
        { header: 'Total Entitlement', dataKey: 'Total_Leave_Entitlement' },
        { header: 'Total Taken', dataKey: 'Total_Leave_Taken' },
    ];

    // Check if there is data to export
    if (fetchedData && fetchedData.length > 0) {
        doc.autoTable({
            head: [columns.map(col => col.header)],
            body: fetchedData.map(employee => columns.map(col => employee[col.dataKey])),
            startY: 20,
            theme: 'grid',
            styles: { fontSize: 8 },
        });

        const now = new Date();
        const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
        const fileName = `Leave_Balance_Report_${department}_${branch}_${formattedDate}.pdf`;
        doc.save(fileName);
    } else {
        alert('No data available to export.');
    }
  };


  // Handle the form submission
  const handleLR = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      await handleLRGen();
    }
    setValidated(true);
  };

  const handleLRGen = async () => {
    try {
      const response = await api.post(
        '/genarateReport/get_leave_request_details',  // Adjusted API endpoint
        {
          department: selectedDepartmentID || 0,  // Default to 0 if not selected
          branch: selectedBranchID || 0,
          fromDate: selectedFromDate || '2024-01-01',  // Default to a date if not selected
          toDate: selectedToDate || '2024-12-31',  // Default to a date if not selected
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      if (response.data.success) {
        console.log('Employee data fetched successfully:', response.data.data);
        setFetchedData(response.data.data);  // Store data to display in the modal
        setShowLR(true);  // Show the modal on success
      } else {
        setAlertMessage('Error: No matching data found');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error fetching employee details:', error);
      setAlertMessage('Error: Unable to fetch employee details');
      setShowAlert(true);
    }
  };  

  const handleDownloadLR = () => {
    const doc = new jsPDF({ orientation: "landscape" });

    // Define the title using selected values
    const department = departments.find(dept => dept.id === Number(selectedDepartmentID))?.name || "All";
    const branch = branches.find(br => br.id === Number(selectedBranchID))?.name || "All";
    const headingText = `Approved Leave Requests for ${department} Department, ${branch} Branch`;

    // Add the heading to the PDF at the top
    doc.setFontSize(16);
    doc.text(headingText, 10, 10);

    // Define columns for the table based on the procedure's output
    const columns = [
        { header: 'Full Name', dataKey: 'Full_Name' },
        { header: 'NIC', dataKey: 'Employment_NIC' },
        { header: 'Title', dataKey: 'Title' },
        { header: 'Pay Grade', dataKey: 'Pay_Grade_Level' },
        { header: 'Leave Start Date', dataKey: 'Start_Date' },
        { header: 'Leave End Date', dataKey: 'End_Date' },
        { header: 'Reason', dataKey: 'Reason' },
        { header: 'Supervisor Name', dataKey: 'Supervisor_Full_Name' },
        { header: 'Supervisor NIC', dataKey: 'Supervisor_NIC' },
        { header: 'Supervisor Title', dataKey: 'Supervisor_Title' }
    ];

    if (fetchedData && fetchedData.length > 0) {
        doc.autoTable({
            head: [columns.map(col => col.header)],
            body: fetchedData.map(employee => columns.map(col => employee[col.dataKey])),
            startY: 20,
            theme: 'grid',
            styles: { fontSize: 10 }
        });

        const now = new Date();
        const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
        const fileName = `Approved_Leave_Requests_${department}_${branch}_${formattedDate}.pdf`;
        doc.save(fileName);
    } else {
        alert('No data available to export.');
    }
  };

  // Handle the form submission
  const handleLPR = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      await handleLPRGen();
    }
    setValidated(true);
  };

  const handleLPRGen = async () => {
    try {
      const response = await api.post(
        '/genarateReport/get_pending_leave_request_details',  // Adjusted API endpoint
        {
          department: selectedDepartmentID || 0,  // Default to 0 if not selected
          branch: selectedBranchID || 0,
          fromDate: selectedFromDate || '2024-01-01',  // Default to a date if not selected
          toDate: selectedToDate || '2024-12-31',  // Default to a date if not selected
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      if (response.data.success) {
        console.log('Employee data fetched successfully:', response.data.data);
        setFetchedData(response.data.data);  // Store data to display in the modal
        setShowLPR(true);  // Show the modal on success
      } else {
        setAlertMessage('Error: No matching data found');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error fetching employee details:', error);
      setAlertMessage('Error: Unable to fetch employee details');
      setShowAlert(true);
    }
  };  

  const handleDownloadLPR = () => {
    const doc = new jsPDF({ orientation: "landscape" });

    // Define the title using selected values
    const department = departments.find(dept => dept.id === Number(selectedDepartmentID))?.name || "All";
    const branch = branches.find(br => br.id === Number(selectedBranchID))?.name || "All";
    const headingText = `Pending Leave Requests for ${department} Department, ${branch} Branch`;

    // Add the heading to the PDF at the top
    doc.setFontSize(16);
    doc.text(headingText, 10, 10);

    // Define columns for the table based on the procedure's output
    const columns = [
        { header: 'Full Name', dataKey: 'Full_Name' },
        { header: 'NIC', dataKey: 'Employment_NIC' },
        { header: 'Title', dataKey: 'Title' },
        { header: 'Pay Grade', dataKey: 'Pay_Grade_Level' },
        { header: 'Leave Start Date', dataKey: 'Start_Date' },
        { header: 'Leave End Date', dataKey: 'End_Date' },
        { header: 'Reason', dataKey: 'Reason' },
        { header: 'Supervisor Name', dataKey: 'Supervisor_Full_Name' },
        { header: 'Supervisor NIC', dataKey: 'Supervisor_NIC' },
        { header: 'Supervisor Title', dataKey: 'Supervisor_Title' }
    ];

    if (fetchedData && fetchedData.length > 0) {
        doc.autoTable({
            head: [columns.map(col => col.header)],
            body: fetchedData.map(employee => columns.map(col => employee[col.dataKey])),
            startY: 20,
            theme: 'grid',
            styles: { fontSize: 10 }
        });

        const now = new Date();
        const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
        const fileName = `Pending_Leave_Requests_${department}_${branch}_${formattedDate}.pdf`;
        doc.save(fileName);
    } else {
        alert('No data available to export.');
    }
  };

  // Handle the form submission
  const handleLRR = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      await handleLRRGen();
    }
    setValidated(true);
  };

  const handleLRRGen = async () => {
    try {
      const response = await api.post(
        '/genarateReport/get_rejected_leave_request_details',  // Adjusted API endpoint
        {
          department: selectedDepartmentID || 0,  // Default to 0 if not selected
          branch: selectedBranchID || 0,
          fromDate: selectedFromDate || '2024-01-01',  // Default to a date if not selected
          toDate: selectedToDate || '2024-12-31',  // Default to a date if not selected
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      if (response.data.success) {
        console.log('Employee data fetched successfully:', response.data.data);
        setFetchedData(response.data.data);  // Store data to display in the modal
        setShowLRR(true);  // Show the modal on success
      } else {
        setAlertMessage('Error: No matching data found');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error fetching employee details:', error);
      setAlertMessage('Error: Unable to fetch employee details');
      setShowAlert(true);
    }
  };  

  const handleDownloadLRR = () => {
    const doc = new jsPDF({ orientation: "landscape" });

    // Define the title using selected values
    const department = departments.find(dept => dept.id === Number(selectedDepartmentID))?.name || "All";
    const branch = branches.find(br => br.id === Number(selectedBranchID))?.name || "All";
    const headingText = `Rejected Leave Requests for ${department} Department, ${branch} Branch`;

    // Add the heading to the PDF at the top
    doc.setFontSize(16);
    doc.text(headingText, 10, 10);

    // Define columns for the table based on the procedure's output
    const columns = [
        { header: 'Full Name', dataKey: 'Full_Name' },
        { header: 'NIC', dataKey: 'Employment_NIC' },
        { header: 'Title', dataKey: 'Title' },
        { header: 'Pay Grade', dataKey: 'Pay_Grade_Level' },
        { header: 'Leave Start Date', dataKey: 'Start_Date' },
        { header: 'Leave End Date', dataKey: 'End_Date' },
        { header: 'Reason', dataKey: 'Reason' },
        { header: 'Supervisor Name', dataKey: 'Supervisor_Full_Name' },
        { header: 'Supervisor NIC', dataKey: 'Supervisor_NIC' },
        { header: 'Supervisor Title', dataKey: 'Supervisor_Title' }
    ];

    if (fetchedData && fetchedData.length > 0) {
        doc.autoTable({
            head: [columns.map(col => col.header)],
            body: fetchedData.map(employee => columns.map(col => employee[col.dataKey])),
            startY: 20,
            theme: 'grid',
            styles: { fontSize: 10 }
        });

        const now = new Date();
        const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
        const fileName = `Rejected_Leave_Requests_${department}_${branch}_${formattedDate}.pdf`;
        doc.save(fileName);
    } else {
        alert('No data available to export.');
    }
  };

  // Handle the form submission
  const handleCF = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      await handleCFGen();
    }
    setValidated(true);
  };

  const handleCFGen = async () => {
    try {
      const response = await api.post(
        '/genarateReport/get_custom_field',  // Adjusted API endpoint
        {
          department: selectedDepartmentID || 0,  // Default to 0 if not selected
          branch: selectedBranchID || 0,
          custom_field: selectedCustomFieldID || 0,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      if (response.data.success) {
        console.log('Employee data fetched successfully:', response.data.data);
        setFetchedData(response.data.data);  // Store data to display in the modal
        setShowCF(true);  // Show the modal on success
      } else {
        setAlertMessage('Error: No matching data found');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error fetching employee details:', error);
      setAlertMessage('Error: Unable to fetch employee details');
      setShowAlert(true);
    }
  };  

  const handleDownloadCF = () => {
    const doc = new jsPDF();

    // Define the title for the PDF
    const department = departments.find(dept => dept.id === Number(selectedDepartmentID))?.name || "All Departments";
    const branch = branches.find(br => br.id === Number(selectedBranchID))?.name || "All Branches";
    const field = customFields.find(fld => fld.id === Number(selectedCustomFieldID))?.name || "All Fields";
    const headingText = `Custom Field Report for ${department}, ${branch} (${field})`;

    // Add the heading to the PDF
    doc.setFontSize(16);
    doc.text(headingText, 10, 10);

    // Define columns for the table
    const columns = [
        { header: 'Full Name', dataKey: 'Full_Name' },
        { header: 'NIC', dataKey: 'NIC' },
        { header: 'Field Name', dataKey: 'Field Name' }
    ];

    // Check if there is data to export
    if (fetchedData && fetchedData.length > 0) {
        doc.autoTable({
            head: [columns.map(col => col.header)],
            body: fetchedData.map(employee => columns.map(col => employee[col.dataKey])),
            startY: 20,
            theme: 'grid',
            styles: { fontSize: 10 }
        });

        const now = new Date();
        const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
        const fileName = `Custom Field Report ${department} ${branch} ${field} ${formattedDate}.pdf`;
        doc.save(fileName);
    } else {
        alert('No data available to export.');
    }
  };

  
  return (
    <Layout>
      <div className='max-h-full h-full rounded-lg shadow-2xl shadow-black' style={{ backgroundImage: 'url("/../../public/dashboard.jpg")', backgroundSize: 'cover', backgroundPosition: 'center',}}>
        <section className='bg-gray-950 px-2.5 py-4 backdrop-blur-md bg-opacity-65 min-h-full h-full rounded-lg py-5 px-5' style={{ overflowY: 'auto' }}>
          <div>
            <h1 class='centered-title'>Generating reports</h1>
          </div>

          <div style={{ margin: "20px 0" }}>
            {/* This div adds space */}
          </div>

          <Tabs
          defaultActiveKey="organization"
          id="genrepHR"
          className="mb-3"
          justify
        >
             <Tab eventKey="organization" title="Organizational details">
              <div className="organization-branch-details-section bg-white p-3 rounded">
                <h2 style={{ fontWeight: 'bold' }}>Branch Details</h2>
                <Form noValidate validated={validated} onSubmit={handleOB}>
                  <Row className="mb-3">
                      <Form.Group controlId="depSelE2">
                        <Form.Label>Organization</Form.Label>
                        <Form.Select
                          value={selectedOrganizationID}
                          onChange={(e) => setSelectedOrganizationID(e.target.value)}
                          required
                        >
                          <option value="0">All</option>
                          {organizations.map((org) => (
                            <option key={org.id} value={org.id}>
                              {org.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                  </Row>
                  <div className="d-flex justify-content-center">
                    <Button type="submit">Generate</Button>
                  </div>
                </Form>
                <Modal show={showOB} onHide={() => setShowOB(false)} backdrop="static" keyboard={false}>
                  <Modal.Header closeButton>
                      <Modal.Title>Organization Data</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      {fetchedData && fetchedData.length > 0 ? (
                          fetchedData.map((org, index) => (
                              <Card key={index} className="mb-2">
                                  <Card.Body>
                                      <Card.Title>{org['Organization Name']}</Card.Title>
                                      <Card.Text>
                                          <strong>Registration No:</strong> {org['Registration No']} <br />
                                          <strong>Head Office:</strong> {org['Head Office']} <br />
                                          <strong>Branch Name:</strong> {org['Branch Name']}
                                      </Card.Text>
                                  </Card.Body>
                              </Card>
                          ))
                      ) : (
                          <p>No data available.</p>
                      )}
                  </Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={() => setShowOB(false)}>
                          Dismiss
                      </Button>
                      <Button variant="primary" onClick={handleDownloadOB}>
                          Download as PDF
                      </Button>
                  </Modal.Footer>
              </Modal>
              </div>
            </Tab>

            <Tab eventKey="employee" title="Employee details">
              <div className="employee-details-section bg-white p-3 rounded">
                <h2 style={{ fontWeight: 'bold' }}>Employee details of an Employee</h2>
                <Form noValidate validated={true} onSubmit={handleE}>
                  <Row className="mb-3">
                      <Col md="6">
                          <Form.Group controlId="depSelE2">
                              <Form.Label>NIC</Form.Label>
                              <FloatingLabel controlId="floatingInputNIC" label="Enter NIC" className="mb-3">
                                  <Form.Control 
                                      type="text" 
                                      placeholder="Enter NIC" 
                                      value={nic} 
                                      onChange={(e) => setNic(e.target.value)} 
                                  />
                              </FloatingLabel>
                          </Form.Group>
                      </Col>
                      <Col md="6">
                          <Form.Group controlId="titSelE2">
                              <Form.Label>Name</Form.Label>
                              <FloatingLabel controlId="floatingInputName" label="Enter Name" className="mb-3">
                                  <Form.Control 
                                      type="text" 
                                      placeholder="Enter Name" 
                                      value={name} 
                                      onChange={(e) => setName(e.target.value)} 
                                  />
                              </FloatingLabel>
                          </Form.Group>
                      </Col>
                  </Row>
                  <div className="d-flex justify-content-center">
                      <Button type="submit">Generate</Button>
                  </div>
                  <Modal show={showE} onHide={() => setShowE(false)} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Download request</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {fetchedData ? (
                            fetchedData.map((employee, index) => (
                                <Card key={index} className="mb-2">
                                    <Card.Body>
                                        <Card.Title>{employee.Full_Name}</Card.Title>
                                        <Card.Text>
                                            <strong>NIC:</strong> {employee.NIC} <br />
                                            <strong>Gender:</strong> {employee.Gender} <br />
                                            <strong>Work Email:</strong> {employee.Email_Work} <br />
                                            <strong>Private Email:</strong> {employee.Email_Private} <br />
                                            <strong>Phone:</strong> {employee.Phone} <br />
                                            <strong>Address:</strong> {employee.Address} <br />
                                            <strong>Department:</strong> {employee.Department} <br />
                                            <strong>Branch:</strong> {employee.Branch} <br />
                                            <strong>Organization:</strong> {employee.Organization} <br />
                                            <strong>Job Title:</strong> {employee.Job_Title} <br />
                                            <strong>Pay Grade:</strong> {employee.Pay_Grade} <br />
                                            <strong>Employment Status:</strong> {employee.Employment_Status} <br />
                                        </Card.Text>
                                        {employee.Dependents && (
                                            <Card.Text>
                                                <strong>Dependents:</strong>
                                                {employee.Dependents.map((dependent, i) => (
                                                    <div key={i}>
                                                        - {dependent.Dependent_Name} ({dependent.Relationship})
                                                    </div>
                                                ))}
                                            </Card.Text>
                                        )}
                                        {employee.Emergency_Contact && (
                                            <Card.Text>
                                                <strong>Emergency Contacts:</strong>
                                                {employee.Emergency_Contact.map((contact, i) => (
                                                    <div key={i}>
                                                        - {contact.Contact_Name} ({contact.Relationship}), Phone: {contact.Phone}, Email: {contact.Email}, Address: {contact.Address}
                                                    </div>
                                                ))}
                                            </Card.Text>
                                        )}
                                    </Card.Body>
                                </Card>
                            ))
                        ) : (
                            <p>No data available.</p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowE(false)}>
                            Dismiss
                        </Button>
                        <Button variant="primary" onClick={handleDownloadE}>
                            Download as PDF
                        </Button>
                    </Modal.Footer>
                </Modal>
                </Form>
              </div>
              <div className="employee-department-details-section bg-white p-3 rounded">
                <h2 style={{ fontWeight: 'bold' }}>Employee Details by Department</h2>
                <Form noValidate validated={validated} onSubmit={handleEBD}>
                  <Row className="mb-3">
                    <Col md="4">
                      <Form.Group controlId="depSelE2">
                        <Form.Label>Department</Form.Label>
                        <Form.Select
                          value={selectedDepartmentID}
                          onChange={(e) => setSelectedDepartmentID(e.target.value)}
                          required
                        >
                          <option value="0">All</option>
                          {departments.map((dept) => (
                            <option key={dept.id} value={dept.id}>
                              {dept.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md="4">
                      <Form.Group controlId="titSelE2">
                        <Form.Label>Title</Form.Label>
                        <Form.Select
                          value={selectedTitleID}
                          onChange={(e) => setSelectedTitleID(e.target.value)}
                          required
                        >
                          <option value="0">All</option>
                          {titles.map((tit) => (
                            <option key={tit.id} value={tit.id}>
                              {tit.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md="4">
                      <Form.Group controlId="statSelE2">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                          value={selectedStatusID}
                          onChange={(e) => setSelectedStatusID(e.target.value)}
                          required
                        >
                          <option value="0">All</option>
                          {statuses.map((stat) => (
                            <option key={stat.id} value={stat.id}>
                              {stat.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-center">
                    <Button type="submit">Generate</Button>
                  </div>
                </Form>
                <Modal show={showEBD} onHide={() => setShowEBD(false)} backdrop="static" keyboard={false}>
                  <Modal.Header closeButton>
                    <Modal.Title>Download request</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  {fetchedData ? (
                    fetchedData.map((employee, index) => (
                      <Card key={index} className="mb-2">
                        <Card.Body>
                          <Card.Title>{employee.Full_Name}</Card.Title>
                          <Card.Text>
                            <strong>NIC:</strong> {employee.NIC} <br />
                            <strong>Department:</strong> {employee.Dept_Name} <br />
                            <strong>Branch:</strong> {employee.Branch_Name} <br />
                            <strong>Status:</strong> {employee.Status} <br />
                            <strong>Title:</strong> {employee.Title}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    ))
                  ) : (
                    <p>No data available.</p>
                  )}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEBD(false)}>
                      Dismiss
                    </Button>
                    <Button variant="primary" onClick={handleDownloadEBD}>
                      Download as PDF
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
              <div className="employee-branch-details-section bg-white p-3 rounded">
                <h2 style={{ fontWeight: 'bold' }}>Employee details by Branch</h2>
                <Form noValidate validated={validated} onSubmit={handleEBB}>
                  <Row className="mb-3">
                    <Col md="4">
                      <Form.Group controlId="depSelE2">
                        <Form.Label>Branch</Form.Label>
                        <Form.Select
                          value={selectedBranchID}
                          onChange={(e) => setSelectedBranchID(e.target.value)}
                          required
                        >
                          <option value="0">All</option>
                          {branches.map((bran) => (
                            <option key={bran.id} value={bran.id}>
                              {bran.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md="4">
                      <Form.Group controlId="titSelE2">
                        <Form.Label>Title</Form.Label>
                        <Form.Select
                          value={selectedTitleID}
                          onChange={(e) => setSelectedTitleID(e.target.value)}
                          required
                        >
                          <option value="0">All</option>
                          {titles.map((tit) => (
                            <option key={tit.id} value={tit.id}>
                              {tit.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md="4">
                      <Form.Group controlId="statSelE2">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                          value={selectedStatusID}
                          onChange={(e) => setSelectedStatusID(e.target.value)}
                          required
                        >
                          <option value="0">All</option>
                          {statuses.map((stat) => (
                            <option key={stat.id} value={stat.id}>
                              {stat.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-center">
                    <Button type="submit">Generate</Button>
                  </div>
                </Form>
                <Modal show={showEBB} onHide={() => setShowEBB(false)} backdrop="static" keyboard={false}>
                  <Modal.Header closeButton>
                    <Modal.Title>Download request</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  {fetchedData ? (
                    fetchedData.map((employee, index) => (
                      <Card key={index} className="mb-2">
                        <Card.Body>
                          <Card.Title>{employee.Full_Name}</Card.Title>
                          <Card.Text>
                            <strong>NIC:</strong> {employee.NIC} <br />
                            <strong>Department:</strong> {employee.Dept_Name} <br />
                            <strong>Branch:</strong> {employee.Branch_Name} <br />
                            <strong>Status:</strong> {employee.Status} <br />
                            <strong>Title:</strong> {employee.Title}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    ))
                  ) : (
                    <p>No data available.</p>
                  )}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEBB(false)}>
                      Dismiss
                    </Button>
                    <Button variant="primary" onClick={handleDownloadEBB}>
                      Download as PDF
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
              <div className="employee-details-section bg-white p-3 rounded">
                <h2 style={{ fontWeight: 'bold' }}>Employee details by Pay Grade</h2>
                <Form noValidate validated={validated} onSubmit={handleEBP}>
                  <Row className="mb-3">
                    <Col md="4">
                      <Form.Group controlId="depSelE2">
                        <Form.Label>Department</Form.Label>
                        <Form.Select
                          value={selectedDepartmentID}
                          onChange={(e) => setSelectedDepartmentID(e.target.value)}
                          required
                        >
                          <option value="0">All</option>
                          {departments.map((dept) => (
                            <option key={dept.id} value={dept.id}>
                              {dept.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md="4">
                      <Form.Group controlId="titSelE2">
                        <Form.Label>Branch</Form.Label>
                        <Form.Select
                          value={selectedBranchID}
                          onChange={(e) => setSelectedBranchID(e.target.value)}
                          required
                        >
                          <option value="0">All</option>
                          {branches.map((bran) => (
                            <option key={bran.id} value={bran.id}>
                              {bran.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md="4">
                      <Form.Group controlId="statSelE2">
                        <Form.Label>Pay Grade</Form.Label>
                        <Form.Select
                          value={selectedPayGradeID}
                          onChange={(e) => setSelectedPayGradeID(e.target.value)}
                          required
                        >
                          <option value="0">All</option>
                          {payGrades.map((pay) => (
                            <option key={pay.id} value={pay.id}>
                              {pay.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-center">
                    <Button type="submit">Generate</Button>
                  </div>
                </Form>
                <Modal show={showEBP} onHide={() => setShowEBP(false)} backdrop="static" keyboard={false}>
                  <Modal.Header closeButton>
                      <Modal.Title>Download Pay Grade Report</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      {fetchedData && fetchedData.length > 0 ? (
                          fetchedData.map((employee, index) => (
                              <Card key={index} className="mb-2">
                                  <Card.Body>
                                      <Card.Title>{employee.Full_Name}</Card.Title>
                                      <Card.Text>
                                          <strong>NIC:</strong> {employee.NIC} <br />
                                          <strong>Department:</strong> {employee.Dept_Name} <br />
                                          <strong>Branch:</strong> {employee.Branch_Name} <br />
                                          <strong>Pay Grade:</strong> {employee.Pay_Grade}
                                      </Card.Text>
                                  </Card.Body>
                              </Card>
                          ))
                      ) : (
                          <p>No data available.</p>
                      )}
                  </Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={() => setShowEBP(false)}>
                          Dismiss
                      </Button>
                      <Button variant="primary" onClick={handleDownloadEBP}>
                          Download as PDF
                      </Button>
                  </Modal.Footer>
              </Modal>
              </div>
              <div className="employee-details-section bg-white p-3 rounded">
                <h2 style={{ fontWeight: 'bold' }}>Employee details by title</h2>
                <Form noValidate validated={validated} onSubmit={handleEBT}>
                  <Row className="mb-3">
                    <Col md="4">
                      <Form.Group controlId="depSelE2">
                        <Form.Label>Department</Form.Label>
                        <Form.Select
                          value={selectedDepartmentID}
                          onChange={(e) => setSelectedDepartmentID(e.target.value)}
                          required
                        >
                          <option value="0">All</option>
                          {departments.map((dept) => (
                            <option key={dept.id} value={dept.id}>
                              {dept.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md="4">
                      <Form.Group controlId="titSelE2">
                        <Form.Label>Branch</Form.Label>
                        <Form.Select
                          value={selectedBranchID}
                          onChange={(e) => setSelectedBranchID(e.target.value)}
                          required
                        >
                          <option value="0">All</option>
                          {branches.map((bran) => (
                            <option key={bran.id} value={bran.id}>
                              {bran.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md="4">
                      <Form.Group controlId="statSelE2">
                        <Form.Label>Title</Form.Label>
                        <Form.Select
                          value={selectedTitleID}
                          onChange={(e) => setSelectedTitleID(e.target.value)}
                          required
                        >
                          <option value="0">All</option>
                          {titles.map((tit) => (
                            <option key={tit.id} value={tit.id}>
                              {tit.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-center">
                    <Button type="submit">Generate</Button>
                  </div>
                </Form>
                <Modal show={showEBT} onHide={() => setShowEBT(false)} backdrop="static" keyboard={false}>
                  <Modal.Header closeButton>
                      <Modal.Title>Download Employee Report by Job Title</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      {fetchedData && fetchedData.length > 0 ? (
                          fetchedData.map((employee, index) => (
                              <Card key={index} className="mb-2">
                                  <Card.Body>
                                      <Card.Title>{employee.Full_Name}</Card.Title>
                                      <Card.Text>
                                          <strong>NIC:</strong> {employee.NIC} <br />
                                          <strong>Job Title:</strong> {employee.Job_Title} <br />
                                          <strong>Department:</strong> {employee.Dept_Name} <br />
                                          <strong>Branch:</strong> {employee.Branch_Name}
                                      </Card.Text>
                                  </Card.Body>
                              </Card>
                          ))
                      ) : (
                          <p>No data available.</p>
                      )}
                  </Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={() => setShowEBT(false)}>
                          Dismiss
                      </Button>
                      <Button variant="primary" onClick={handleDownloadEBT}>
                          Download as PDF
                      </Button>
                  </Modal.Footer>
              </Modal>
              </div>
              <div className="employee-details-section bg-white p-3 rounded">
                <h2 style={{ fontWeight: 'bold' }}>Emergency Contact details of Employees</h2>
              </div>
            </Tab>
            
            <Tab eventKey="leave" title="Leave details">
              <div className="remaining-leave-details-section bg-white p-3 rounded">
                <h2 style={{ fontWeight: 'bold' }}>No. of remaining leaves</h2>
                <Form noValidate validated={validated} onSubmit={handleLB}>
                  <Row className="mb-3">
                    <Col md="6">
                      <Form.Group controlId="titSelE2">
                        <Form.Label>Department</Form.Label>
                        <Form.Select
                          value={selectedDepartmentID}
                          onChange={(e) => setSelectedDepartmentID(e.target.value)}
                          required
                        >
                          <option value="0">All</option>
                          {departments.map((dep) => (
                            <option key={dep.id} value={dep.id}>
                              {dep.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group controlId="depSelE2">
                        <Form.Label>Branch</Form.Label>
                        <Form.Select
                          value={selectedBranchID}
                          onChange={(e) => setSelectedBranchID(e.target.value)}
                          required
                        >
                          <option value="0">All</option>
                          {branches.map((bran) => (
                            <option key={bran.id} value={bran.id}>
                              {bran.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-center">
                    <Button type="submit">Generate</Button>
                  </div>
                </Form>
                <Modal show={showLB} onHide={() => setShowLB(false)} backdrop="static" keyboard={false}>
                  <Modal.Header closeButton>
                      <Modal.Title>Download Leave Balance Report</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      {fetchedData && fetchedData.length > 0 ? (
                          fetchedData.map((employee, index) => (
                              <Card key={index} className="mb-2">
                                  <Card.Body>
                                      <Card.Title>{employee.Full_Name}</Card.Title>
                                      <Card.Text>
                                          <strong>Status:</strong> {employee.Employment_Status} <br />
                                          <strong>Pay Grade:</strong> {employee.Pay_Grade_Level} <br />
                                          
                                          <strong>Annual Leave:</strong> {employee.Annual_Leave_Balance} / {employee.Annual_Leave_Entitlement} (Taken: {employee.Annual_Leave_Taken}) <br />
                                          <strong>Casual Leave:</strong> {employee.Casual_Leave_Balance} / {employee.Casual_Leave_Entitlement} (Taken: {employee.Casual_Leave_Taken}) <br />
                                          <strong>Maternity Leave:</strong> {employee.Maternity_Leave_Balance} / {employee.Maternity_Leave_Entitlement} (Taken: {employee.Maternity_Leave_Taken}) <br />
                                          <strong>No Pay Leave:</strong> {employee.No_Pay_Leave_Balance} / {employee.No_Pay_Leave_Entitlement} (Taken: {employee.No_Pay_Leave_Taken}) <br />
                                          
                                          <strong>Total Leave:</strong> {employee.Total_Leave_Balance} / {employee.Total_Leave_Entitlement} (Taken: {employee.Total_Leave_Taken})
                                      </Card.Text>
                                  </Card.Body>
                              </Card>
                          ))
                      ) : (
                          <p>No data available.</p>
                      )}
                  </Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={() => setShowLB(false)}>Dismiss</Button>
                      <Button variant="primary" onClick={handleDownloadLB}>Download as PDF</Button>
                  </Modal.Footer>
              </Modal>
              </div>
              <div className="leave-req-details-section bg-white p-3 rounded">
                <h2 style={{ fontWeight: 'bold' }}>Approved leave request details</h2>
                <Form noValidate validated={validated} onSubmit={handleLR}>
                  <Row className="mb-3">
                    <Col md="6">
                      <Form.Group controlId="titSelE2">
                        <Form.Label>Department</Form.Label>
                        <Form.Select
                          value={selectedDepartmentID}
                          onChange={(e) => setSelectedDepartmentID(e.target.value)}
                          required
                        >
                          <option value="0">All</option>
                          {departments.map((dep) => (
                            <option key={dep.id} value={dep.id}>
                              {dep.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group controlId="depSelE2">
                        <Form.Label>Branch</Form.Label>
                        <Form.Select
                          value={selectedBranchID}
                          onChange={(e) => setSelectedBranchID(e.target.value)}
                          required
                        >
                          <option value="0">All</option>
                          {branches.map((bran) => (
                            <option key={bran.id} value={bran.id}>
                              {bran.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md="6">
                      <Form.Group controlId="dateInput">
                        <Form.Label>From</Form.Label>
                        <Form.Control
                          type="date"
                          value={selectedFromDate}
                          onChange={(e) => setSelectedFromDate(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md="6">
                    <Form.Group controlId="dateInput">
                        <Form.Label>To</Form.Label>
                        <Form.Control
                          type="date"
                          value={selectedToDate}
                          onChange={(e) => setSelectedToDate(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-center">
                    <Button type="submit">Generate</Button>
                  </div>
                </Form>
                <Modal show={showLR} onHide={() => setShowLR(false)} backdrop="static" keyboard={false}>
                  <Modal.Header closeButton>
                      <Modal.Title>Download Approved Leave Request Report</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      {fetchedData && fetchedData.length > 0 ? (
                          fetchedData.map((employee, index) => (
                              <Card key={index} className="mb-2">
                                  <Card.Body>
                                      <Card.Title>{employee.Full_Name}</Card.Title>
                                      <Card.Text>
                                          <strong>NIC:</strong> {employee.Employment_NIC} <br />
                                          <strong>Title:</strong> {employee.Title} <br />
                                          <strong>Pay Grade:</strong> {employee.Pay_Grade_Level} <br />
                                          <strong>Leave Period:</strong> {employee.Start_Date} to {employee.End_Date} <br />
                                          <strong>Reason:</strong> {employee.Reason} <br />
                                          <strong>Supervisor:</strong> {employee.Supervisor_Full_Name} ({employee.Supervisor_Title}), NIC: {employee.Supervisor_NIC}
                                      </Card.Text>
                                  </Card.Body>
                              </Card>
                          ))
                      ) : (
                          <p>No data available.</p>
                      )}
                  </Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={() => setShowLR(false)}>
                          Dismiss
                      </Button>
                      <Button variant="primary" onClick={handleDownloadLR}>
                          Download as PDF
                      </Button>
                  </Modal.Footer>
              </Modal>
              </div>
              <div className="leave-req-details-section bg-white p-3 rounded">
                <h2 style={{ fontWeight: 'bold' }}>Pending leave request details</h2>
                <Form noValidate validated={validated} onSubmit={handleLPR}>
                  <Row className="mb-3">
                    <Col md="6">
                      <Form.Group controlId="titSelE2">
                        <Form.Label>Department</Form.Label>
                        <Form.Select
                          value={selectedDepartmentID}
                          onChange={(e) => setSelectedDepartmentID(e.target.value)}
                          required
                        >
                          <option value="0">All</option>
                          {departments.map((dep) => (
                            <option key={dep.id} value={dep.id}>
                              {dep.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group controlId="depSelE2">
                        <Form.Label>Branch</Form.Label>
                        <Form.Select
                          value={selectedBranchID}
                          onChange={(e) => setSelectedBranchID(e.target.value)}
                          required
                        >
                          <option value="0">All</option>
                          {branches.map((bran) => (
                            <option key={bran.id} value={bran.id}>
                              {bran.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md="6">
                      <Form.Group controlId="dateInput">
                        <Form.Label>From</Form.Label>
                        <Form.Control
                          type="date"
                          value={selectedFromDate}
                          onChange={(e) => setSelectedFromDate(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md="6">
                    <Form.Group controlId="dateInput">
                        <Form.Label>To</Form.Label>
                        <Form.Control
                          type="date"
                          value={selectedToDate}
                          onChange={(e) => setSelectedToDate(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-center">
                    <Button type="submit">Generate</Button>
                  </div>
                </Form>
                <Modal show={showLPR} onHide={() => setShowLPR(false)} backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Download Pending Leave Request Report</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {fetchedData && fetchedData.length > 0 ? (
                            fetchedData.map((employee, index) => (
                                <Card key={index} className="mb-2">
                                    <Card.Body>
                                        <Card.Title>{employee.Full_Name}</Card.Title>
                                        <Card.Text>
                                            <strong>NIC:</strong> {employee.Employment_NIC} <br />
                                            <strong>Title:</strong> {employee.Title} <br />
                                            <strong>Pay Grade:</strong> {employee.Pay_Grade_Level} <br />
                                            <strong>Leave Period:</strong> {employee.Start_Date} to {employee.End_Date} <br />
                                            <strong>Reason:</strong> {employee.Reason} <br />
                                            <strong>Supervisor:</strong> {employee.Supervisor_Full_Name} ({employee.Supervisor_Title}), NIC: {employee.Supervisor_NIC}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            ))
                        ) : (
                            <p>No data available.</p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowLPR(false)}>
                            Dismiss
                        </Button>
                        <Button variant="primary" onClick={handleDownloadLPR}>
                            Download as PDF
                        </Button>
                    </Modal.Footer>
                </Modal>
              </div>
              <div className="leave-req-details-section bg-white p-3 rounded">
                <h2 style={{ fontWeight: 'bold' }}>Rejected leave request details</h2>
                <Form noValidate validated={validated} onSubmit={handleLRR}>
                  <Row className="mb-3">
                    <Col md="6">
                      <Form.Group controlId="titSelE2">
                        <Form.Label>Department</Form.Label>
                        <Form.Select
                          value={selectedDepartmentID}
                          onChange={(e) => setSelectedDepartmentID(e.target.value)}
                          required
                        >
                          <option value="0">All</option>
                          {departments.map((dep) => (
                            <option key={dep.id} value={dep.id}>
                              {dep.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group controlId="depSelE2">
                        <Form.Label>Branch</Form.Label>
                        <Form.Select
                          value={selectedBranchID}
                          onChange={(e) => setSelectedBranchID(e.target.value)}
                          required
                        >
                          <option value="0">All</option>
                          {branches.map((bran) => (
                            <option key={bran.id} value={bran.id}>
                              {bran.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md="6">
                      <Form.Group controlId="dateInput">
                        <Form.Label>From</Form.Label>
                        <Form.Control
                          type="date"
                          value={selectedFromDate}
                          onChange={(e) => setSelectedFromDate(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md="6">
                    <Form.Group controlId="dateInput">
                        <Form.Label>To</Form.Label>
                        <Form.Control
                          type="date"
                          value={selectedToDate}
                          onChange={(e) => setSelectedToDate(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-center">
                    <Button type="submit">Generate</Button>
                  </div>
                </Form>
                <Modal show={showLRR} onHide={() => setShowLRR(false)} backdrop="static" keyboard={false}>
                  <Modal.Header closeButton>
                      <Modal.Title>Download Rejected Leave Request Report</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      {fetchedData && fetchedData.length > 0 ? (
                          fetchedData.map((employee, index) => (
                              <Card key={index} className="mb-2">
                                  <Card.Body>
                                      <Card.Title>{employee.Full_Name}</Card.Title>
                                      <Card.Text>
                                          <strong>NIC:</strong> {employee.Employment_NIC} <br />
                                          <strong>Title:</strong> {employee.Title} <br />
                                          <strong>Pay Grade:</strong> {employee.Pay_Grade_Level} <br />
                                          <strong>Leave Period:</strong> {employee.Start_Date} to {employee.End_Date} <br />
                                          <strong>Reason:</strong> {employee.Reason} <br />
                                          <strong>Supervisor:</strong> {employee.Supervisor_Full_Name} ({employee.Supervisor_Title}), NIC: {employee.Supervisor_NIC}
                                      </Card.Text>
                                  </Card.Body>
                              </Card>
                          ))
                      ) : (
                          <p>No data available.</p>
                      )}
                  </Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={() => setShowLRR(false)}>
                          Dismiss
                      </Button>
                      <Button variant="primary" onClick={handleDownloadLRR}>
                          Download as PDF
                      </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </Tab>
            <Tab eventKey="customFields" title="Custom Field details">
              <div className="organization-department-details-section bg-white p-3 rounded">
                <h2 style={{ fontWeight: 'bold' }}>Custom Fields</h2>
                <Form noValidate validated={validated} onSubmit={handleCF}>
                  <Row className="mb-3">
                    <Col md="4">
                      <Form.Group controlId="depSelE2">
                        <Form.Label>Department</Form.Label>
                        <Form.Select
                          value={selectedDepartmentID}
                          onChange={(e) => setSelectedDepartmentID(e.target.value)}
                          required
                        >
                          <option value="0">All</option>
                          {departments.map((dept) => (
                            <option key={dept.id} value={dept.id}>
                              {dept.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md="4">
                      <Form.Group controlId="titSelE2">
                        <Form.Label>Branch</Form.Label>
                        <Form.Select
                          value={selectedBranchID}
                          onChange={(e) => setSelectedBranchID(e.target.value)}
                          required
                        >
                          <option value="0">All</option>
                          {branches.map((bran) => (
                            <option key={bran.id} value={bran.id}>
                              {bran.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md="4">
                      <Form.Group controlId="statSelE2">
                        <Form.Label>Custom Field</Form.Label>
                        <Form.Select
                          value={selectedCustomFieldID}
                          onChange={(e) => setSelectedCustomFieldID(e.target.value)}
                          required
                        >
                          <option value="0">All</option>
                          {customFields.map((cus) => (
                            <option key={cus.id} value={cus.id}>
                              {cus.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="d-flex justify-content-center">
                    <Button type="submit">Generate</Button>
                  </div>
                </Form>
                <Modal show={showCF} onHide={() => setShowCF(false)} backdrop="static" keyboard={false}>
                  <Modal.Header closeButton>
                      <Modal.Title>Download Custom Field Report</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      {fetchedData && fetchedData.length > 0 ? (
                          fetchedData.map((employee, index) => (
                              <Card key={index} className="mb-2">
                                  <Card.Body>
                                      <Card.Title>{employee.Full_Name}</Card.Title>
                                      <Card.Text>
                                          <strong>NIC:</strong> {employee.NIC} <br />
                                          <strong>Field Name:</strong> {employee['Field Name']} <br />
                                      </Card.Text>
                                  </Card.Body>
                              </Card>
                          ))
                      ) : (
                          <p>No data available.</p>
                      )}
                  </Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={() => setShowCF(false)}>
                          Dismiss
                      </Button>
                      <Button variant="primary" onClick={handleDownloadCF}>
                          Download as PDF
                      </Button>
                  </Modal.Footer>
              </Modal>
              </div>
            </Tab>
          </Tabs>
        </section>
      </div>
    </Layout>
  );
};

export default GenRepHR;
