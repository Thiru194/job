// import Background from'./Components/Background.js'
// import LoginCard from './Components/LoginCard.js';
import LoginCard from './Components/LoginCard.js';
// import Sidebar from './Components/Sidebar.js'
// import Front from './Components/Front.js'
import LandingPage from "./Components/LandingPage";
import {Route, Routes} from "react-router-dom";
import Signup from "./Components/Signup.js"
import  Postjob from './Components/Postjob.js';
import  Jobdet from './Components/Jobdet.js';
import Help from './Components/Help.js';
import Joblist from './Components/Joblist.js';
import Details from './Components/Details.js';
import Jobapply from './Components/Jobapply.js';
import ForgotPassword from './Components/ForgotPassword.js';
import VerifyPassword from './Components/VerifyPassword.js';
import ResetPassword from './Components/ResetPass.js';
import { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    
      <Routes>
      <Route path='/' element={<LandingPage/>}></Route>
      <Route path='/Login' element={<LoginCard/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/postjob' element={<Postjob/>}></Route>
      <Route path='/jobdet' element={<Jobdet/>}></Route>
      <Route path='/help' element={<Help/>}></Route>
      <Route path='/joblist' element={<Joblist/>}></Route>
      <Route path='/details' element={<Details/>}></Route>
      <Route path='/jobapply' element={<Jobapply/>}></Route>
      <Route path='/forgotpassword' element={<ForgotPassword handleEmailChange={handleEmailChange}/>} />
      <Route path='/verify-otp' element={<VerifyPassword email={email}/>} />
      <Route path='/reset-password' element={<ResetPassword/>} />
      </Routes>
  );
}

export default App;
