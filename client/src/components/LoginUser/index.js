import React, { useState } from "react";
import "./style.scss";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserActions from "../../store/user/actions";

const LoginUser = ({ loginUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    loginUser(email, password);
  };

  return (
    <div className="login-user-page">
      <div className="login-user-page-container">
        <div className="login-user-form-container">
          <h1>User Login</h1>
          <form onSubmit={(e) => submitHandler(e)}>
            <input
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginUser);
