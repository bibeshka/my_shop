import React from "react";

const RatingProduct = ({ product }) => {
  function getRating(rating) {
    const starsTotal = 5;
    const starPercentage = (rating / starsTotal) * 100;
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

    return starPercentageRounded;
  }

  return (
    <div className="product-rating-container">
      <div className="stars-outer">
        <div
          className="stars-inner"
          style={{ width: `${getRating(product.rating)}` }}
        ></div>
      </div>
      <div className="stars-number">{product.numReviews} reviews</div>
    </div>
  );
};

export default RatingProduct;
