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
import './GenRepHR.css';
  

const GenRepHR = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <Layout>
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
                  <Button variant="primary" type="submit">
                    Search
                  </Button>
                </Form>
                <Button variant="secondary" onClick={handleShow}>
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
              </Accordion.Body>
            </Accordion.Item>
              <Accordion.Item eventKey="2">
              <Accordion.Header>Employee details by Branch</Accordion.Header>
              <Accordion.Body>
                
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Employee details by Pay Grade</Accordion.Header>
              <Accordion.Body>
                
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Dependent details of Employees</Accordion.Header>
              <Accordion.Body>
                
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
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
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
            </Card>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Leave details</Accordion.Header>
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

    </Layout>
  );
};

export default GenRepHR;
