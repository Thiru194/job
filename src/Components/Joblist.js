import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from './Sidebar';

export const Joblist = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/getdata');
        console.log('Data fetched:', response.data);
        setData(response.data);
      } catch (error){
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3002/delete/${id}`);

      console.log('Delete response:', response);

      if (response.status === 200) {
        toast.success('Task deleted successfully', {
          position: 'top-center',
        });

       
       setData((prevData) => prevData.filter((item) => item._id !== id));
      } else {
        toast.error('Error deleting task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Error deleting task');
    }
  };

  return (
    <div>
      <Sidebar />
      <Table striped bordered hover variant="dark" style={{ marginTop: '400px', width: '1000px' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>Company Name</th>
            <th style={{ textAlign: 'center' }}>Job Position</th>
            <th style={{ textAlign: 'center' }}>Salary</th>
            <th style={{ textAlign: 'center' }}>Mail ID</th>
            <th style={{ textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td style={{ textAlign: 'center' }}>{item.companyname}</td>
              <td style={{ textAlign: 'center' }}>{item.aboutjob}</td>
              <td style={{ textAlign: 'center' }}>{item.salary}</td>
              <td style={{ textAlign: 'center' }}>{item.mail}</td>
              <td>
                <Link to="/details">
                  <Button
                    variant="outline-info"
                    style={{ marginRight: '10px', textAlign: 'center', marginLeft: '70px' }}
                  >
                    Apply
                  </Button>
                </Link>
                <Button
                  variant="outline-danger"
                  onClick={() => handleDelete(item._id)}
                >
                 Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default Joblist;
