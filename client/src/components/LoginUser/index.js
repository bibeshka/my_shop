import React, { useState, useEffect } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import validator from "validator";
import { errorHandler } from "../../utils/errorHandler";
import ErrorWindow from "../Utils_Components/ErrorWindow";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserActions from "../../store/user/actions";

const LoginUser = ({ loginUser, userReducer }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (validator.isEmpty(email) || validator.isEmpty(password)) {
      errorHandler(setError, "Fill in all fields");
      return;
    }
    loginUser(email, password);
  };

  useEffect(() => {
    if (userReducer.userInfo) {
      window.location = "/";
    } else if (userReducer.error) {
      errorHandler(setError, userReducer.error);
    }
  }, [userReducer]);

  return (
    <div className="login-user-page">
      <div className="login-user-page-container">
        <div className="login-user-form-container">
          <h3>Login</h3>
          <form onSubmit={(e) => submitHandler(e)}>
            <label htmlFor="email_log">Email Address</label>
            <input
              type="email"
              id="email_log"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password_log">Password</label>
            <input
              type="password"
              id="password_log"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Confirm</button>
            <div className="signup_link">
              <Link to="/signup">Register</Link>
            </div>
            {error && <ErrorWindow error={error} />}
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(UserActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginUser);
