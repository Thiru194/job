import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios'; 
import '../Components/LoginCard.css';
import Sidebar from './Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const LoginCard = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setFormErrors({ ...formErrors, email: '' });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setFormErrors({ ...formErrors, password: '' });
  };

  const handleLoginClick = async () => {
    const newFormErrors = {};
    if (!email) {
      newFormErrors.email = 'Email is required';
    }
    if (!password) {
      newFormErrors.password = 'Password is required';
    }

    if (Object.keys(newFormErrors).length > 0) {
      setFormErrors(newFormErrors);
    } else {
      setLoading(true);

      try {
        // Make API call to the login endpoint
        const response = await axios.post('http://localhost:3002/login', { email, password });

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
        console.error('Error during login:', error.message);
        toast.error('Invalid Password', {
          position: toast.POSITION.TOP_CENTER,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className='Card'>
      <Sidebar />
      <Card style={{ width: '18rem',marginTop:"30px" }}>
        <Card.Body>
          <Card.Title style={{ textAlign: 'center', color: 'blue' }}>Login</Card.Title>
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
                <Form.Text className="text-danger">{formErrors.email}</Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='********'
                  value={password}
                  onChange={handlePasswordChange}
                />
                <Form.Text className="text-danger">{formErrors.password}</Form.Text>
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
            <Button variant="outline-primary" onClick={handleLoginClick} style={{ marginLeft: "100px", marginTop: "" }}>
              {loading ? <Spinner animation="border" variant="primary" size="sm" /> : 'Login'}
            </Button>
            <Link to={'/forgotpassword'}><h6 style={{textAlign:"center",marginTop:"10px",marginLeft:"15px"}}>Forget Password</h6></Link>
          </Card.Text>
        </Card.Body>
      </Card>
      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default LoginCard;