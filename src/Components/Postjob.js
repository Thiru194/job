import React from 'react';
import '../Components/Postjob.css';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Sidebar from './Sidebar';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export const Postjob = () => {
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
      toast.warning('Please fill all fields before posting the job.',{
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:3002/add", job);
      console.log(response);
      toast.success('Job posted successfully!',{
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
    <div className='post1'>
      <Sidebar />
      <h1 style={{ marginTop: "100px" }}>Post A Job </h1>
      <div className='post'>
        <Form>
          <Table>
            <tbody>
              <tr>
                <td>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label style={{ color: "green" }}><h4>Company Name</h4></Form.Label>
                    <Form.Control className="input" type="text" placeholder="name" style={{ width: "450px" }} name='company' onChange={(e) => { handleAdd(e, "companyName") }} />
                  </Form.Group>
                </td>
                <td>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label style={{ color: "green" }}><h4>About Job</h4></Form.Label>
                    <Form.Control className="input" type="text" placeholder='About job position' style={{ width: "450px" }} name='about' onChange={(e) => { handleAdd(e, "about") }} />
                  </Form.Group>
                </td>
              </tr>
              <tr>
                <td>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label style={{ color: "green" }}><h4>Salary</h4></Form.Label>
                    <Form.Control className="input" type="number" placeholder="Salary" style={{ width: "450px" }} name='salary' onChange={(e) => { handleAdd(e, "salary") }} />
                  </Form.Group>
                </td>
                <td>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label style={{ color: "green" }}><h4>Email</h4></Form.Label>
                    <Form.Control className="input" type="text" placeholder='name@example.com' style={{ width: "450px" }} name='mail' onChange={(e) => { handleAdd(e, "email") }} />
                  </Form.Group>
                </td>
              </tr>
            </tbody>
          </Table>
        </Form>
        <Button variant="outline-danger" style={{ marginLeft: '420px', width: "100px" }} onClick={handleClick}>Post</Button>{' '}
        <ToastContainer autoClose={1500} />
      </div>
    </div>
  )
}

export default Postjob;
