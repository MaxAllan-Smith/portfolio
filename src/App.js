import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from './components/homepage/homepage';
import NavBar from "./components/navbar/navbar";
import SignUp from "./components/signup/signup";

function App() {
  return (
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Homepage />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
