import React, { useState, useEffect } from "react";
import "./style.scss";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserActions from "../../store/user/actions";

const LoginUser = ({ loginUser, userReducer }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    loginUser(email, password);
  };

  useEffect(() => {
    if (userReducer.userInfo) {
      window.location = "/";
    } else if (userReducer.error) {
      setError(userReducer.error);

      setTimeout(() => {
        setError(null);
      }, 5000);
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
            />
            <label htmlFor="password_log">Password</label>
            <input
              type="password"
              id="password_log"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Confirm</button>
            <div className="signup_link">
              <Link to="/signup">Register</Link>
            </div>
          </form>
          {error && (
            <div className="login_error">
              <i className="fas fa-exclamation-circle"></i> {error}
            </div>
          )}
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
