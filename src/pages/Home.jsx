// import React from 'react'

import axios from "axios";
import { useEffect, useState } from "react"
import Product from "./Product";
import { Link } from "react-router-dom";
function Home() {
  const [products, setProducts]= useState([]);
  const fetchData = async()=>{
    try{
    const res = await axios.get('http://localhost:9000/products');
    setProducts(res.data);
    }
    catch(e){
    console.log(e)
    }
  }

  useEffect(()=> {fetchData()},[])
  
  return (
    <>
        <div className="product-container" >

            {products.map((product,index)=>{
              return(
                <Link to={`/products/${product.id}`} key={index} className="product">
                    <Product product={product}></Product>
                </Link>
              )
            })}
        </div>
        
    </>
  )
}

export default Home