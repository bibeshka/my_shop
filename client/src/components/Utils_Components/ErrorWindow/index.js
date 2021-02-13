import React from "react";
import "./style.scss";

const ErrorWindow = ({ error }) => {
  return (
    <div className="login_error-container">
      <div className="login_error">
        <i className="fas fa-exclamation-circle"></i> {error}
      </div>
    </div>
  );
};

export default ErrorWindow;
