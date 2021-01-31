import React, { useState } from "react";
import "./style.scss";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserActions from "../../store/user/actions";

const RegisterUser = ({ createUser }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert("Passwords dont match !");
    } else {
      createUser(name, email, password);
      window.location = "/";
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-page-container">
        <div className="signup-form-container">
          <h3>Sign up</h3>
          <form onSubmit={(e) => submitHandler(e)}>
            <label for="email_reg">Email Address</label>
            <input
              type="email"
              id="email_reg"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label for="name_reg">Your Name</label>
            <input
              type="text"
              id="name_reg"
              onChange={(e) => setName(e.target.value)}
            />
            <label for="password_reg">Enter your password</label>
            <input
              type="password"
              id="password_reg"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label for="password_conf_reg">Confirm Your passord</label>
            <input
              type="password"
              id="password_conf_reg"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <button type="submit">Confirm</button>
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
