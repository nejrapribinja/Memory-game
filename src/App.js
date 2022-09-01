import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Game from './components/Game';
import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase-config';

function App() {
  // const [user, setUser] = useState({})

  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser);
  // })
  // console.log(user.email)

  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/game" element={<Game  />} />

    </Routes>
  );
}

export default App;
