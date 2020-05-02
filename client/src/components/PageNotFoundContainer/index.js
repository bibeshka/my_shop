import React from 'react';
import './style.scss';

const PageNotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-page-container">
        <h3>Page Not Found</h3>
        <img src={require('./image/404.gif')}/>
        <h1>404</h1>
      </div>
    </div>
  )
}

export default PageNotFound;
