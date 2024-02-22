// Front.jsx
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Components/home.css';

const Front = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await axios.post('http://localhost:3002/upload', formData);

        console.log(response.data.message);

        toast.success('File uploaded successfully', {
          position: toast.POSITION.TOP_CENTER,
        });
      } catch (error) {
        console.error('File upload failed:', error);
        toast.error('File upload failed', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } else {
      console.warn('Please choose a file before uploading.');
      toast.warning('Please choose a file before uploading.', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className='typo'>
      <h1>There are 450+ job Offerings </h1>
      <Form.Group controlId="formFileDisabled" className="mb-5">
        <Form.Label style={{ marginLeft: "260px" }}>Update your Resume</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} />
      </Form.Group>
      <Button variant="outline-dark" style={{ marginLeft: '300px', width: "100px" }} onClick={handleFileUpload}>
        Update
      </Button>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default Front;
