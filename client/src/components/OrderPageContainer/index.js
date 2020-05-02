import React, { useState, useEffect } from 'react';
import './style.scss';

import { connect } from 'react-redux';

import { addOrder } from '../../utils/fetchData';
import { imageReverse } from '../../utils/imageReverse';

const OrderPageContainer = ({ cartReducer, total }) => {

  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const [cartProducts, setCartProducts] = useState([]);
  
  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = () => {
    cartReducer.cart.map(item => {
      setCartProducts(oldArray => [
        ...oldArray,
        { 
          product_id: item._id,
          qty: item.amount,
          name: item.name
        }
      ])
    });
  }

  return (
    <div className="order-page">
      <div className="order-page-container">
        <div className="order-page-form">
          <h3>Order Form</h3>
          <form onSubmit={
            (e) => {
              addOrder(e, {name, email, phone, order_items: cartProducts});
              window.location = "/";
            }
          }>
            <div>
              <p>Enter Name</p>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
            </div>
            <div>
              <p>Choose your country</p>
              <select>
                <option value="ukrane">Ukraine</option>
                <option value="germany">Germany</option>
                <option value="spain">Spain</option>
              </select>
            </div>
            <div>
              <p>Enter your phone number</p>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
            </div>
            <div>
              <p>Enter your email adress</p>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <button type="submit">Confirm</button>
          </form>
        </div>
        <div className="order-products-cart">
          <h3>Your Order</h3>
          {
            cartReducer.cart.map(product => (
              <div className="order-products-cart__product-container">
                <div className="product-image">
                  <img src={`data:image/jpg;base64, ${imageReverse(product.image_upload)}`} />
                </div>
                <div className="product-info">
                  <p>{product.name}</p>
                  <div className="product-info__price">
                    <p>{product.amount}</p>
                    <p>{(product.price * product.amount).toFixed(2)}$</p>
                  </div>
                </div>
              </div>
            ))
          }
          <div className="order-products-cart__total-price">
            <p>Total: {total.toFixed(2)}$</p>
          </div>
        </div>  
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  cartReducer: state.cartReducer,
  total: state.cartReducer.cart
    .reduce((total, product) => total + product.price * product.amount, 0),
});

export default connect(mapStateToProps)(OrderPageContainer);