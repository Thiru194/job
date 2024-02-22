import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Table, Button } from 'react-bootstrap';
import Sidebar from './Sidebar';
import '../Components/Help.css';
import { ToastContainer, toast } from 'react-toastify';

export const Help = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    number: '',
    query: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    name: '',
    number: '',
    query: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: '', name: '', number: '', query: '' };


    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

   
    if (!formData.name) {
      newErrors.name = 'Please enter your name';
      valid = false;
    }

   
    if (!formData.number || !/^[0-9]+$/.test(formData.number)) {
      newErrors.number = 'Please enter a valid number';
      valid = false;
    }

   
    if (!formData.query) {
      newErrors.query = 'Please enter your query';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      
      toast.success('Form submitted successfully',{
        position: toast.POSITION.TOP_CENTER,
      }, formData);
      
      setFormData({
        email: '',
        name: '',
        number: '',
        query: ''
      });
    } else {
      console.log('Form validation failed');
    }
  };

  return (
    <div>
      <Sidebar />
      <h1 style={{ marginTop: '200px', marginLeft: '-40px', color: 'brown' }}>Contact</h1>
      <Form onSubmit={handleSubmit}>
        <Table>
          <tr>
            <th>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label style={{ marginLeft: '-40px', color: 'green' }}>Email address</Form.Label>
                <Form.Control
                  style={{ marginLeft: '-40px', width: '350px' }}
                  className='in'
                  type="email"
                  placeholder="name@example.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Form.Text className="text-danger">{errors.email}</Form.Text>
              </Form.Group>
            </th>
            <th>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label style={{ color: 'green' }}>Name</Form.Label>
                <Form.Control
                  className='in'
                  type='text'
                  style={{ width: '350px' }}
                  placeholder='name'
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <Form.Text className="text-danger">{errors.name}</Form.Text>
              </Form.Group>
            </th>
            <th>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label style={{ color: 'green' }}>Number</Form.Label>
                <Form.Control
                  className='in'
                  type='text'
                  style={{ width: '350px' }}
                  placeholder='number'
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                />
                <Form.Text className="text-danger">{errors.number}</Form.Text>
              </Form.Group>
            </th>
          </tr>
          <tr>
            <th>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label style={{ marginLeft: '-40px', color: 'green', textAlign: 'center' }}>Query</Form.Label>
                <Form.Control
                  className='in'
                  as="textarea"
                  rows={3}
                  style={{ width: '350px', marginLeft: '-40px' }}
                  placeholder='Enter the Query'
                  name="query"
                  value={formData.query}
                  onChange={handleChange}
                />
                <Form.Text className="text-danger">{errors.query}</Form.Text>
              </Form.Group>
            </th>
          </tr>
        </Table>
        <Button type="submit" variant="outline-success" style={{ marginLeft: '400px', width: '100px' }}>
          Post
        </Button>
      </Form>
      <ToastContainer/>
    </div>
  );
};

export default Help;
