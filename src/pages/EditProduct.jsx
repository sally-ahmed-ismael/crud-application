import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditProduct() {
  const {passedProduct}=useParams();
  const product = JSON.parse(decodeURIComponent(passedProduct));
  console.log(`product is ${product}`)
  const navigate =useNavigate();
  const[image,setImage]=useState(product.image);
  const[title,setTitle]=useState(product.title);
  const[description, setDescription]=useState(product.description);
  const[category, setCategory]=useState(product.category);
  const[price, setPrice]=useState(product.price);
  const[categories, setCategories]=useState([]);

  const onChangeImage = (e)=>{
    setImage(e.target.value);
  } 
  const onChangeTitle = (e)=>{
    setTitle(e.target.value);
  }
  const onChangeDescription = (e)=>{
    setDescription(e.target.value);
  }
     const onChangeCategory = (e)=>{
      setCategory(e.target.value);
  }
  const onChangePrice = (e)=>{
    setPrice(e.target.value);
  }

  const fetchCategories=async()=>{
    try{
      const res= await axios.get(`http://localhost:9000/categories`);
      setCategories(res.data);
      }
      catch(e){
        console.log(e);
      }
  }  
   
  const checkCategory = (category)=>{
      for(let i=0; i<categories.length; i++){
        if (category === categories[i]["category"])
          return true;  
      }
      return false;
  } 
  
  const addCategory = async() =>{ 
      try{
       await axios.post('http://localhost:9000/categories', {category});
      }
      catch(e){
        console.log(e);
      }
  };

  const updateProduct = async ()=>{
      try {
        await axios.put(`http://localhost:9000/products/${product.id}`,
        {
          id:product.id,
          image,title,description,category,price
        })  
      }
      catch (error) {
        console.log(error)
      }   
   }
   
  
  useEffect(()=>{
    fetchCategories(); 
  },[])

  const formSubmit = (e)=>{
    e.preventDefault();
    let checkCat= category;
    updateProduct();
    
    !checkCategory(checkCat)&& addCategory(category) ;
    console.log(`check cat =${checkCategory(category)}`);

    navigate(`/products/${product.id}`);
  }

  return (
    <>
    <h2>Edit Product {product.title}</h2>
    <form onSubmit={formSubmit} >
      <div className="input-group mb-3">
        <label className="input-group-text" htmlFor="inputGroupFile01">Image URL</label>
        <input type="url" className="form-control" id="inputGroupFile01" 
              onChange={onChangeImage} value={image}/> 
      </div>
        
        <div className="mb-3">
        <label htmlFor="Input2" className="form-label">Title</label>
        <input type="text" className="form-control" id="Input2" 
        onChange={onChangeTitle} value={title}/>
      
      </div>
      <div className="mb-3">
        <label htmlFor="Input3" className="form-label">Description</label>
        <input type="text" className="form-control" id="Input3" 
        onChange={onChangeDescription} value={description}/>
      </div>

      <div className="mb-3">
        <label htmlFor="Input4" className="form-label">Category</label>
        <input type="text" className="form-control" id="Input4" 
        onChange={onChangeCategory} value={category}/>
      </div>
      <div className="mb-3">
        <label htmlFor="Input5" className="form-label">Price</label>
        <input type="text" className="form-control" id="Input5" 
        onChange={onChangePrice} value={price}/>
      </div>
    
      <button type="submit" className="btn btn-primary mb-5 " >Submit</button>
    </form>
    </>
  )
}
export default EditProduct