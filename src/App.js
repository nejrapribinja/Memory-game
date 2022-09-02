import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Game from './components/Game';
import { Route, Routes, Navigate } from "react-router-dom";
import React from "react";

function App() {

  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/game" element={<Game  />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
