import React, { useState } from 'react';
import { Navbar, Container, Row, Col, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './Style.css';
import adminProfilePic from '../assets/propic.jpg'; // Adjust path as needed

const EditUser: React.FC = () => {
    const location = useLocation();
    const [activeKey, setActiveKey] = useState(location.pathname);

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
                                className={`py-3 px-4 nav-item-custom ${activeKey === '/home' ? 'active' : ''}`}
                                onClick={() => setActiveKey('/home')}
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
                        <h2>Edit User</h2>
                        <p>Here you can edit the details of an existing user.</p>
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

export default EditUser;
