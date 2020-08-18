import React, { useEffect, useState } from 'react';
import './style.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProductsActions from '../../store/home/actions';

import Product from './Products';

const Home = ({ homeReducer, getProducts }) => {
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then(() => setLoading(false));
  }, []);

  // const arr = homeReducer.products.reverse();

  return (
    <div className="home">
      {
        loading ?
          <div className="home-loading">
            <img src='/image/loading-3.gif' alt="Loading..." />
          </div> :
          <div className="home-container">
            {
              // arr && arr.map(product) =>
              homeReducer.products && homeReducer.products.map(product => 
                (<Product 
                  key={product._id} 
                  name={product.name} 
                  image={product.image}
                  image_upload={product.image_upload} 
                  price={product.price}
                  product={product}
                  id={product._id} />))
            }
          </div>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  homeReducer: state.homeReducer
});

const mapDispatchToProps = dispatch => bindActionCreators(ProductsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
