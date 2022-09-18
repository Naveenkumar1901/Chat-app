import React, { useEffect } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) navigate("/home");
    else navigate("/login");
  }, []);

  return;
};

export default App;
