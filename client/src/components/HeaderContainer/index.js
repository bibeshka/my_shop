import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProductsActions from '../../store/home/actions';
import { logoutAcc } from '../../utils/fetchData';

const Header = ({ cartReducer, favoriteReducer, getProducts, basketReducer }) => {

  //Get auth token from session storage
  const authTokenStatus = sessionStorage.getItem('jwt');

  const favoriteAmount = favoriteReducer.length;

  //set data from search form
  const [search, setSearch] = useState('');

  // showing low resolution navigation after click
  const showLowResolutionBar = () => {
    let bar_menu = document.querySelector('.bar_menu');
    if(bar_menu.classList.contains('show')) {
      bar_menu.classList.remove('show');
    } else {
        bar_menu.classList.add('show');
    }
  }

  return (
    <div className="header">
      
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h1>T_Shop</h1>
          </Link>
        </div>
        <div className="search">
          <form>
            <input type="text" onChange={(e) => setSearch(e.target.value)} />
            {/* <button type="submit">Search</button> */}
            <div className="search-btn" onClick={() => {
              getProducts(search);
              setSearch('');  
            }}><i className="fas fa-search" /></div>
          </form>
        </div>
        
        <div className="burger_menu_btn" onClick={() => showLowResolutionBar()}>
          <i className="fas fa-bars"></i>
        </div>
        
        <nav className="high-resolution-nav">
          <ul>
            <li>
              <Link to={"/cart"}>
                <div className="cart-amount">{basketReducer}</div>
                <i className="fas fa-shopping-cart"></i>
                <p>Cart</p>
              </Link>
            </li>
            <li>
              <Link to={"/favorites"}>
                <div className="favorites-amount">{favoriteAmount}</div>
                <i className="fas fa-heart"></i>
                <p>Favorites</p>
              </Link>
            </li>
            <li>
              {authTokenStatus ? 
                <div onClick={() => logoutAcc(authTokenStatus)} className="login_image">
                  <i className="fas fa-sign-in-alt"></i>
                  {/* <p>Logout</p> */}
                </div> : 
                <Link to="/login">
                  <i className="fas fa-sign-in-alt"></i>
                  {/* <p>Login</p> */}
                </Link>}
            </li>
          </ul>
        </nav>
      </div>
      
      <div className="bar_menu">
          <ul>
            <li>
              <div className="search">
                <form>
                  <input type="text" onChange={(e) => setSearch(e.target.value)} />
                  {/* <button type="submit">Search</button> */}
                  <div className="search-btn" onClick={() => {
                    getProducts(search);
                    setSearch('');  
                  }}><i className="fas fa-search" /></div>
                </form>
              </div>
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
              {authTokenStatus ? 
                // <div onClick={() => logoutAcc(authTokenStatus)} className="login_image">
                //   <i className="fas fa-sign-in-alt"></i>
                //   <p>Logout</p>
                // </div> 
                <Link onClick={() => logoutAcc(authTokenStatus)} to="/">
                  <i className="fas fa-sign-in-alt"></i>
                  <p>Logout</p>
                </Link>: 
                  <Link to="/login">
                    <i className="fas fa-sign-in-alt"></i>
                    <p>Login</p>
                </Link>}
            </li>
          </ul>
        </div>

    </div>
  )
}

const mapDispatchToProps = dispatch => bindActionCreators(ProductsActions, dispatch);

export default connect(state => ({
  basketReducer: state.cartReducer.basketNumber,
  // cartReducer: state.cartReducer.cart,
  favoriteReducer: state.favoriteReducer.favorite
}), mapDispatchToProps)(Header);
