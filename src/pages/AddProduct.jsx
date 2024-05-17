import axios from 'axios';
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


function AddProduct() {
  const[image,setImage]=useState(0);
  const[title,setTitle]=useState('');
  const[description, setDescription]=useState('');
  const[category, setCategory]=useState('');
  const[price, setPrice]=useState(0);
  const[categories, setCategories]=useState([]);

  const navigate =useNavigate();
  const MySwal = withReactContent(Swal);

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
    console.log(`length = ${categories.length}`)
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
  
  useEffect(()=>{
    fetchCategories(); 
  },[])

  const formSubmit = (e)=>{
    e.preventDefault();
    // let checkCat= category;//*//

    if(category && title)
      {
        axios.post('http://localhost:9000/products',
          {
            image,title,description,category,price
          })

        !checkCategory(category)&& addCategory(category) ;//*//
        navigate('/products');

      }
      else{
        MySwal.fire({
          title: <p>{`You must set title and category!!`}</p>,
          showCancelButton:false
          })
      }

  }

  

  return (
    <>
    <h2>Add Product</h2>
    <form onSubmit={formSubmit} >
      <div className="input-group mb-3">
        <label className="input-group-text" htmlFor="inputGroupFile01">Image URL</label>
        <input type="url" className="form-control" id="inputGroupFile01" 
             onChange={onChangeImage}/> 
      </div>
        
        <div className="mb-3">
        <label htmlFor="Input2" className="form-label">Title</label>
        <input type="text" className="form-control" id="Input2" 
        onChange={onChangeTitle}/>
      
      </div>
      <div className="mb-3">
        <label htmlFor="Input3" className="form-label">Description</label>
        <input type="text" className="form-control" id="Input3" 
        onChange={onChangeDescription}/>
      </div>

      <div className="mb-3">
        <label htmlFor="Input4" className="form-label">Category</label>
        <input type="text" className="form-control" id="Input4" 
        onChange={onChangeCategory}/>
      </div>
      <div className="mb-3">
        <label htmlFor="Input5" className="form-label">Price</label>
        <input type="text" className="form-control" id="Input5" 
        onChange={onChangePrice}/>
      </div>
    
      <button type="submit" className="btn btn-primary mb-5 " >Submit</button>
    </form>
    </>
  )
}

export default AddProduct