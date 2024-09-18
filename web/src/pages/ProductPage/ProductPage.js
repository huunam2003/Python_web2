import React, { useState, useEffect } from 'react';

const ProductImage = ({ filename }) => {
  const [imageData, setImageData] = useState('');
  const [stateProduct, setStateProduct] = useState({
    name: "",
    price: "",
    description: "",
    type: "",
    countInStock: "",
    image: "",
  })
//  const response = await fetch(`http://localhost:5000/admin/${filename}`); // ${filename}

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`http://localhost:5000/filter`); // ${filename}
        const data = await response.json();
        console.log(data.map(data))
        //setImageData(data.image);  // Assuming data.image contains the base64 string
      } catch (error) {
        console.error('Error fetching the image:', error);
      }
    };

    fetchImage();
  }, [filename]);

  return (
    <div>
      {imageData ? (
        <img src={imageData} alt="Product" style={{ width: '300px', height: 'auto' }} />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};

export default ProductImage;
