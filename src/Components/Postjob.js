import React, { useState } from 'react';
import { Container, Table, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Sidebar from './Sidebar';
import '../Components/home.css'; // Import the home.css file

const Postjob = () => {
  const [job, setJob] = useState({
    companyName: "",
    about: "",
    salary: "",
    email: ""
  });

  const handleAdd = (e, detail) => {
    setJob({ ...job, [detail]: e.target.value });
  };

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
      <Container>
        <Table striped bordered hover style={{marginTop:"-250px"}}>
          <thead>
            <tr>
              <th colSpan="2" className="text-center">Post A Job</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Form.Group controlId="companyName">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter company name" value={job.companyName} onChange={(e) => handleAdd(e, "companyName")} />
                </Form.Group>
                <Form.Group controlId="about">
                  <Form.Label>About Job</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Enter job description" value={job.about} onChange={(e) => handleAdd(e, "about")} />
                </Form.Group>
              </td>
              <td>
                <Form.Group controlId="salary">
                  <Form.Label>Salary</Form.Label>
                  <Form.Control type="number" placeholder="Enter salary" value={job.salary} onChange={(e) => handleAdd(e, "salary")} />
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" value={job.email} onChange={(e) => handleAdd(e, "email")} />
                </Form.Group>
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="text-center">
                <Button variant="primary" className="mt-3" onClick={handleClick}>Post</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default Postjob;
