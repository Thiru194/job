import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import Sidebar from './Sidebar';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); 

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post('http://localhost:3002/forgot-password', { email });

      if (response.data.message === 'OTP sent successfully') {
        toast.success('OTP sent successfully', {
          position: toast.POSITION.TOP_CENTER,
        });
        // Redirect to the VerifyPassword page after sending OTP successfully
        navigate('/verify-otp');
      } else {
        toast.error('Failed to send OTP', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error('Internal server error', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div>
      {/* <Sidebar/> */}
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title style={{ textAlign: 'center', color: 'blue' }}>Forgot Password</Card.Title>
          <Card.Text>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={handleEmailChange}
                />
              </Form.Group>
              <Button variant="primary" style={{ marginLeft: "70px" }} onClick={handleForgotPassword}>
                Send OTP
              </Button>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default ForgotPassword;
