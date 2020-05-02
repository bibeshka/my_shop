import React, { useEffect } from 'react';
import './style.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProductsActions from '../../store/home/actions';

import Product from './Products';

const Home = ({ homeReducer, getProducts }) => {
  
  useEffect(() => {
    getProducts();
    console.log('123');
  }, []);

  // const arr = homeReducer.products.reverse();

  return (
    <div className="home">
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
    </div>
  )
}

const mapStateToProps = state => ({
  homeReducer: state.homeReducer
});

const mapDispatchToProps = dispatch => bindActionCreators(ProductsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
