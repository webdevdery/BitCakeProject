import React, { useEffect, useState } from "react";
import "./App.css";
import Routes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "firebase.js";

const App = () => {
  const [authenticated, setAuthenticated] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user ? setAuthenticated(true) : setAuthenticated(false);
    });
  });
  return (
    <div className="App">
      <Routes authenticated={authenticated} />
      <ToastContainer autoClose={5000} hideProgressBar />
    </div>
  );
};

export default App;
