import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase-config";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, []);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [err, setError] = useState(false);
  const login = async (e) => {
    e.preventDefault();
    if (!loginEmail.length || !loginPassword.length) return;
    setLoading(true);
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/home");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(true);
      console.log("Something went wrong");
    }
  };

  

  return (
    <div className="innerContainer">
      <div className="containerWrapper">
        {loading ? (
          <div className="login-spinner-box">
            <div className="login-three-quarter-spinner"></div>
          </div>
        ) : (
          <div className="login-box">
            <span className="logo">Group Chat</span>
            <span className="login-title">Login</span>
            <form
              className="login-form"
              onSubmit={(e) => {
                e.preventDefault();
                login();
              }}
              style={{ width: "100%" }}
            >
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
              <div className="loginbutton">
                <button className="login-button" onClick={login} disabled={loading}>
                  Log In
                </button>
              </div>
              {err && (
                <span className="login-error-msg">Invalid Credentials!</span>
              )}
            </form>
            <p className="text">
              Don't have an account?
              <Link className="register" to="/register">
                Register
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
