import React from "react";
import "./style.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-container__info">
          <h3>Contacts:</h3>
          <div className="contacts-links">
            <a href="https://github.com/bibeshka">
              <i className="fab fa-github" />
              github
            </a>
            <br />
            <a href="https://github.com/bibeshka">
              <i className="fas fa-envelope" />
              papchenco7@gmail.com
            </a>
          </div>
        </div>
        <div className="copy">© 2020, Bibeshka</div>
      </div>
    </div>
  );
};

export default Footer;
