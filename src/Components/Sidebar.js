import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink} from 'react-router-dom';


function Sidebar() {
  return (
    <>
    
      <Navbar bg="dark" data-bs-theme="dark" fixed="top" >
        <Container>
          <Navbar.Brand><h2>Job Board</h2></Navbar.Brand>
          <Nav  className="navbar" >
            <Nav.Link as={NavLink} to="/"><h4>Home</h4></Nav.Link>
            <Nav.Link as={NavLink} to='/postjob'><h4>Post a Job</h4></Nav.Link>
            <Nav.Link as={NavLink} to='/jobdet'><h4>Job details</h4></Nav.Link>
            <Nav.Link as={NavLink} to='/joblist'><h4>Job List</h4></Nav.Link>
            <Nav.Link as={NavLink} to='/help'><h4>Help</h4></Nav.Link>
            <Nav.Link style={{color:"blue"}} as={NavLink} to="/login" ><h6>Login</h6></Nav.Link>
            <Nav.Link><h4>|</h4></Nav.Link>
            <Nav.Link style={{color:"blue"}} as={NavLink} to="/signup"><h6>Signup</h6></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />

      </>
      
  );
}

export default Sidebar;
