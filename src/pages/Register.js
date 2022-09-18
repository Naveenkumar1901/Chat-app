import React, { useEffect, useState } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { BiImageAdd } from "react-icons/bi";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase-config";

const Register = () => {
   const navigate = useNavigate();
useEffect(()=>{
const user = JSON.parse(localStorage.getItem("currentUser"));
if(user){
  navigate("/home");
}else{navigate("/register")}
},[]);

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const register = async (e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
 
  return (
    <div className="innerContainer">
      <div className="register-containerWrapper">
        <span className="logo">Group Chat</span>
        <span className="register-title">Register</span>
        <form className="register-form">
          <input
            type="text"
            className="register-email"
            placeholder="email"
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
          />
          <input
            type="text"
            className="register-password"
            placeholder="password"
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
          />
          <button className="signup-button" onClick={register}>
            Sign up
          </button>
        </form>
        <p className="ques-text">
          Do you have an account?
          <Link className="login-link" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
