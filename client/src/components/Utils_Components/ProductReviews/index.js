import React, { useEffect, useState } from "react";
import Review from "./Review";
import ModalReview from "./ModalReview";
import "./style.scss";

const ProductReviews = ({ reviews, productId }) => {
  const [showModal, setShowModal] = useState(false);
  const [reviewsDate, setReviewsDate] = useState(null);

  useEffect(() => {
    reviews.sort(sortFunction);
    setReviewsDate(reviews);
  }, []);

  function sortFunction(a, b) {
    let dateA = new Date(a.createAt).getTime();
    let dateB = new Date(b.createAt).getTime();
    return dateA > dateB ? 1 : -1;
  }

  return (
    <div className="reviews-container">
      <div className="reviews-container__header">
        <div className="reviews-container__header__amount">
          Customer Reviews <span>{reviews.length}</span>
        </div>
        <div className="reviews-container__header__write">
          <button onClick={() => setShowModal(true)}>Write review</button>
        </div>
      </div>
      {reviews.map((review) => (
        <Review key={review._id} review={review} />
      ))}
      {showModal ? (
        <ModalReview
          showModal={showModal}
          setShowModal={setShowModal}
          productId={productId}
        />
      ) : null}
    </div>
  );
};

export default ProductReviews;
