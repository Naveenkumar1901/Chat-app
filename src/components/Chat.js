import React, { useState } from "react";
import Messages from "./Messages";
import Input from "./Input";
import Addlogo from "../image/applogo.jpeg";
import { navigate, useNavigate } from "react-router-dom";
const Chat = () => {
 const navigate = useNavigate();
  return (
    <div className="chat">
      <div className="title-bar">
        <div className="group-header">
          <img className="app-logo" src={Addlogo} alt="" />
          <h1 className="title">Group Chat</h1>
          <div className="nav-set"></div>
        </div>
        <button
          className="logout-button"
          onClick={() => {
            localStorage.removeItem("currentUser");
            navigate("/login");
          }}
        >
          <p className="logout">Log out</p>{" "}
        </button>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
