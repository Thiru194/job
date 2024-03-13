
import React from 'react';
import { Table } from 'react-bootstrap';
import Sidebar from './Sidebar';
import '../Components/Jobdet.css';

export const Jobdet = () => {
  return (
    <div>
      <Sidebar />
      <div className="table-responsive">
        <Table striped bordered hover variant='dark' style={{ width: "100%", marginTop: "30px" }}>
          <thead>
            <tr>
              <th style={{ color: "palegreen" }}>S.no</th>
              <th style={{ color: "palegreen" }}>Job Position</th>
              <th style={{ color: "palegreen" }}>Job Specification</th>
              <th style={{ color: "palegreen" }}>Required Skills</th>
              <th style={{ color: "palegreen" }}>Responsibilities</th>
              <th style={{ color: "palegreen" }}>Salary</th>
            </tr>
          </thead>
          <tbody>
          <tr>
              <td>1</td>
              <td>Software Engineer/Developer</td>
              <td>Develops software applications</td>
              <td>Bachelor's degree in Computer Science or related field. Proficient in programming languages such as Java, Python, or C++.</td>
              <td>Code development, debugging, and testing.</td>
              <td>₹80,000 - ₹1,00,000</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Front-End Developer</td>
              <td>Builds user interfaces and experiences using HTML, CSS, and JavaScript.</td>
              <td>Proficiency in front-end technologies. Familiarity with frameworks like React or Angular.</td>
              <td>UI/UX design implementation, responsive web development.</td>
              <td>₹70,000 - ₹1,10,000</td>
            </tr>
            <tr>
              <td>3</td>
              <td >Back-End Developer</td>
              <td >Works on server-side development, handling databases, server logic, and APIs.</td>
              <td>Strong knowledge of server-side languages (Node.js, Python, Ruby, etc.). Experience with databases (SQL, MongoDB, etc.).</td>
              <td>Server-side logic implementation, database management.</td>
              <td>₹75,000 - ₹1,20,000</td>
            </tr>
            <tr>
              <td>4</td>
              <td >Full-Stack Developer</td>
              <td >Expertise in both front-end and back-end development.</td>
              <td>Proficient in both front-end and back-end technologies. Knowledge of web development frameworks.</td>
              <td>End-to-end application development. Collaborates on architecture and design.</td>
              <td>₹90,000 - ₹1,30,000</td>
            </tr>
            <tr>
              <td>5</td>
              <td >Mobile App Developer</td>
              <td >Specializes in creating applications for mobile devices (iOS or Android).</td>
              <td>Experience with mobile app development tools and frameworks (React Native, Flutter, etc.).</td>
              <td>Mobile app development, testing, and optimization.</td>
              <td>₹80,000 - ₹1,20,000</td>
            </tr>
            <tr>
              <td>6</td>
              <td >UI/UX Designer</td>
              <td >Designs the user interface and experience to enhance usability and satisfaction.</td>
              <td>Proficiency in design tools (Sketch, Figma, Adobe XD) and understanding of user-centered design.</td>
              <td>UI/UX design, prototyping, user research.</td>
              <td>₹75,000 - ₹1,15,000</td>
            </tr>
            <tr>
              <td>7</td>
              <td >ML Engineer</td>
              <td >Designs and implements machine learning models and algorithms</td>
              <td>Proficiency in machine learning frameworks (TensorFlow, PyTorch) and programming languages.</td>
              <td>Model development, training, and deployment.</td>
              <td>₹1,00,000 - ₹1,40,000</td>
            </tr>
            <tr>
              <td>8</td>
              <td >Tech Support Engineer</td>
              <td >Assists users in resolving technical issues with software or hardware.</td>
              <td>Strong troubleshooting and communication skills. Knowledge of support tools.</td>
              <td>Technical issue resolution, user support, documentation.</td>
              <td>₹60,000 - ₹90,000</td>
            </tr>
            <tr>
              <td>9</td>
              <td > Data Science Engineer</td>
              <td >Assists users in resolving technical issues with software or hardware.</td>
              <td>Strong troubleshooting and communication skills. Knowledge of support tools.</td>
              <td>Technical issue resolution, user support, documentation.</td>
              <td>₹60,000 - ₹90,000</td>
            </tr>
            <tr>
              <td>10</td>
              <td >Mechanical Engineer</td>
              <td >Assists users in resolving technical issues with software or hardware.</td>
              <td>Strong troubleshooting and communication skills. Knowledge of support tools.</td>
              <td>Technical issue resolution, user support, documentation.</td>
              <td>₹60,000 - ₹90,000</td>
            </tr>
           
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default Jobdet;
