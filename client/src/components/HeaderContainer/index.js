import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import Search from "../Utils_Components/Search";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserActions from "../../store/user/actions";

const Header = ({
  favoriteReducer,
  basketReducer,
  userReducer,
  logoutUser,
}) => {
  const favoriteAmount = favoriteReducer.length;

  // showing low resolution navigation after click
  const showLowResolutionBar = () => {
    let bar_menu = document.querySelector(".bar_menu");
    bar_menu.classList.contains("show")
      ? bar_menu.classList.remove("show")
      : bar_menu.classList.add("show");
  };

  return (
    <div className="header" data-testid="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h1>T_Shop</h1>
          </Link>
        </div>

        <Search />

        <div className="burger_menu_btn" onClick={() => showLowResolutionBar()}>
          <i className="fas fa-bars"></i>
        </div>

        <nav className="high-resolution-nav">
          <ul>
            <li>
              <Link to={"/cart"}>
                <div className="cart-amount">{basketReducer}</div>
                <i className="fas fa-shopping-cart"></i>
                {/* <p>Cart</p> */}
              </Link>
            </li>
            <li>
              <Link to={"/favorites"}>
                <div className="favorites-amount">{favoriteAmount}</div>
                <i className="fas fa-heart"></i>
                {/* <p>Favorites</p> */}
              </Link>
            </li>
            <li>
              {userReducer.userInfo && (
                <div>
                  <Link to="/">
                    <i className="fas fa-user"></i>
                    <p>{userReducer.userInfo.name}</p>
                  </Link>
                </div>
              )}
            </li>
            <li>
              {userReducer.userInfo ? (
                <div
                  onClick={() => logoutUser(userReducer.userInfo.token)}
                  className="login_image"
                >
                  <i className="fas fa-sign-in-alt"></i>
                </div>
              ) : (
                <Link to="/login">
                  <i className="fas fa-sign-in-alt"></i>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>

      <div className="bar_menu">
        <ul>
          <li>
            <Search />
          </li>
          <li>
            <Link to={"/cart"}>
              <i className="fas fa-shopping-cart"></i>
              <p>Cart</p>
              <div className="cart-amount">{basketReducer}</div>
            </Link>
          </li>
          <li>
            <Link to={"/favorites"}>
              <i className="fas fa-heart"></i>
              <p>Favorites</p>
              <div className="favorites-amount">{favoriteAmount}</div>
            </Link>
          </li>
          <li>
            {userReducer.userInfo && (
              <div>
                <Link to="/">
                  <i className="fas fa-user"></i>
                  <p>{userReducer.userInfo.name}</p>
                </Link>
              </div>
            )}
          </li>
          <li>
            {userReducer.userInfo ? (
              <div
                onClick={() => logoutUser(userReducer.userInfo.token)}
                className="login_image"
              >
                <Link to="/">
                  <i className="fas fa-sign-in-alt"></i>
                  <p>Logout</p>
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <i className="fas fa-sign-in-alt"></i>
                <p>Login</p>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  basketReducer: state.cartReducer.basketNumber,
  favoriteReducer: state.favoriteReducer.favorite,
  userReducer: state.userReducer,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(UserActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
