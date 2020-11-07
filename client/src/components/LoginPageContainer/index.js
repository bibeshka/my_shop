import React, { useState } from "react";
import "./style.scss";

import axios from "axios";
import urlBasic from "../../utils/UrlVar";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const setCredentials = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${urlBasic}/api/v1/admin/login`,
      data: { email, password },
    })
      .then((data) => {
        if (data.status === 200) {
          sessionStorage.setItem("jwt", data.data.token);
          console.log(data.status);
          window.location = "/admin";
        }
      })
      .catch((err) => {
        setError(
          err.response.status === 429 ? "Too many requests" : "Fail to login"
        );
        setTimeout(errorTimer, 5000);
        setEmail("");
        setPassword("");
        console.log(err.response.status);
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
