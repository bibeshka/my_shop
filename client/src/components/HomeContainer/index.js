import React, { useEffect, useState } from "react";
import "./style.scss";

import Product from "./Products";
import Pagination from "../Utils_Components/Pagination";
import checkPaginationLength from "../../utils/paginationLength";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ProductsActions from "../../store/home/actions";

const Home = ({ homeReducer, getProducts, search }) => {
  const limit = 6;

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    getProducts(search, page, limit).then(() => setLoading(false));
    checkPaginationLength(limit, search).then((res) => setLastPage(res));
  }, [page, search, getProducts]); //check later getProducts

  return (
    <div className="home">
      {loading ? (
        <div className="home-loading">
          <img src="/image/loading-3.gif" alt="Loading..." />
        </div>
      ) : (
        <div className="home-container">
          {homeReducer.products &&
            homeReducer.products.map((product) => (
              <Product
                key={product._id}
                name={product.name}
                image={product.image}
                images={product.images}
                price={product.price}
                product={product}
                id={product._id}
              />
            ))}
        </div>
      )}
      {homeReducer.products.length === 0 && !loading && (
        <div className="error-container">Products not found</div>
      )}
      {homeReducer.products.length !== 0 && (
        <Pagination page={page} setPage={setPage} lastPage={lastPage} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  homeReducer: state.homeReducer,
  search: state.headerReducer.searchHeader,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(ProductsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
