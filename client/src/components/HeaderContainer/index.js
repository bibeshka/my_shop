import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProductsActions from '../../store/home/actions';
import { logoutAcc } from '../../utils/fetchData';

const Header = ({ cartReducer, favoriteReducer, getProducts, basketReducer }) => {

  const authTokenStatus = sessionStorage.getItem('jwt');

  let amount = cartReducer.reduce((sumAmount, item) => {
    console.log(item.amount)
    return sumAmount += item.amount
    // sumAmount[item._id] = item.amount;
    // console.log(sumAmount)
    // return sumAmount;

  }, 0);

  const favoriteAmount = favoriteReducer.length;

  const [search, setSearch] = useState('');

  return (
    <div className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h1>Toy Shop</h1>
          </Link>
        </div>
        <div className="search">
          {/* <form onSubmit={() => getProducts(search)}> */}
          <form>
            <input type="text" onChange={(e) => setSearch(e.target.value)} />
            {/* <button type="submit">Search</button> */}
            <div className="search-btn" onClick={() => {
              getProducts(search);
              setSearch('');  
            }}><i className="fas fa-search" /></div>
          </form>
        </div>
        <nav>
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
    </div>
  )
}

const mapDispatchToProps = dispatch => bindActionCreators(ProductsActions, dispatch);

export default connect(state => ({
  basketReducer: state.cartReducer.basketNumber,
  cartReducer: state.cartReducer.cart,
  favoriteReducer: state.favoriteReducer.favorite
}), mapDispatchToProps)(Header);
