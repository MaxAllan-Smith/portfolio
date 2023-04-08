import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from './components/homepage/homepage';
import NavBar from "./components/navbar/navbar";

function App() {
  return (
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Homepage />}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
