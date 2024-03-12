import React, { useState } from 'react';
import { Form, Table, Button, Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Details = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: '', 
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
  
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
      toast('Job Applied Successfully!', {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      setErrors(newErrors);
    }

    setFormData({}); // Clear the form fields after submission
  };      

  const validateForm = (data) => {
    const newErrors = {};

    const requiredFields = ['name', 'email', 'phone', 'position', 'coverLetter'];
    requiredFields.forEach((field) => {
      if (!data[field]?.trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email?.trim())) {
      newErrors.email = 'Invalid email address';
    }

    return newErrors;
  };

  return (
    <div>
      <Sidebar />
      <h1 className="mt-5 text-center">Apply for a Job</h1>
      <Container className="mt-3">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <Form onSubmit={handleSubmit}>
              <Table responsive bordered variant='danger'>
                <tbody>
                  <tr>
                    <td>
                      <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Your Name" value={formData.name || ''} onChange={handleInputChange} />
                        {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Your Email" value={formData.email || ''} onChange={handleInputChange} />
                        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group controlId="phone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="tel" name="phone" placeholder="Your Phone" value={formData.phone || ''} onChange={handleInputChange} />
                        {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}
                      </Form.Group>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Form.Group controlId="position">
                        <Form.Label>Position</Form.Label>
                        <Form.Control type="text" name="position" placeholder="Position Applied For" value={formData.position || ''} onChange={handleInputChange} />
                        {errors.position && <span style={{ color: 'red' }}>{errors.position}</span>}
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group controlId="education">
                        <Form.Label>Education</Form.Label>
                        <Form.Control type="text" name="education" placeholder="Your Education" value={formData.education || ''} onChange={handleInputChange} />
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group controlId="experience">
                        <Form.Label>Experience</Form.Label>
                        <Form.Control type="text" name="experience" placeholder="Your Experience" value={formData.experience || ''} onChange={handleInputChange} />
                      </Form.Group>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <Form.Group controlId="skills">
                        <Form.Label>Skills</Form.Label>
                        <Form.Control type="text" name="skills" placeholder="Your Skills" value={formData.skills || ''} onChange={handleInputChange} />
                      </Form.Group>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <Form.Group controlId="coverLetter">
                        <Form.Label>Cover Letter</Form.Label>
                        <Form.Control as="textarea" name="coverLetter" rows={4} placeholder="Your Cover Letter" value={formData.coverLetter || ''} onChange={handleInputChange} />
                        {errors.coverLetter && <span style={{ color: 'red' }}>{errors.coverLetter}</span>}
                      </Form.Group>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Button type='submit' className="mt-3" variant="success" style={{ width: '100px', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}>Apply</Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default Details;
