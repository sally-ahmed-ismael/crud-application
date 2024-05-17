import { Link } from "react-router-dom";
import Logo from '../assets/94237208-online-store-logo-design.jpg'

export default function Navbar(){
    return(
         <>
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/"><img src={Logo} alt="Logo"/></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
     data-bs-target="#navbarSupportedContent" 
     aria-controls="navbarSupportedContent" 
     aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
      where</button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/categories">All Categories</Link> 
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/products">Control Products</Link> 
        </li>
                
      </ul>
    </div>
  </div>
</nav>
         </>

    );
}