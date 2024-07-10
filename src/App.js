import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./Homepage";
import PreTest from "./PreTest";
import Intro from "./Intro";
import PostTest from "./PostTest";
import { TestCompletionProvider, TestCompletionContext } from './TestCompletionContext';


function App() {
  return (
    <TestCompletionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/PreTest" element={<ProtectedRoute component={<PreTest />} />} />
          <Route path="/Intro" element={<Intro />} />
          <Route path="/PostTest" element={<PostTest />} />
        </Routes>
      </Router>
    </TestCompletionProvider>
  );
}

const ProtectedRoute = ({ component }) => {
  const { testCompleted } = React.useContext(TestCompletionContext);

  return testCompleted ? <Navigate to="/intro" replace /> : component;
}

export default App;
