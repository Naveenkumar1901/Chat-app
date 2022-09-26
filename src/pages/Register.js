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
  const [loading, setLoading] = useState(false); 
  const register = async (e) => {
    e.preventDefault();
    if (!registerEmail.length || !registerPassword.length) return;
    setLoading(true);
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/login");
      setLoading(false);
      console.log(user);
    } catch (err) {
      setLoading(false);
      setError(true);
      console.log("Something went wrong");
    }
  };

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
            <form
              className="register-form"
              onSubmit={(e) => {
                e.preventDefault();
                register();
              }}
              style={{ width: "100%" }}
            >
              <input
                type="text"
                className="register-email"
                placeholder="email"
                onChange={(event) => {
                  setRegisterEmail(event.target.value);
                }}
              />
              <input
                type="password"
                className="register-password"
                placeholder="password"
                onChange={(event) => {
                  setRegisterPassword(event.target.value);
                }}
              />
              <div className="signupbutton">
                <button
                  className="signup-button"
                  onClick={register}
                  disabled={loading}
                >
                  Sign Up
                </button>
              </div>
              {err && (
                <span className="register-error-msg">
                  Email/Password format invalid!
                </span>
              )}
            </form>
            <p className="ques-text">
              Already have an account?
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
