import React, { useState, useEffect } from "react";
import "./style.scss";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserActions from "../../store/user/actions";

const RegisterUser = ({ createUser, userReducer }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [error, setError] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError("Passwords dont match !");
      setTimeout(() => {
        setError(null);
      }, 5000);
    } else {
      createUser(name, email, password);
    }
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
    <div className="signup-page">
      <div className="signup-page-container">
        <div className="signup-form-container">
          <h3>Sign up</h3>
          <form onSubmit={(e) => submitHandler(e)}>
            <label htmlFor="email_reg">Email Address</label>
            <input
              type="email"
              id="email_reg"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="name_reg">Your Name</label>
            <input
              type="text"
              id="name_reg"
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="password_reg">Enter your password</label>
            <input
              type="password"
              id="password_reg"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password_conf_reg">Confirm Your passord</label>
            <input
              type="password"
              id="password_conf_reg"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <button type="submit">Confirm</button>
          </form>
          {error && (
            <div className="regist_error">
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser);
