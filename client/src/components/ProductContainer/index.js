import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.scss';

import * as CartActions from "../../store/shoppingCart/actions";
import { useSelector, useDispatch } from 'react-redux';
import { imageReverse } from '../../utils/imageReverse';

const ProductPage = ({ match }) => {
  
  useEffect(() => {
    getProduct(match.params.id);
  }, []);

  const [product, setProduct] = useState([]);
  const [productAmount, setProductAmount] = useState(1);

  //Reverse image
  const [imageThumb, setImageThumb] = useState('');

  const getProduct = async (id) => {
    const result = await axios.get(`http://localhost:5000/api/v1/products/${id}`);
    setProduct(result.data);

    //set reverse image
    const thumb = new Buffer(result.data.image_upload.data).toString('base64');
    setImageThumb(thumb);
  }

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(CartActions.addToCart({ ...product, productAmount }));
  }

  const increment = (item) => {
    setProductAmount(productAmount + 1);
    // dispatch(CartActions.updateAmount(item._id, item.amount + 1));
  }

  const decrement = (item) => {
    if(productAmount > 1) {
      setProductAmount(productAmount - 1);
    }
    // dispatch(CartActions.updateAmount(item._id, item.amount - 1));
  }  
  
  return (
    <div className="single-product">
      <h3>{product.name}</h3>
      <div className="single-product-container">
        <div className="img-row">
          <div className="img_container">
            <img src={`data:image/jpg;base64,${ imageThumb && imageThumb }`} />
          </div>
        </div>
        <div className="info-row">
          <div className="info-row__price">
            $ {product.price}
          </div>
          <div className="info-row__description">
            {product.description}
          </div>
          <div className="info-row__age">
            Age: {product.age}
          </div>
          <div className="info-row__buttons">
            <div className="info-row__buttons__amount">
              <button className="decrement" onClick={() => decrement(product)}>-</button>
              <input value={productAmount} readOnly />
              <button className="increment" onClick={() => increment(product)}>+</button>
            </div>
            <button className="add-to-cart" onClick={() => handleAddToCart()}>
              Add In Shopping Cart
            </button>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default ProductPage;