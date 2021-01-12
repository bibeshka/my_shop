import React from "react";
import { connect } from "react-redux";
// import { bindActionCreators } from 'redux';
import "./style.scss";

import Product from "./Products";

const FavoritesConteiner = ({ favoriteReducer }) => {
  return (
    <div className="favorites">
      {favoriteReducer.favorite.length === 0 && (
        <div className="fav-empty-text">You dont choose favorite products</div>
      )}
      <div className="favorites-container">
        {favoriteReducer.favorite &&
          favoriteReducer.favorite.map((product) => (
            <Product
              key={product._id}
              name={product.name}
              images={product.images}
              image_upload={product.image_upload}
              price={product.price}
              product={product}
              id={product._id}
            />
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  favoriteReducer: state.favoriteReducer,
});

export default connect(mapStateToProps)(FavoritesConteiner);
