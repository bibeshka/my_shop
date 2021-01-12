import React, { useState, useEffect } from "react";
import axios from "axios";
import urlBasic from "../../utils/UrlVar";
import "./style.scss";

import * as CartActions from "../../store/shoppingCart/actions";
import * as FavoriteActions from "../../store/favorite/actions";
import { useDispatch } from "react-redux";
// import { imageReverse } from '../../utils/imageReverse';
import ImageProduct from "./ImageProduct";

const ProductPage = ({ match }) => {
  useEffect(() => {
    //Get product by ID
    const getProduct = async (id) => {
      try {
        const result = await axios.get(`${urlBasic}/api/v1/products/${id}`);
        setProduct(result.data);

        //set reverse image
        // const thumb = new Buffer(result.data.images[0].buffer).toString(
        //   "base64"
        // );
        // setImageThumb(thumb);
      } catch {
        window.location = "/pagenotfound";
      }
    };

    getProduct(match.params.id).then(() => setLoading(false));
  }, [match.params.id]);

  const [product, setProduct] = useState([]);
  const [productAmount, setProductAmount] = useState(1);
  const [loading, setLoading] = useState(true);

  //Reverse image
  const [imageThumb, setImageThumb] = useState("");

  //adding redux functional
  const dispatch = useDispatch();

  //adding to shopping cart
  const handleAddToCart = () => {
    dispatch(CartActions.addToCart({ ...product, productAmount }));
  };

  const handleAddToFavorite = () => {
    dispatch(FavoriteActions.addToFavorite(product));
  };

  // const increment = (item) => {
  //   setProductAmount(productAmount + 1);
  //   // dispatch(CartActions.updateAmount(item._id, item.amount + 1));
  // };

  // const decrement = (item) => {
  //   if (productAmount > 1) {
  //     setProductAmount(productAmount - 1);
  //   }
  //   // dispatch(CartActions.updateAmount(item._id, item.amount - 1));
  // };

  return (
    <div className="single-product">
      {loading ? (
        <div className="single-product-loading">
          <img src="/image/loading-3.gif" alt="Loading..." />
        </div>
      ) : (
        <>
          <h3>{product.name}</h3>
          <div className="single-product-container">
            <div className="img-row">
              {/* <img src={`data:image/jpg;base64,${ imageThumb && imageThumb }`} /> */}
              {imageThumb && (
                <ImageProduct imageThumb={product.images[0].buffer} />
              )}
              {/* <img
                src={`data:image/jpg;base64, ${imageReverse(
                  product.images[0].buffer
                )}`} /> */}
            </div>
            <div className="info-row">
              <div className="info-row__func">
                <div className="info-row__func__price">
                  <span>$ {product.price}</span>
                </div>
                <div className="info-row__func__buttons">
                  <button
                    className="add-to-cart"
                    onClick={() => handleAddToCart()}
                  >
                    <i className="fas fa-shopping-cart"></i>
                    <span>Add to Cart</span>
                  </button>
                  <button
                    className="add-to-favorite"
                    onClick={() => handleAddToFavorite()}
                  >
                    <i className="fas fa-heart"></i>
                  </button>
                </div>
              </div>
              {/* <div className="info-row__price">$ {product.price}</div>
              <div className="info-row__buttons">
                <div className="info-row__buttons__amount">
                  <button
                    className="decrement"
                    onClick={() => decrement(product)}
                  >
                    -
                  </button>
                  <input value={productAmount} readOnly />
                  <button
                    className="increment"
                    onClick={() => increment(product)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="add-to-cart"
                  onClick={() => handleAddToCart()}
                >
                  Add In Shopping Cart
                </button>
              </div> */}
              <div className="info-row__description">{product.description}</div>
              <div className="info-row__age">Age: {product.age}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPage;
