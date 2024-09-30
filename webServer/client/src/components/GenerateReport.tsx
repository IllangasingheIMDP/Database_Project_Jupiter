import React, { useState } from 'react';
import { Navbar, Container, Row, Col, Nav, NavDropdown, Form, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './Style.css';
import adminProfilePic from '../assets/propic.jpg'; // Adjust path as needed

const GenerateReport: React.FC = () => {
    const location = useLocation();
    const [activeKey, setActiveKey] = useState(location.pathname);

    // State to manage file type for each report
    const [fileTypeEmployeeDept, setFileTypeEmployeeDept] = useState('pdf');
    const [fileTypeLeavesDept, setFileTypeLeavesDept] = useState('pdf');
    const [fileTypeEmployeeGroup, setFileTypeEmployeeGroup] = useState('pdf');
    const [fileTypeCustomFields, setFileTypeCustomFields] = useState('pdf');

    // State to manage selected department
    const [departmentEmployee, setDepartmentEmployee] = useState('Finance');
    const [departmentLeave, setDepartmentLeave] = useState('Finance');

    // State to manage date range
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleDownload = (reportType: string, fileType: string) => {
        // Logic to handle the download of the report based on the fileType and reportType
        console.log(`Downloading ${reportType} as ${fileType}`);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Navigation Bar */}
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Jupiter Apparels</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <NavDropdown
                                title={
                                    <span>
                                        <img
                                            src={adminProfilePic}
                                            alt="Admin Profile"
                                            className="rounded-circle me-2"
                                            style={{ width: '30px', height: '30px' }}
                                        />
                                        Admin User
                                    </span>
                                }
                                id="basic-nav-dropdown"
                                align="end"
                            >
                                <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/edit-profile">Edit Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/logout">Sign Out</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container fluid className="flex-grow-1">
                <Row>
                    {/* Sidebar */}
                    <Col md="auto" className="bg-light sidebar">
                        <Nav className="flex-column">
                            <Nav.Link
                                as={Link}
                                to="/admin-home"
                                style={{ color: activeKey === '/admin-home' ? 'white' : '#343a40', backgroundColor: activeKey === '/admin-home' ? '#343a40' : 'transparent' }}
                                className={`py-3 px-4 nav-item-custom ${activeKey === '/admin-home' ? 'active' : ''}`}
                                onClick={() => setActiveKey('/admin-home')}
                            >
                                <i className="bi bi-house-door-fill me-2"></i>
                                Home
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/create-user"
                                style={{ color: activeKey === '/create-user' ? 'white' : '#343a40', backgroundColor: activeKey === '/create-user' ? '#343a40' : 'transparent' }}
                                className={`py-3 px-4 nav-item-custom ${activeKey === '/create-user' ? 'active' : ''}`}
                                onClick={() => setActiveKey('/create-user')}
                            >
                                <i className="bi bi-person-plus-fill me-2"></i>
                                Create a new User
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/edit-user"
                                style={{ color: activeKey === '/edit-user' ? 'white' : '#343a40', backgroundColor: activeKey === '/edit-user' ? '#343a40' : 'transparent' }}
                                className={`py-3 px-4 nav-item-custom ${activeKey === '/edit-user' ? 'active' : ''}`}
                                onClick={() => setActiveKey('/edit-user')}
                            >
                                <i className="bi bi-person-plus-fill me-2"></i>
                                Edit a User
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/delete-user"
                                style={{ color: activeKey === '/delete-user' ? 'white' : '#343a40', backgroundColor: activeKey === '/delete-user' ? '#343a40' : 'transparent' }}
                                className={`py-3 px-4 nav-item-custom ${activeKey === '/delete-user' ? 'active' : ''}`}
                                onClick={() => setActiveKey('/delete-user')}
                            >
                                <i className="bi bi-person-x-fill me-2"></i>
                                Delete a user
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/generate-report"
                                style={{ color: activeKey === '/generate-report' ? 'white' : '#343a40', backgroundColor: activeKey === '/generate-report' ? '#343a40' : 'transparent' }}
                                className={`py-3 px-4 nav-item-custom ${activeKey === '/generate-report' ? 'active' : ''}`}
                                onClick={() => setActiveKey('/generate-report')}
                            >
                                <i className="bi bi-file-earmark-bar-graph-fill me-2"></i>
                                Generate a report
                            </Nav.Link>
                        </Nav>
                    </Col>

                    {/* Main Content */}
                    <Col className="p-4">
                        <h2 style={{ textAlign: 'center' }}>Generate Reports</h2>
                        <div className="report-section">
                            <div className="mb-4">
                                <h4>Employee Distribution by Department</h4>
                                <Form.Group as={Row} className="align-items-center">
                                <Col xs={12} md={4}>
                                        <Form.Label>Choose Department</Form.Label>
                                        <Form.Select
                                            value={departmentEmployee}
                                            onChange={(e) => setDepartmentEmployee(e.target.value)}
                                        >
                                            <option value="Finance">Finance</option>
                                            <option value="Human Resource">Human Resource</option>
                                        </Form.Select>
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <Form.Label>Choose File Type</Form.Label>
                                        <Form.Select
                                            value={fileTypeEmployeeDept}
                                            onChange={(e) => setFileTypeEmployeeDept(e.target.value)}
                                        >
                                            <option value="pdf">PDF</option>
                                            <option value="excel">Excel</option>
                                        </Form.Select>
                                    </Col>
                                    <Col xs={12} className="d-flex justify-content-right mt-3">
                                        <Button
                                            variant="secondary"
                                            onClick={() => handleDownload('Total leaves in given period by department', fileTypeLeavesDept)}
                                        >
                                            Download
                                        </Button>
                                    </Col>
                                </Form.Group>
                            </div>

                            <div className="mb-4">
                                <h4>Departmental Leave Summary for a Period</h4>
                                <Form.Group as={Row} className="align-items-center">
                                <Col xs={12} md={4}>
                                    <Form.Label>Date Range</Form.Label>
                                    <Row>
                                        <Col>
                                            <Form.Control
                                                type="date"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="date"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs={12} md={4}>
                                        <Form.Label>Choose Department</Form.Label>
                                        <Form.Select
                                            value={departmentLeave}
                                            onChange={(e) => setDepartmentLeave(e.target.value)}
                                        >
                                            <option value="Finance">Finance</option>
                                            <option value="Human Resource">Human Resource</option>
                                        </Form.Select>
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <Form.Label>Choose File Type</Form.Label>
                                        <Form.Select
                                            value={fileTypeLeavesDept}
                                            onChange={(e) => setFileTypeLeavesDept(e.target.value)}
                                        >
                                            <option value="pdf">PDF</option>
                                            <option value="excel">Excel</option>
                                        </Form.Select>
                                    </Col>
                                    <Col xs={12} className="d-flex justify-content-right mt-3">
                                        <Button
                                            variant="secondary"
                                            onClick={() => handleDownload('Total leaves in given period by department', fileTypeLeavesDept)}
                                        >
                                            Download
                                        </Button>
                                    </Col>
                                </Form.Group>
                            </div>

                            <div className="mb-4">
                                <h4>Employee Analysis by Job Title, Department, and Pay Grade</h4>
                                <Form.Group as={Row} className="align-items-center">
                                    <Col xs={12} md={4}>
                                        <Form.Label>Choose File Type</Form.Label>
                                        <Form.Select
                                            value={fileTypeEmployeeGroup}
                                            onChange={(e) => setFileTypeEmployeeGroup(e.target.value)}
                                        >
                                            <option value="pdf">PDF</option>
                                            <option value="excel">Excel</option>
                                        </Form.Select>
                                    </Col>
                                    <Col xs={12} className="d-flex justify-content-right mt-3">
                                        <Button
                                            variant="secondary"
                                            onClick={() => handleDownload('Total leaves in given period by department', fileTypeLeavesDept)}
                                        >
                                            Download
                                        </Button>
                                    </Col>
                                </Form.Group>
                            </div>

                            <div className="mb-4">
                                <h4>Custom Field-Based Employee Reports</h4>
                                <Form.Group as={Row} className="align-items-center">
                                    <Col xs={12} md={4}>
                                        <Form.Label>Choose File Type</Form.Label>
                                        <Form.Select
                                            value={fileTypeCustomFields}
                                            onChange={(e) => setFileTypeCustomFields(e.target.value)}
                                        >
                                            <option value="pdf">PDF</option>
                                            <option value="excel">Excel</option>
                                        </Form.Select>
                                    </Col>
                                    <Col xs={12} className="d-flex justify-content-right mt-3">
                                        <Button
                                            variant="secondary"
                                            onClick={() => handleDownload('Total leaves in given period by department', fileTypeLeavesDept)}
                                        >
                                            Download
                                        </Button>
                                    </Col>
                                </Form.Group>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Footer */}
            <footer className="bg-dark text-white text-center py-3 mt-auto fixed-bottom">
                © Group 15
            </footer>
        </div>
    );
};

export default GenerateReport;
