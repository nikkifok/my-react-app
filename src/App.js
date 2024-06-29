import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import PreTest from "./PreTest";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/PreTest" element={<PreTest />} />
      </Routes>
    </Router>
  );
}

export default App;
