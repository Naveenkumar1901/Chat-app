import  { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
