
import './App.css'
import Categories from './pages/Categories'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import ProductList from './pages/ProductList'
import { Route, Routes } from 'react-router-dom'
import AddProduct from './pages/AddProduct'
import ProductDetails from './pages/ProductDetails'
import EditProduct from './pages/EditProduct'

function App() {
  
  return (
    <>
    <div className='App'>
         <Navbar />
         <div className='row'>
            <div className="col-10 mx-auto">
              <Routes>
              <Route path='/' element= {<Home />}></Route>
              <Route path='/products' element= {<ProductList />}></Route>
              <Route path='/products/addproduct' element= {<AddProduct />}></Route>
              <Route path='/products/edit/:passedProduct' element= {<EditProduct />}></Route>
              <Route path='/products/:productId' element= {<ProductDetails />}></Route>
              <Route path='/categories' element={<Categories />}> </Route>
              </Routes>
            </div>
         </div>
        
    </div>  
    </>
  )
}

export default App
