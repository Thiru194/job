// ResetPass.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const ResetPass = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { email: resetEmail } = useParams();

  useEffect(() => {
    setEmail(resetEmail);
  }, [resetEmail]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleResetPassword = async () => {
    try {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }

      const response = await axios.post('http://localhost:3002/reset-password', { email, password });

      if (response.data.message === 'Password reset successful') {
        toast.success('Password reset successful');
      } else {
        toast.error('Failed to reset password. Please try again later.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error('Internal server error. Please try again later.');
    }
  };

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title style={{ textAlign: 'center', color: 'blue' }}>Reset Password</Card.Title>
          <Card.Text>
            <Form>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control type="password" placeholder="Enter new password" value={password} onChange={handlePasswordChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formConfirmPassword">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm new password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
              </Form.Group>
              <Button variant="primary" onClick={handleResetPassword}>
                Reset Password
              </Button>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default ResetPass;
