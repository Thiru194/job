import React, { useState } from 'react';
import { Button, Card, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: '', // Adding role state
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

    if (!formData.role) {
      newFormErrors.role = 'Please select a role';
    }

    if (Object.keys(newFormErrors).length > 0) {
      setFormErrors(newFormErrors);
    } else {
      setLoading(true);

      try {
        const response = await axios.post('http://localhost:3002/signup', {
          email: formData.email,
          password: formData.password,
          role: formData.role,
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
    <div>
      <Sidebar />
      <div className="container mt-4">
        <Card className="mx-auto" style={{ maxWidth: '400px',backgroundColor:"ButtonFace" }}>
          <Card.Body>
            <Card.Title className="text-center">Signup</Card.Title>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  isInvalid={!!formErrors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  isInvalid={!!formErrors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  isInvalid={!!formErrors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formUserRole">
                <Form.Label>Select Role</Form.Label>
                <div>
                  <Form.Check
                    inline
                    type="radio"
                    label="Admin"
                    name="role"
                    id="adminRadio"
                    value="admin"
                    onChange={handleInputChange}
                    isInvalid={!!formErrors.role}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="User"
                    name="role"
                    id="userRadio"
                    value="user"
                    onChange={handleInputChange}
                    isInvalid={!!formErrors.role}
                  />
                </div>
                <Form.Control.Feedback type="invalid">
                  {formErrors.role}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                variant="success"
                type="button"
                onClick={handleSignupClick}
                disabled={loading}
                className="d-flex justify-content-center"
                block
                style={{marginLeft:"140px",marginTop:"30px"}}
              >
                {loading ? <Spinner animation="border" size="sm" /> : 'Signup'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
      <ToastContainer autoClose={500} />
    </div>
  );
};

export default Signup;
