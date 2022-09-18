import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, navigate, useNavigate } from "react-router-dom";
import { auth } from "../Firebase-config";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  useEffect(()=>{
const user = JSON.parse(localStorage.getItem("currentUser"));
if (user) {
  navigate("/home");
}
else{navigate("/login")};

  },[]);
  
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const login = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/home");
      console.log(user);
    } catch (error) {
      console.log(error.message, "error");
    }
  };
  return (
    <div className="innerContainer">
      <div className="containerWrapper">
        <span className="logo">Group Chat</span>
        <span className="login-title">Login</span>
        <form className="login-form">
          <input
            type="email"
            className="login-email"
            placeholder="email"
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />
          <input
            type="password"
            className="login-password"
            placeholder="password"
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />
          <button className="login-button" onClick={login}>
            Login
          </button>
        </form>
        <p className="text">
          Don't have an account?
          <Link className="register" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
