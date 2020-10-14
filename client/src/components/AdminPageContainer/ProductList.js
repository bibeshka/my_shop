import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ProductsActions from "../../store/home/actions";
import "./style.scss";
import AdminNavigation from "./AdminNavigation";

const ProductList = ({ homeReducer, getProducts, deleteProduct }) => {
  useEffect(() => {
    getProducts();
  }, [getProducts]); //watch later

  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState("");

  const [searchOption, setSearchOption] = useState("name");

  const authTokenStatus = sessionStorage.getItem("jwt");

  return (
    <div className="admin-page">
      <AdminNavigation />
      <div className="admin-page-container">
        <div className="admin-product-list">
          <div className="admin-product-list-container">
            <h3>Products</h3>
            <form className="search-product-form">
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
                onClick={() => getProducts(searchName, searchId)}
                className="search-product-form__search-btn"
              >
                Search
              </div>
            </form>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {homeReducer.products &&
                  homeReducer.products.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>$ {product.price}</td>
                      <td>
                        <div className="admin-products-buttons">
                          <button className="admin-products-buttons__edit">
                            EDIT
                          </button>
                          <button
                            className="admin-products-buttons__delete"
                            onClick={() =>
                              deleteProduct(product._id, authTokenStatus)
                            }
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
  homeReducer: state.homeReducer,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(ProductsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
