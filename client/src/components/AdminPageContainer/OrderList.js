import React, { useEffect, useState } from "react";
import "./style.scss";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as OrdersActions from "../../store/orders/actions";

import AdminNavigation from "./AdminNavigation";

const OrderList = ({ orderReducer, getOrders, deleteOrder, userReducer }) => {
  const accessToken = userReducer.userInfo.token;

  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState("");

  const [searchOption, setSearchOption] = useState("name");

  useEffect(() => {
    getOrders(accessToken);
  }, [getOrders, accessToken]); //watch later

  return (
    <div className="admin-page">
      <AdminNavigation />
      <div className="admin-page-container">
        <div className="admin-order-list">
          <div className="admin-order-list-container">
            <h3>Orders</h3>
            <form className="search-order-form">
              <select onChange={(e) => setSearchOption(e.target.value)}>
                <option value="name">Search by Name</option>
                <option value="id">Search by Id</option>
              </select>
              <input
                type="text"
                onChange={
                  searchOption === "name"
                    ? (e) => setSearchName(e.target.value)
                    : (e) => setSearchId(e.target.value)
                }
                placeholder="Enter search"
              />
              <div
                onClick={() => getOrders(accessToken, searchName, searchId)}
                className="search-order-form__search-btn"
              >
                Search
              </div>
            </form>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Order</th>
                </tr>
              </thead>
              <tbody>
                {orderReducer.orders &&
                  orderReducer.orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order.name}</td>
                      <td>{order.email}</td>
                      <td>{order.phone}</td>
                      <td>
                        <div className="order-info">
                          {order.order_items.map((order_item) => (
                            <div key={order_item.product_id}>
                              <p>Name: {order_item.name}</p>
                              <p>Product ID: {order_item.product_id}</p>
                              <p>Quantity: {order_item.qty}</p>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td>
                        <div className="admin-products-buttons">
                          <button
                            className="admin-products-buttons__delete"
                            onClick={() => deleteOrder(order._id, accessToken)}
                          >
                            DELETE
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  orderReducer: state.orderReducer,
  userReducer: state.userReducer,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(OrdersActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
