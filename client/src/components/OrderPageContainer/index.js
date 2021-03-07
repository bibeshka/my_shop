import React, { useState, useEffect } from "react";
import "./style.scss";
import urlBasic from "../../utils/UrlVar";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as OrdersActions from "../../store/orders/actions";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeForm from "./StripeForm";

const OrderPageContainer = ({ cartReducer, total, userReducer, addOrder }) => {
  const promise = loadStripe(`${process.env.REACT_APP_STRIPE_KEY_PUBLIC}`); //  stipe key

  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const getCartItems = () => {
      cartReducer.cart.map((item) => {
        setCartProducts((oldArray) => [
          ...oldArray,
          {
            product_id: item._id,
            qty: item.amount,
            name: item.name,
          },
        ]);

        return item;
      });
    };

    getCartItems();
  }, [cartReducer]);

  return (
    <div className="order-page">
      <div className="order-page-container">
        <div className="order-page-form">
          <h3>Order Form</h3>
          <Elements stripe={promise}>
            <StripeForm
              total={total}
              cartProducts={cartProducts}
              email_state={userReducer.userInfo && userReducer.userInfo.email}
              name_state={userReducer.userInfo && userReducer.userInfo.name}
              addOrder={addOrder}
            />
          </Elements>
        </div>
        <div className="order-products-cart">
          <h3>Your Order</h3>
          {cartReducer.cart.map((product) => (
            <div
              className="order-products-cart__product-container"
              key={product._id}
            >
              <div className="product-image">
                <img
                  src={`${urlBasic}/api/v1/uploads/${product.images[0]}`}
                  alt="product"
                />
              </div>
              <div className="product-info">
                <p>{product.name}</p>
                <div className="product-info__price">
                  <p>{product.amount}</p>
                  <p>{(product.price * product.amount).toFixed(2)}$</p>
                </div>
              </div>
            </div>
          ))}
          <div className="order-products-cart__total-price">
            <p>Total: {total.toFixed(2)}$</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
  cartReducer: state.cartReducer,
  total: state.cartReducer.cart.reduce(
    (total, product) => total + product.price * product.amount,
    0
  ),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(OrdersActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderPageContainer);
