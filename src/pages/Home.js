import React, { useEffect } from "react";
import Chat from "../components/Chat";
import "./home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    navigate("/home");
  }, []);

  return (
    <div className="home">
      <div className="container">
        <Chat />
      </div>
    </div>
  );
};

export default Home;
