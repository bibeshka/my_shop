import React from "react";
import "./style.scss";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as CartActions from "../../store/shoppingCart/actions";
import { Link } from "react-router-dom";

const ShoppingCart = ({ cartReducer, updateAmount, removeFromCart, total }) => {
  const increment = (item) => {
    updateAmount(item._id, item.amount + 1);
  };

  const decrement = (item) => {
    updateAmount(item._id, item.amount - 1);
  };

  return (
    <div className="shopping-cart">
      <div className="shopping-cart-container">
        {cartReducer.length === 0 ? (
          <div className="sc-empty-text">Shopping Cart Is Ampty</div>
        ) : null}

        <div className="shopping-cart-table">
          <table>
            <tbody>
              {cartReducer &&
                cartReducer.map((product) => (
                  <tr className="product-info" key={product._id}>
                    <td>
                      <div className="product-info__image">
                        <img
                          src={`http://localhost:5000/api/v1/uploads/${product.images[0]}`}
                          alt="product"
                        />
                      </div>
                    </td>
                    <td>
                      <div className="product-info__name">
                        <div>{product.name}</div>
                      </div>
                      <div className="product-info__price">
                        <span>${product.price}</span>
                      </div>
                    </td>
                    <td>
                      <div className="table-buttons">
                        <button onClick={() => decrement(product)}>
                          <i className="fas fa-minus"></i>
                        </button>
                        <input type="text" value={product.amount} readOnly />
                        <button onClick={() => increment(product)}>
                          <i className="fas fa-plus"></i>
                        </button>
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
        </div>
        <div className="shopping-cart-footer">
          <div
            className="shopping-cart-footer__checkout"
            style={
              cartReducer.length === 0
                ? { display: "none" }
                : { display: "block" }
            }
          >
            <div>
              Total: <span>{total.toFixed(2)} $</span>
            </div>
            <Link to="/order">
              <button>Checkout</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cartReducer: state.cartReducer.cart.map((product) => ({
    ...product,
    subtotal: (product.price * product.amount).toFixed(2),
  })),
  total: state.cartReducer.cart.reduce(
    (total, product) => total + product.price * product.amount,
    0
  ),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
