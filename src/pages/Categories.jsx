import axios from "axios";
import { useState, useEffect } from "react"
import Product from "./Product";

function Categories() {
  const [categories,setCategories]=useState([]);
  const [products, setProducts]=useState([]);
  const [catProducts, setCatProducts]=useState([]);

  const fetchCategories= async ()=>{
    try{
    const res= await axios.get(`http://localhost:9000/categories`);
    setCategories(res.data);
    }
    catch(e){
      console.log(e);
    }
  }
  //////////////
  const fetchProducts= async() => {
    try{
      const res= await axios.get('http://localhost:9000/products');
      setProducts(res.data);
      console.log(products)
    }
    catch(e){
      console.log(e);
    }
  }
  const filterCat = (products,cat)=>{
    let catPro = [];
    for (let i=0; i<products.length; i++){
      if(products[i]["category"] === cat)
        catPro.push(products[i]); 
    }
    return catPro;

  }

  //////////////
  useEffect(()=>{
    fetchCategories();
    fetchProducts();
  },[])
  //////////////
  const CatProducts=(cat)=> {
    setCatProducts(filterCat(products,cat));
  }
  


  return (
    <>
    {categories.map((cat,index)=>{
      return(
      <button key={index} className="btn btn-primary  m-2"
      onClick={()=>CatProducts(cat.category)}
      >{cat.category}</button> 
    )
    })}
    
    <div className="product-container"> 
        {catProducts.map((pro,index)=>{
        return(
        <div className="product" key={index}>
          <Product product={pro} />
        </div>)
      })}
    </div>
    </>
  )
}

export default Categories