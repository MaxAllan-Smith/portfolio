import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from './components/homepage/homepage';
import NavBar from "./components/navbar/navbar";
import Login from "./components/login/login";
import SignUp from "./components/signup/signup";
import Contact from "./components/contact/contact";
import EmailVerification from "./components/verifyEmail/verifyEmail";
import EmailResponse from "./components/emailResponse/emailResponse";

function App() {
  return (
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Homepage />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/users/verify-email/:token" element={<EmailVerification />}/>
          <Route path="/contact/respond/:userId" element={<EmailResponse />}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
