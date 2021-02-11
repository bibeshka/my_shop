import React, { useState, useEffect } from "react";
import axios from "axios";
import urlBasic from "../../utils/UrlVar";
import "./style.scss";

import * as CartActions from "../../store/shoppingCart/actions";
import * as FavoriteActions from "../../store/favorite/actions";
import { useDispatch } from "react-redux";

import ImageProduct from "./ImageProduct";
import ImagesListing from "./ImagesListing";
import ProductReviews from "../Utils_Components/ProductReviews";
import RatingProduct from "./RatingProduct";

const ProductPage = ({ match }) => {
  useEffect(() => {
    const getProduct = async (id) => {
      try {
        const result = await axios.get(`${urlBasic}/api/v1/products/${id}`);
        setProduct(result.data);
      } catch {
        window.location = "/pagenotfound";
      }
    };

    getProduct(match.params.id).then(() => setLoading(false));
  }, [match.params.id]);

  const [product, setProduct] = useState([]);
  // const [productAmount, setProductAmount] = useState(1);
  const productAmount = 1;

  const [loading, setLoading] = useState(true);

  const [imageCounter, setImageCounter] = useState(0);

  //adding redux functional
  const dispatch = useDispatch();

  //adding to shopping cart
  const handleAddToCart = () => {
    dispatch(CartActions.addToCart({ ...product, productAmount }));
  };

  const handleAddToFavorite = () => {
    dispatch(FavoriteActions.addToFavorite(product));
  };

  const slideNextImage = () => {
    if (imageCounter === product.images.length - 1) {
      setImageCounter(0);
    } else {
      setImageCounter(imageCounter + 1);
    }
  };

  const slidePrevImage = () => {
    if (imageCounter === 0) {
      setImageCounter(product.images.length - 1);
    } else {
      setImageCounter(imageCounter - 1);
    }
  };

  return (
    <div className="single-product">
      {loading ? (
        <div className="single-product-loading">
          <img src="/image/loading-3.gif" alt="Loading..." />
        </div>
      ) : (
        <>
          <div className="single-product-header">
            <h3>{product.name}</h3>
            <div className="single-product-header__info">
              <div className="single-product-header__info__rating">
                <RatingProduct product={product} />
              </div>
              <div className="single-product-header__info__code">
                <span>Code</span>: {match.params.id}
              </div>
            </div>
          </div>
          <div className="single-product-container">
            <div className="img-row">
              <div className="image-slider">
                <button
                  className="image-side-prev"
                  onClick={() => slidePrevImage()}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <ImageProduct image={product.images[imageCounter]} />
                <button
                  className="image-side-next"
                  onClick={() => slideNextImage()}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
              <div className="images-listing">
                <ImagesListing images={product.images} />
              </div>
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
              <div className="info-row__description">{product.description}</div>
              <div className="info-row__age">Age: {product.age}</div>
            </div>

            <ProductReviews
              productId={match.params.id}
              reviews={product.reviews}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPage;
