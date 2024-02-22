import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Sidebar from './Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: '',
    });
  };

  const handleSignupClick = async () => {
    const newFormErrors = {};

    if (!formData.email) {
      newFormErrors.email = 'Email is required';
    }

    if (!formData.password) {
      newFormErrors.password = 'Password is required';
    }

    if (formData.password !== formData.confirmPassword) {
      newFormErrors.confirmPassword = 'Passwords do not match';
    }
    // if (!formData.role) {
    //   newFormErrors.role = 'Please select a role';
    // }

    if (Object.keys(newFormErrors).length > 0) {
      setFormErrors(newFormErrors);
    } else {
      setLoading(true);

      try {
        const response = await axios.post('http://localhost:3002/signup', {
          email: formData.email,
          password: formData.password,
        });

        setLoading(false);
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER, 
        });
    
      } catch (error) {
        setLoading(false);
        toast.error('Error signing up');
        console.error('Error signing up:', error);
      }
    }
  };

  return (
    <div className='box'>
      <div className='Card'>
        <Sidebar />
        <Card style={{ width: '18rem',marginTop:"60px"}}>
          <Card.Body>
            <Card.Title style={{ textAlign: 'center', color: 'green' }}>Signup</Card.Title>
            <Card.Text>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <Form.Text className="text-danger">{formErrors.email}</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='********'
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <Form.Text className="text-danger">{formErrors.password}</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='********'
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <Form.Text className="text-danger">{formErrors.confirmPassword}</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
  <Form.Label>Select Role</Form.Label>
  <div>
    <Form.Check
      inline
      type="radio"
      label="Admin"
      name="role"
      id="adminRadio"
      // You can add onChange handler for radio button if needed
    />
    <Form.Check
      inline
      type="radio"
      label="User"
      name="role"
      id="userRadio"
      // You can add onChange handler for radio button if needed
    />
  </div>
</Form.Group>
              </Form>
              <Button variant="outline-success" style={{ marginLeft: '90px' }} onClick={handleSignupClick}>
                {loading ? <Spinner animation="border" size="sm" /> : 'Signup'}
              </Button>
            </Card.Text>
          </Card.Body>
        </Card>
        <ToastContainer autoClose={500} />
      </div>
    </div>
  );
};

export default Signup;
