import React from "react";
import moment from "moment";

const Review = ({ review }) => {
  function getRating(rating) {
    const starsTotal = 5;
    const starPercentage = (rating / starsTotal) * 100;
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

    return starPercentageRounded;
  }

  return (
    <div className="review-container">
      <div className="review-container__header">
        <div className="review-container__header__name">{review.name}</div>
        <div className="review-container__header__date">
          {moment(review.createdAt).fromNow()}
        </div>
      </div>
      <div className="review-container__main">
        <div className="review-container__main__rating">
          <div className="stars-outer">
            <div
              className="stars-inner"
              style={{ width: `${getRating(review.rating)}` }}
            ></div>
          </div>
        </div>
        <div className="review-container__main__comment">{review.comment}</div>
      </div>
    </div>
  );
};

export default Review;
