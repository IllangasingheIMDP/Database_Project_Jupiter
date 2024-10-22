import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import './GenRepHR.css';
  

const GenRepHR = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
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
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Department Details</Accordion.Header>
                <Accordion.Body>
                  
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Branch Details</Accordion.Header>
                <Accordion.Body>
                  
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            </Tab>

            <Tab eventKey="employee" title="Employee details">
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Employee details of an Employee</Accordion.Header>
                  <Accordion.Body>
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
    
                    <Button variant="secondary" onClick={handleShow} >
                      Download
                    </Button>
                    <Modal
                      show={show}
                      onHide={handleClose}
                      backdrop="static"
                      keyboard={false}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Download request</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Check the requested data set.
                        <Form>
                          {['radio'].map((type) => (
                            <div key={`inline-${type}`} className="mb-3">
                              <Form.Check
                                inline
                                label=".pdf"
                                name="group1"
                                type={type}
                                id={`inline-${type}-1`}
                              />
                              <Form.Check
                                inline
                                label=""
                                name="group1"
                                type={type}
                                id={`inline-${type}-2`}
                              />
                              <Form.Check
                                inline
                                label=""
                                name="group1"
                                type={type}
                                id={`inline-${type}-3`}
                              />
                            </div>
                          ))}
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Dismiss
                        </Button>
                        <Button variant="primary">Download</Button>
                      </Modal.Footer>
                    </Modal>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>Employee details by Department</Accordion.Header>
                  <Accordion.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                      <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                          <Form.Label>Department</Form.Label>
                          <Form.Select aria-label="Default select example">
                            <option>All</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </Form.Select>
                          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                          <Form.Label>Title</Form.Label>
                          <Form.Select aria-label="Default select example">
                            <option>All</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                          <Form.Label>Status</Form.Label>
                          <Form.Select aria-label="Default select example">
                            <option>All</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </Form.Select>
                        </Form.Group>
                      </Row>
                      <div className="d-flex justify-content-center">
                        <Button type="submit">Generate</Button>
                      </div>
                    </Form>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header>Employee details by Branch</Accordion.Header>
                  <Accordion.Body>
                    
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>Employee details by Pay Grade</Accordion.Header>
                  <Accordion.Body>
                    
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>Dependent details of Employees</Accordion.Header>
                  <Accordion.Body>
                    
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                <Accordion.Header>Emergency Contact details of Employees</Accordion.Header>
                <Accordion.Body>
                  
                </Accordion.Body>
              </Accordion.Item>
              </Accordion>
            </Tab>

            <Tab eventKey="leave" title="Leave details">
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Leave details of an Employee</Accordion.Header>
                <Accordion.Body>
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
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>No. of remaining leaves</Accordion.Header>
                <Accordion.Body>
                  
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Leave request details</Accordion.Header>
                <Accordion.Body>
                  
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            </Tab>
          </Tabs>
        </section>
      </div>
    </Layout>
  );
};

export default GenRepHR;
