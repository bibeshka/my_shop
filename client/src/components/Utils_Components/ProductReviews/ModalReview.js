import React, { useState, useRef } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ProductActions from "../../../store/home/actions";

import useOusideClick from "../../../hooks/useOusideClick";

const ModalReview = ({
  userReducer,
  productId,
  createReview,
  showModal,
  setShowModal,
}) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const data = {
    name: userReducer.userInfo,
    comment,
    rating: parseInt(rating),
  };

  //close modal by outside click
  const node = useRef();
  useOusideClick(node, () => {
    showModal && setShowModal(false);
  });

  return (
    <div className="modal-window-review">
      <div className="modal-window-review__form-container" ref={node}>
        <div className="modal-window-review__form-container__head">
          Write a review
          <div className="modal-close" onClick={() => setShowModal(false)}>
            <i className="far fa-times-circle"></i>
          </div>
        </div>
        <form
          onSubmit={() =>
            createReview(productId, data, userReducer.userInfo.token)
          }
        >
          <div className="modal-rating" id="modal-rating">
            <ul className="rate-area">
              <input
                type="radio"
                id="5-star"
                name="rating"
                value="5"
                onClick={(e) => setRating(e.target.value)}
              />
              <label htmlFor="5-star" title="Amazing">
                <i className="fas fa-star"></i>
              </label>
              <input
                type="radio"
                id="4-star"
                name="rating"
                value="4"
                onClick={(e) => setRating(e.target.value)}
              />
              <label htmlFor="4-star" title="Good">
                <i className="fas fa-star"></i>
              </label>
              <input
                type="radio"
                id="3-star"
                name="rating"
                value="3"
                onClick={(e) => setRating(e.target.value)}
              />
              <label htmlFor="3-star" title="Average">
                <i className="fas fa-star"></i>
              </label>
              <input
                type="radio"
                id="2-star"
                name="rating"
                value="2"
                onClick={(e) => setRating(e.target.value)}
              />
              <label htmlFor="2-star" title="Not Good">
                <i className="fas fa-star"></i>
              </label>
              <input
                type="radio"
                id="1-star"
                name="rating"
                value="1"
                onClick={(e) => setRating(e.target.value)}
              />
              <label htmlFor="1-star" title="Bad">
                <i className="fas fa-star"></i>
              </label>
            </ul>
          </div>
          <label htmlFor="modal-comment">Your comment:</label>
          <textarea
            id="modal-comment"
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="modal-buttons">
            <div className="modal_cancel" onClick={() => setShowModal(false)}>
              Cancel
            </div>
            <button type="submit">Send Review</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userReducer: state.userReducer,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(ProductActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModalReview);
