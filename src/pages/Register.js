import React, { useEffect, useState } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase-config";

const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      navigate("/home");
    } else {
      navigate("/register");
    }
  }, []);

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [err, setError] = useState(false);
  const register = async (e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/login");
      console.log(user);
    } catch (err) {
      setError(true);
      console.log("Something went wrong");
    }
  };
  const [loading, setLoading] = useState(true); //need to understand
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });


  return (
    <div className="innerContainer">
      <div className="register-containerWrapper">
        {loading ? (
          <div className="register-spinner-box">
            <div className="register-three-quarter-spinner"></div>
          </div>
        ) : (
          <div className="register-box">
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
              <div className="signupbutton">
                <button className="signup-button" onClick={register}>
                  Sign up
                </button>
              </div>
              {err && (
                <span className="register-error-msg">
                  Email/Password Format Invalid!
                </span>
              )}
            </form>
            <p className="ques-text">
              Do you have an account?
              <Link className="login-link" to="/login">
                Login
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
