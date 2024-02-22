
// import React, { useState } from 'react'
import{Form,Table,Button} from 'react-bootstrap'
import Sidebar from './Sidebar';
// import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const Details = () => {
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
      // Set only the errors without clearing the form data
      setErrors(newErrors);
    }
  

    setFormData({
      name:'',
      date:'',
      hsc:'', 
      cert:'', 
      age:'',
      conum:'',
      cgpa:'',
      exp:'',
      gender:'',
      phnum:'',
      comname:'',
      add:'',
      email:'',
      sslc:'',
      jopos:'', 
      coadd:''
     
    });
  };      
  const validateForm = (data) => {
    const newErrors = {};

    const requiredFields = ['name', 'date', 'hsc', 'cert', 'age', 'conum', 'cgpa', 'exp', 'gender', 'phnum', 'comname', 'add', 'email', 'sslc', 'jopos', 'coadd'];
    requiredFields.forEach((field) => {
      if (!data[field]?.trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
      }
    )

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email?.trim())) {
      newErrors.email = 'Invalid email address';
    }

    return newErrors;
  };
  return (
    <div>
      <Sidebar/>
      <h1 style={{marginTop:"500px",color:"dark",marginLeft:"550px"}}>About Yourself</h1>
      <Form style={{marginTop:"50px",marginLeft:"30px"}} onSubmit={handleSubmit}>
       <Table>
        <tr>
        <td> <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label style={{fontWeight:"900",fontSize:"20px",color:"green"}}>Name</Form.Label>
        <Form.Control
         type="text" 
         name="name"
         placeholder="Type the Name"
          style={{width:"300px",outline:"solid"}} 
          value={formData.name}  
          onChange={handleInputChange}  
        />
        {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
       
      </Form.Group>
      </td>
      <td> 
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label style={{fontWeight:"900",fontSize:"20px",color:"green"}}>DOB</Form.Label>
        <Form.Control type="date"
         name="date"
         placeholder="Type the DOB"  
         style={{width:"300px",outline:"solid"}}
         value={formData.date}  
         onChange={handleInputChange} 
         />
         {errors.date && <span style={{ color: 'red' }}>{errors.date}</span>}
      </Form.Group>
      </td>
      <td> 
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label style={{fontWeight:"900",fontSize:"20px",color:"green"}}>HSC Percentage</Form.Label>
        <Form.Control type="number"
         name='hsc' 
         placeholder=" Enter the HSC Percentage"
          style={{width:"300px",outline:"solid"}} 
          value={formData.hsc} 
          onChange={handleInputChange}
          />
          {errors.hsc && <span style={{ color: 'red' }}>{errors.hsc}</span>}
      </Form.Group>
      </td>
      <td> <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label style={{fontWeight:"900",fontSize:"20px",color:"green"}}>Certificates</Form.Label>
        <Form.Control type="number" name='cert' placeholder="Enter the Certificate count" style={{width:"300px",outline:"solid"}}
         value={formData.cert}  
         onChange={handleInputChange} 
         />
         {errors.cert && <span style={{ color: 'red' }}>{errors.cert}</span>} 
      </Form.Group>
  </td>
      </tr>
      <tr>
        <td> <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label style={{fontWeight:"900",fontSize:"20px",color:"green"}}>Age</Form.Label>
        <Form.Control type="number" name='age' placeholder="Enter the age" style={{width:"300px",outline:"solid"}} 
         value={formData.age}  
         onChange={handleInputChange} 
         />
         {errors.age && <span style={{ color: 'red' }}>{errors.age}</span>} 
      </Form.Group>
      </td>
      <td> <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label style={{fontWeight:"900",fontSize:"20px",color:"green"}}>Contact Number</Form.Label>
        <Form.Control type="number"   name='conum'placeholder="Enter the Contact Number"  style={{width:"300px",outline:"solid"}}
         value={formData.conum}  
         onChange={handleInputChange} 
         />
         {errors.conum && <span style={{ color: 'red' }}>{errors.conum}</span>}  
      </Form.Group>
      </td>
      
      <td> <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label style={{fontWeight:"900",fontSize:"20px",color:"green"}}>CGPA</Form.Label>
        <Form.Control type="number" name='cgpa' placeholder=" Enter the cgpa" style={{width:"300px",outline:"solid"}} 
         value={formData.cgpa}  
         onChange={handleInputChange} 
         />
         {errors.cgpa && <span style={{ color: 'red' }}>{errors.cgpa}</span>} 
      </Form.Group>
      </td>
      <td> <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label style={{fontWeight:"900",fontSize:"20px",color:"green"}}>Experience</Form.Label>
        <Form.Control type="number" name='exp' placeholder="Type the Experience" style={{width:"300px",outline:"solid"}}
          value={formData.exp}  
          onChange={handleInputChange} 
          />
          {errors.exp && <span style={{ color: 'red' }}>{errors.exp}</span>} 
      </Form.Group>
      </td>
      </tr>
      <tr>
        <td> <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label style={{fontWeight:"900",fontSize:"20px",color:"green"}}>Gender</Form.Label>
        <Form.Control type="text" name='gender' placeholder="Type the gender" style={{width:"300px",outline:"solid"}} 
         value={formData.gender}  
         onChange={handleInputChange} 
         />
         {errors.gender && <span style={{ color: 'red' }}>{errors.gender}</span>} 
      </Form.Group>
      </td>
      <td> <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label style={{fontWeight:"900",fontSize:"20px",color:"green"}}>Phone Number</Form.Label>
        <Form.Control type="number" name='phnum' placeholder=" Enter the Phone Number"  style={{width:"300px",outline:"solid"}} 
         value={formData.phnum}  
         onChange={handleInputChange} 
         />
         {errors.phnum && <span style={{ color: 'red' }}>{errors.phnum}</span>} 
      </Form.Group>
      </td>
     
      <td> <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label style={{fontWeight:"900",fontSize:"20px",color:"green"}}>Company Name</Form.Label>
        <Form.Control type="text" name='comname' placeholder=" Type the Company Name" style={{width:"300px",outline:"solid"}}
         value={formData.comname}  
         onChange={handleInputChange} 
         />
         {errors.comname && <span style={{ color: 'red' }}>{errors.comname}</span>} 
      </Form.Group>
      </td>
      <td> 
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label style={{fontWeight:"900",fontSize:"20px",color:"green"}}>SSLC Percentage</Form.Label>
        <Form.Control type="number"  name='sslc'placeholder=" Enter the SSLC percentage"  style={{width:"300px",outline:"solid"}}  
        value={formData.sslc}  
         onChange={handleInputChange} 
         />
         {errors.sslc && <span style={{ color: 'red' }}>{errors.sslc}</span>} 
      </Form.Group>
      </td>
      </tr>
      <tr>
        <td> <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label style={{fontWeight:"900",fontSize:"20px",color:"green"}}>Email</Form.Label>
        <Form.Control type="email" name='email' placeholder="name@example.com" style={{width:"300px",outline:"solid"}} 
        value={formData.email}  
        onChange={handleInputChange}  />
        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
      </Form.Group>
      </td>
      <td> 
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label style={{fontWeight:"900",fontSize:"20px",color:"green"}}>Address</Form.Label>
        <Form.Control as="textarea" name='add' rows={2} style={{outline:"solid",color:"green"}} placeholder='Type the Address' 
         value={formData.add}  
         onChange={handleInputChange} 
         />
         {errors.add && <span style={{ color: 'red' }}>{errors.add}</span>} 
      </Form.Group>
      </td>
     
      <td> <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label style={{fontWeight:"900",fontSize:"20px",color:"green"}}>Job Position</Form.Label>
        <Form.Control type="text" name='jopos' placeholder="Type the job position" style={{width:"300px",outline:"solid"}}   
        value={formData.jopos}  
         onChange={handleInputChange} 
         />
         {errors.jopos && <span style={{ color: 'red' }}>{errors.jopos}</span>} 
      </Form.Group>
      </td>
      <td> <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label style={{fontWeight:"900",fontSize:"20px",color:"green"}}>Confirm Address</Form.Label>
        <Form.Control as="textarea" name='coadd' rows={2} style={{outline:"solid",color:"green"}} placeholder='Type the Confirm Address' 
         value={formData.coadd}  
         onChange={handleInputChange} 
         />
         {errors.coadd && <span style={{ color: 'red' }}>{errors.coadd}</span>} 
      </Form.Group>
      </td>
      </tr>
      </Table>
      <Button type='submit' onSubmit={handleSubmit}  style={{marginLeft:"1250px",width:"100px"}}variant="success">Apply</Button>
       <ToastContainer/>
         </Form>
    </div>
  )
}
export default Details;
