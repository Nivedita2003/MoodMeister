import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Contact from "./contact";


function App() {
  return (
    <><div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </div></>
  );
}

export default App;