import React, { useState } from "react";
import "./style.scss";

import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const setCredentials = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:5000/api/v1/admin/login",
      data: { email, password },
    })
      .then((data) => {
        if (data.status === 200) {
          sessionStorage.setItem("jwt", data.data.token);
          console.log(data.status);
          window.location = "/admin";
        }
      })
      .catch(() => {
        setError("Failed To Login");
        setTimeout(errorTimer, 5000);
        setEmail("");
        setPassword("");
      });
  };

  const errorTimer = () => {
    const errMes = document.querySelector(".login-error-message");
    errMes.style = "display: none";
    setError("");
  };

  return (
    <div className="login-page">
      <div className="login-page-container">
        <div className="login-form-container">
          <h3>Login</h3>
          <form onSubmit={(e) => setCredentials(e)}>
            <input
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button type="submit">Confirm</button>
          </form>
          {error ? <div className="login-error-message">{error}</div> : null}
          <div className="login-form-container__functions">
            <button>Singn up</button>
            <p>Forgot Your Password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
