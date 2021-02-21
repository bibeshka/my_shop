import React from "react";
import urlBasic from "../../utils/UrlVar";

const ImagesListing = ({ images }) => {
  return (
    <div className="images-list-container">
      {images.map((image) => (
        <div key={image} className="images-list-container__single-image">
          <img src={`${urlBasic}/api/v1/uploads/${image}`} alt="product" />
        </div>
      ))}
    </div>
  );
};

export default ImagesListing;
