import React from "react";

const ImagesListing = ({ images }) => {
  return (
    <div className="images-list-container">
      {images.map((image) => (
        <div className="images-list-container__single-image">
          <img
            src={`http://localhost:5000/api/v1/uploads/${image}`}
            alt="product"
          />
        </div>
      ))}
    </div>
  );
};

export default ImagesListing;
