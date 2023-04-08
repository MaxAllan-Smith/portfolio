import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from './components/homepage/homepage';
import NavBar from "./components/navbar/navbar";
import Login from "./components/login/login";

function App() {
  return (
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Homepage />}/>
          <Route path="/login" element={<Login />}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
