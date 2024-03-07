// Login.js
import React, { useState } from 'react';
import { Button, Card, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '', // Adding role state
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
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

  const handleLoginClick = async () => {
    const newFormErrors = {};

    if (!formData.email) {
      newFormErrors.email = 'Email is required';
    }

    if (!formData.password) {
      newFormErrors.password = 'Password is required';
    }

    if (Object.keys(newFormErrors).length > 0) {
      setFormErrors(newFormErrors);
    } else {
      setLoading(true);

      try {
        const response = await axios.post('http://localhost:3002/login', {
          email: formData.email,
          password: formData.password,
          role: formData.role,
        });

        setLoading(false);

        if (response.data.message === 'Login successful') {
          toast.success('Login successful', {
            position: toast.POSITION.TOP_CENTER,
          });
          // Redirect or perform actions upon successful login
        } else {
          toast.error('Invalid email or password', {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } catch (error) {
        setLoading(false);
        toast.error('Error during login');
        console.error('Error during login:', error);
      }
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="container mt-4">
        <Card className="mx-auto" style={{ maxWidth: '400px', backgroundColor: "ButtonFace" }}>
          <Card.Body>
            <Card.Title className="text-center">Login</Card.Title>
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

              <Form.Group controlId="formUserRole">
                <Form.Label>Select Role</Form.Label>
                <div>
                  <Form.Check
                    inline
                    type="radio"
                    label="Admin"
                    name="role"
                    id="adminRadioLogin"
                    value="admin"
                    onChange={handleInputChange}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="User"
                    name="role"
                    id="userRadioLogin"
                    value="user"
                    onChange={handleInputChange}
                  />
                </div>
              </Form.Group>

              <Button
                variant="primary"
                type="button"
                onClick={handleLoginClick}
                disabled={loading}
                className="d-flex justify-content-center"
                block
                style={{ marginLeft: "140px", marginTop: "30px" }}
              >
                {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
      <ToastContainer autoClose={500} />
    </div>
  );
};

export default Login;
