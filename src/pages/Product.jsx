/* eslint-disable react/prop-types */
// import React from 'react'


function Product({product}) {
  return (
    <div className="product-specs">
     <h6>{product.title}</h6>
          <img src={product.image} alt="..." 
          />
          <p>{product.description}</p>
          <p style={{color:"red" , fontWeight:"bold"}}>{product.price}$</p>
    </div>
)
}

export default Product