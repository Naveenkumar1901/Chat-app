import React, { useEffect } from "react";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import Search from "../components/Search";
import Navbar from "../components/Navbar";
import "./home.css";
import { navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      navigate("/home");
    } else {
      navigate("/login");
    }
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
