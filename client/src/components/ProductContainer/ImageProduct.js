import React, { useState } from "react";

const ImageProduct = ({ images }) => {
  // const [backgroundZoom, setBackgroundZoom] = useState({
  //   backgroundImage: `url("data:image/jpg;base64,${imageThumb}")`,
  //   backgroundPosition: '0% 0%'
  // });
  const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    // setBackgroundZoom(...backgroundZoom, {backgroundPosition:`${x}% ${y}%`});
    setBackgroundPosition(`${x}% ${y}%`);
  };

  return (
    <div
      className="img_container"
      onMouseMove={handleMouseMove}
      style={{
        backgroundImage: `url("http://localhost:5000/api/v1/uploads/${images[0]}")`,
        backgroundPosition: backgroundPosition,
      }}
    >
      <img
        src={`http://localhost:5000/api/v1/uploads/${images[0]}`}
        alt="product"
      />
    </div>
  );
};

export default ImageProduct;
