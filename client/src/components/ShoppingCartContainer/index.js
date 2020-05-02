import React from 'react';
import './style.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CartActions from "../../store/shoppingCart/actions";
import { Link } from 'react-router-dom';

import { imageReverse } from '../../utils/imageReverse';

const ShoppingCart = ({ cartReducer, updateAmount, removeFromCart, total }) => {

  const increment = (item) => {
    updateAmount(item._id, item.amount + 1);
  }

  const decrement = (item) => {
    updateAmount(item._id, item.amount - 1);
  }

  return (
    <div className="shopping-cart">
      <div className="shopping-cart-container">
        
        {cartReducer.length === 0 ? <div className="sc-empty-text">Shopping Cart Is Ampty</div> : null}
        
        <div className="shopping-cart-table"> 
          <table>
            <tbody>
              {cartReducer && cartReducer.map(product => (
                <tr className="product-info">
                  <td>
                    <div className="product-info__image">
                      <img src={`data:image/jpg;base64,${imageReverse(product.image_upload)}`} />
                    </div>
                  </td>
                  <td>
                    <div className="product-info__name">
                      <div>{product.name}</div>
                    </div>
                    <div className="product-info__price">
                      <div>$ {product.price}</div>
                    </div>
                  </td>
                  <td>
                    <div className="table-buttons">
                      <button onClick={() => decrement(product)}>-</button>
                      <input type="text" value={product.amount} readOnly />
                      <button onClick={() => increment(product)}>+</button>
                    </div>
                  </td>
                  <td>
                    <div className="product-info__subtotal">
                      $ {product.subtotal}
                    </div>
                  </td>
                  <td>
                    <div className="product-info__remove">
                      <button onClick={() => removeFromCart(product._id)}>
                        <i className="far fa-trash-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="shopping-cart-footer">
            <div 
              className="shopping-cart-footer__checkout" 
              style={cartReducer.length === 0 ? {display: "none"} : {display: "block"}}
            >
              <div>Total: <span>{total.toFixed(2)} $</span></div>
              <button><Link to="/order">Checkout</Link></button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  cartReducer: state.cartReducer.cart.map(product =>({
    ...product,
    subtotal: (product.price * product.amount).toFixed(2)
  })),
  total: state.cartReducer.cart
    .reduce((total, product) => total + product.price * product.amount, 0),
});

const mapDispatchToProps = dispatch => bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
