import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="sm" fixed="top">
        <Container>
          <Navbar.Brand>Job Board</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link as={NavLink} to="/" className="nav-link">Home</Nav.Link>
              <Nav.Link as={NavLink} to="/postjob" className="nav-link">Post a Job</Nav.Link>
              <Nav.Link as={NavLink} to="/jobdet" className="nav-link">Job Details</Nav.Link>
              <Nav.Link as={NavLink} to="/joblist" className="nav-link">Job List</Nav.Link>
              <Nav.Link as={NavLink} to="/help" className="nav-link">Help</Nav.Link>
              <Nav.Link style={{ color: "blue" }} as={NavLink} to="/login" className="nav-link">Login</Nav.Link>
              <NavLink style={{ color: "white" }}> <h4>|</h4></NavLink>
              <Nav.Link style={{ color: "blue" }} as={NavLink} to="/signup" className="nav-link">Signup</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default Sidebar;
