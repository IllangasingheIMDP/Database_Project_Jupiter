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
      <div> </div>

      <Tabs
      defaultActiveKey="organization"
      id="genrepHR"
      className="mb-3"
      justify
    >
        <Tab eventKey="organization" title="Organizational details">
          C
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
              <Accordion.Header>Accordion Item #2</Accordion.Header>
              <Accordion.Body>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Tab>

        <Tab eventKey="leave" title="Leave details">
          Tab content for Leave Table
        </Tab>
      </Tabs>

    </Layout>
  );
};

export default GenRepHR;
