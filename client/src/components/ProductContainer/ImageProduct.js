import React, { useState } from 'react';

const ImageProduct = ({ imageThumb }) => {

  // const [backgroundZoom, setBackgroundZoom] = useState({
  //   backgroundImage: `url("data:image/jpg;base64,${imageThumb}")`,
  //   backgroundPosition: '0% 0%'
  // });
  const [backgroundPosition, setBackgroundPosition] = useState('0% 0%');
 
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.pageX - left) / width * 100;
    const y = (e.pageY - top) / height * 100;
    // setBackgroundZoom(...backgroundZoom, {backgroundPosition:`${x}% ${y}%`});
    setBackgroundPosition(`${x}% ${y}%`);
  }

  return (
    <div 
      className="img_container" 
      onMouseMove={handleMouseMove} 
      style={{
        backgroundImage: `url("data:image/jpg;base64,${imageThumb}")`,
        backgroundPosition: backgroundPosition
    }}>
      <img src={`data:image/jpg;base64,${ imageThumb && imageThumb }`} alt="product" />
    </div>
  )
}

export default ImageProduct;
