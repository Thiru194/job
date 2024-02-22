// VerifyPassword.js

import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, Form, Button } from 'react-bootstrap';

const VerifyPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post('http://localhost:3002/verify-otp', { email, otp });

      if (response.data.message === 'OTP verification successful') {
        toast.success('OTP verified successfully');

        // Redirect to reset password page with email as query parameter
        window.location.href = `/reset-password?email=${encodeURIComponent(email)}`;
      } else {
        toast.error('Failed to verify OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('Internal server error');
    }
  };

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title style={{ textAlign: 'center', color: 'blue' }}>Verify OTP</Card.Title>
          <Card.Text>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>OTP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={handleOtpChange}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleVerifyOTP}>
                Verify OTP
              </Button>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default VerifyPassword;
