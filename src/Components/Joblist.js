import React, { useState, useEffect } from 'react';
import { Button, Table, Col, Row } from 'react-bootstrap';
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
      } catch (error) {
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
      <div className="table-responsive">
        <Table striped bordered hover variant="light" style={{ marginTop: '30px' }}>
          <thead className='text-center'>
            <tr>
              <th>Company Name</th>
              <th>Job Position</th>
              <th>Salary</th>
              <th>Mail ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.companyname}</td>
                <td>{item.aboutjob}</td>
                <td>{item.salary}</td>
                <td>{item.mail}</td>
                <td>
                  <Row>
                    <Col xs={12} sm={6} className="mb-2 mb-sm-0">
                      <Link to="/details">
                        <Button variant="outline-info" block >
                          Apply
                        </Button>
                      </Link>
                    </Col>
                    <Col xs={12} sm={6}>
                      <Button variant="outline-danger" onClick={() => handleDelete(item._id)} block>
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default Joblist;
