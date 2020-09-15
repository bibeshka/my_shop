import React from "react";

const SuccessPaymant = ({ name, email, phone }) => {
  return (
    <div className="success-paymant">
      <ul>
        <li>
          <div className="success-paymant__name">Your Name: {name}</div>
        </li>
        <li>
          <div className="success-paymant__email">Email: {email}</div>
        </li>
        <li>
          <div className="success-paymant__phone">Phone: {phone}</div>
        </li>
      </ul>
    </div>
  );
};

export default SuccessPaymant;
