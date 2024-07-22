import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import BGM from "./components/BGM";
import Homepage from "./components/Homepage";
import PreTest from "./components/PreTest";
import Intro from "./components/Intro";
import PostTest from "./components/PostTest";
import { TestCompletionProvider, TestCompletionContext } from './components/TestCompletionContext';
import { PostTestCompletionProvider, PostTestCompletionContext } from "./components/PostTestCompletionContext";
import Email from "./components/Email";
import Text from "./components/Text";
import Quiz from "./components/Quiz";
import End from "./components/End";

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
