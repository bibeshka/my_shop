import React, { useState, useEffect } from "react";

import useInput from "../../hooks/useInput";
import "./style.scss";
import validator from "validator";
import { errorHandler } from "../../utils/errorHandler";
import ErrorWindow from "../Utils_Components/ErrorWindow";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserActions from "../../store/user/actions";

const RegisterUser = ({ createUser, userReducer }) => {
  const email = useInput("");
  const name = useInput("");
  const password = useInput("");
  const passwordConfirm = useInput("");

  const [error, setError] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      validator.isEmpty(email.value) ||
      validator.isEmpty(name.value) ||
      validator.isEmpty(password.value) ||
      validator.isEmpty(passwordConfirm.value)
    ) {
      errorHandler(setError, "Fill in all fields");
      return;
    }

    if (password.value !== passwordConfirm.value) {
      errorHandler(setError, "Passwords dont match !");
      return;
    }
    createUser(name.value, email.value, password.value);
  };

  useEffect(() => {
    if (userReducer.userInfo) {
      window.location = "/";
    } else if (userReducer.error) {
      errorHandler(setError, userReducer.error);
    }
  }, [userReducer]);

  return (
    <div className="signup-page">
      <div className="signup-page-container">
        <div className="signup-form-container">
          <h3>Sign up</h3>
          <form onSubmit={(e) => submitHandler(e)}>
            <label htmlFor="email_reg">Email Address</label>
            <input type="email" id="email_reg" {...email} required />

            <label htmlFor="name_reg">Your Name</label>
            <input type="text" id="name_reg" {...name} required />

            <label htmlFor="password_reg">Enter your password</label>
            <input type="password" id="password_reg" {...password} required />

            <label htmlFor="password_conf_reg">Confirm Your passord</label>
            <input
              type="password"
              id="password_conf_reg"
              {...passwordConfirm}
              required
            />

            <button type="submit">Confirm</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser);
