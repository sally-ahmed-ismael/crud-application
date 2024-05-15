// import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


function ProductList() {
  const [products, setProducts]=useState([]);
  const MySwal = withReactContent(Swal);

  const getAllProducts = async ()=>{
    try {
      const res = await axios.get('http://localhost:9000/products');
      setProducts(res.data);
  
    } catch (error) {
      console.log(error)
    }
  }

  const deleteProduct = (product)=>{
    MySwal.fire({
      title: <p>{`You are going to delete ${product.title} !!`}</p>,
      showCancelButton:true
       }).then((data) => {
        if (data.isConfirmed){
         const res = axios.delete(`http://localhost:9000/products/${product.id}`);
         res.then(()=>getAllProducts());
        }
      })
  }

  useEffect(()=>{getAllProducts()}
        ,[]);

  return (
    <>
    <Link to="/products/addproduct" className="btn btn-success mt-5">Add a new product</Link>

    <table className="table table-striped table-hover mt-5 ">
    <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">Title</th>
        <th scope="col">Price</th>
        <th scope="col">Operation</th>

      </tr>
    </thead>
    <tbody>
      {products.map((product)=> {
        const passedProduct = encodeURIComponent(JSON.stringify(product));
      return(
      <tr key={product.id}>
        <td>{product.id}</td>
        <td>{product.title}</td>
        <td>{product.price}</td>
        <td style={{width:"200px"}}>
        <Link to={`/products/${product.id}`}
        className="btn btn-primary btn-sm m-1">View</Link>
        <Link to={`/products/edit/${passedProduct}`} 
        className="btn btn-info btn-sm m-1">Edit</Link>
        <button className="btn btn-danger btn-sm m-1" 
        onClick={()=>deleteProduct(product)}>Delete</button>

        </td>
      </tr>)}
    )}
    
  </tbody>
</table>

    </>
  )
}

export default ProductList