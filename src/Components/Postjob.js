// Postjob.jsx
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Sidebar from './Sidebar';
import '../Components/home.css'; // Import the home.css file
import { Container, Row, Col } from 'react-bootstrap'; // Import Container, Row, Col components from React Bootstrap

const Postjob = () => {
  const [job, setJob] = useState({
    companyName: "",
    about: "",
    salary: "",
    email: ""
  });

  const handleAdd = (e, detail) => {
    setJob({ ...job, [detail]: e.target.value });
  }

  const handleClick = async () => {
    if (!job.companyName || !job.about || !job.salary || !job.email) {
      toast.warning('Please fill all fields before posting the job.', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:3002/add", job);
      console.log(response);
      toast.success('Job posted successfully!', {
        position: toast.POSITION.TOP_CENTER,
      });

      // Clear the form fields after successful posting
      setJob({
        companyName: "",
        about: "",
        salary: "",
        email: ""
      });
    } catch (error) {
      console.error('Error posting job', error);
      alert('Error posting job. Please try again.');
    }
  };

  return (
    <div className='background-container'>
      <Sidebar />
      <Container fluid>
        <Row className='justify-content-center align-items-center' style={{ minHeight: '80vh' }}> 
          <Col md={9} lg={10} className='px-5 py-3' style={{ paddingTop: '40px' }}> 
            <h1 className='mt-4 text-center' >Post A Job</h1>
            <div className='post-container'>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="companyName">
                      <Form.Label>Company Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter company name" value={job.companyName} onChange={(e) => handleAdd(e, "companyName")} />
                    </Form.Group>
                    <Form.Group controlId="about">
                      <Form.Label>About Job</Form.Label>
                      <Form.Control type="text" placeholder="Enter job description" value={job.about} onChange={(e) => handleAdd(e, "about")} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="salary">
                      <Form.Label>Salary</Form.Label>
                      <Form.Control type="number" placeholder="Enter salary" value={job.salary} onChange={(e) => handleAdd(e, "salary")} />
                    </Form.Group>
                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" value={job.email} onChange={(e) => handleAdd(e, "email")} />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="text-center">
                  <Button variant="danger" className="mt-3" onClick={handleClick}>Post</Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer autoClose={1500} />
    </div>
  );
}

export default Postjob;
