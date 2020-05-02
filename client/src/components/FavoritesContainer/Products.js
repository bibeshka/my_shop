import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as CartActions from "../../store/shoppingCart/actions";
import * as FavoriteActions from '../../store/favorite/actions';
import { Link } from 'react-router-dom';
import { imageReverse } from '../../utils/imageReverse';

const Product = ({ name, image, price, id, product, image_upload }) => {
  
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(CartActions.addToCart(product));
  }

  const handleAddToFavorite = () => {
    dispatch(FavoriteActions.addToFavorite(product));
  }
  
  return (
    <div className="product-container">
      <div className="product-container__image">
        <img src={`data:image/jpg;base64, ${imageReverse(image_upload)}`} />
        <div className="product-container__image__price">{price} $</div>
        <div className="product-container__image__read-more">
          <Link to={`/${id}`}>Read more...</Link>
        </div>
        <div className="product-container__image__cart" onClick={() => handleAddToCart()}>
          <i className="fas fa-shopping-cart"></i>
        </div>
        <div className="product-container__image__favorite" onClick={() => handleAddToFavorite()}>
          <i className="fas fa-heart"></i>
        </div>
      </div>
      <h3 className="product-container__name">{name}</h3>
    </div>
  )
}

export default Product;