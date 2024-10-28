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
  

const GenRepHR = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [validated, setValidated] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [titles, setTitles] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [selectedDepartmentID, setSelectedDepartmentID] = useState('');
  const [selectedTitleID, setSelectedTitleID] = useState('');
  const [selectedStatusID, setSelectedStatusID] = useState('');
  const [fetchedData, setFetchedData] = useState(null);

  const handleReportGeneration = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5555/genarateReport/get_employee_detail_by_department',  // Adjusted API endpoint
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
        setShow(true);  // Show the modal on success
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

  useEffect(() => {
    const fetchDropdownOptions = async () => {
      try {
        const response = await axios.get('http://localhost:5555/genarateReport/get_department_dropdown_options', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,  // Added Authorization header
          },
        });
      
        console.log(response.data);  // Check the structure of the fetched data
        if (response.data.success) {
          setDepartments(response.data.data.departments || []);
          setTitles(response.data.data.titles || []);
          setStatuses(response.data.data.employment_statuses || []);  // Update here to match the returned key
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      await handleReportGeneration();
    }
    setValidated(true);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Define columns for the table (with headers and keys to access in data)
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
        startY: 10, // Start position of the table
        theme: 'grid', // Optional: table theme
        styles: { fontSize: 10 }, // Optional: font size and other styles
      });

      doc.save('Employee_Report.pdf'); // Save PDF with the specified file name
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
              <div className="organization-department-details-section bg-white p-3 rounded">
                <h2 style={{ fontWeight: 'bold' }}>Department Details</h2>
              </div>
              <div className="organization-branch-details-section bg-white p-3 rounded">
                <h2 style={{ fontWeight: 'bold' }}>Branch Details</h2>
              </div>
            </Tab>

            <Tab eventKey="employee" title="Employee details">
              <div className="employee-details-section bg-white p-3 rounded">
                <h2 style={{ fontWeight: 'bold' }}>Employee details of an Employee</h2>
                  <Form>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Enter NIC or Employee ID"
                      className="mb-3"
                    >
                      <Form.Control type="email" placeholder="name@example.com" />
                    </FloatingLabel>
                    <div className="d-flex justify-content-center">
                      <Button variant="primary" type="submit">Search</Button>
                    </div>
                  </Form>
              </div>
              <div className="employee-department-details-section bg-white p-3 rounded">
                <h2 style={{ fontWeight: 'bold' }}>Employee Details by Department</h2>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false}>
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
                    <Button variant="secondary" onClick={() => setShow(false)}>
                      Dismiss
                    </Button>
                    <Button variant="primary" onClick={handleDownloadPDF}>
                      Download as PDF
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
              <div className="employee-branch-details-section bg-white p-3 rounded">
                <h2 style={{ fontWeight: 'bold' }}>Employee details by Branch</h2>
              </div>
              <div className="employee-details-section bg-white p-3 rounded">
                <h2 style={{ fontWeight: 'bold' }}>Employee details by Pay Grade</h2>
              </div>
              <div className="employee-details-section bg-white p-3 rounded">
                <h2 style={{ fontWeight: 'bold' }}>Dependent details of Employees</h2>
              </div>
              <div className="employee-details-section bg-white p-3 rounded">
                <h2 style={{ fontWeight: 'bold' }}>Emergency Contact details of Employees</h2>
              </div>
            </Tab>
            
            <Tab eventKey="leave" title="Leave details">
              <div className="personal-leave-details-section bg-white p-3 rounded">
                <h2 style={{ fontWeight: 'bold' }}>Leave details of an Employee</h2>
                <Card border="danger">
                  <Card.Header as="h5">No. of leaves remaining</Card.Header>
                  <Card.Body>
                    <Form>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Enter NIC or Employee ID"
                        className="mb-3"
                      >
                        <Form.Control type="email" placeholder="name@example.com" />
                      </FloatingLabel>
                      <div className="d-flex justify-content-center">
                        <Button variant="primary" type="submit">Search</Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
                <div style={{ margin: "20px 0" }}>
                  {/* This div adds space */}
                </div>
                <Card border="danger">
                  <Card.Header as="h5" >Leave request details</Card.Header>
                  <Card.Body>
                    <Form>
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Enter NIC or Employee ID"
                        className="mb-3"
                      >
                        <Form.Control type="email" placeholder="name@example.com" />
                      </FloatingLabel>
                      <div className="d-flex justify-content-center">
                        <Button variant="primary" type="submit">Search</Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </div>
              <div className="remaining-leave-details-section bg-white p-3 rounded">
                <h2 style={{ fontWeight: 'bold' }}>No. of remaining leaves</h2>
              </div>
              <div className="leave-req-details-section bg-white p-3 rounded">
                <h2 style={{ fontWeight: 'bold' }}>Leave request details</h2>
              </div>
            </Tab>
          </Tabs>
        </section>
      </div>
    </Layout>
  );
};

export default GenRepHR;
