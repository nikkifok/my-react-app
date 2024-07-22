import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import BGM from "./BGM";
import Homepage from "./Homepage";
import PreTest from "./PreTest";
import Intro from "./Intro";
import PostTest from "./PostTest";
import { TestCompletionProvider, TestCompletionContext } from './TestCompletionContext';
import { PostTestCompletionProvider, PostTestCompletionContext } from "./PostTestCompletionContext";
import Email from "./Email";
import Text from "./Text";
import Quiz from "./Quiz";
import End from "./End";

function App() {
  const [shouldPlayMusic, setShouldPlayMusic] = useState(false);

  const handleStartGame = () => {
    setShouldPlayMusic(true);
  };

  return (
    <TestCompletionProvider>
      <PostTestCompletionProvider>
        <Router>
          <BGM src="/assets/Galactic-Rap.mp3" volume={0.3} shouldPlay={shouldPlayMusic} /> {/* Credits: "Galactic Rap " Kevin MacLeod (incompetech.com) Licensed under Creative Commons: By Attribution 4.0 License */}
            <Routes>
              <Route path="/" element={<Homepage onStartGame={handleStartGame} />} />
              <Route path="/PreTest" element={<ProtectedRoute component={<PreTest />} />} />
              <Route path="/Intro" element={<Intro />} />
              <Route path="/PostTest" element={<ProtectedPostTestRoute component={<PostTest />} />} />
              <Route path="/Email" element={<Email />} />
              <Route path="/Text" element={<Text />} />
              <Route path="/Quiz" element={<Quiz />} />
              <Route path="/End" element={<End />} />
            </Routes>
        </Router>
        </PostTestCompletionProvider>
    </TestCompletionProvider>
  );
}

const ProtectedRoute = ({ component }) => {
  const { testCompleted } = React.useContext(TestCompletionContext);

  return testCompleted ? <Navigate to="/intro" replace /> : component;
}

const ProtectedPostTestRoute = ({ component }) => {
  const { postTestCompleted } = React.useContext(PostTestCompletionContext);

  return postTestCompleted ? <Navigate to="/" replace /> : component;
}

export default App;
