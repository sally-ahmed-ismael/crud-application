// import React from 'react'

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Product from "./Product";
import axios from "axios";

function ProductDetails() {
  const {productId} =  useParams();
  const [details,setDetails]=useState([]);
  const fetchData= async ()=>{
    try{
    const res= await axios.get(`http://localhost:9000/products/${productId}`);
    console.log(`res is ${res}`)
    setDetails(res.data);
    }
    catch(e){
      console.log(e);
    }
  }
useEffect(()=>{
  fetchData();
  console.log(details);
},[])

  return (
    <>
        <div className="vh-50">
          <Product product={details}></Product>
        </div>

    </>

  )
}

export default ProductDetails