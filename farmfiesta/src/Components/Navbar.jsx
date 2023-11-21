import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
function Navbar() {
  const cartItems = useSelector(state => state.cart.cart)
  return (
    <div      
      style={{ background: "#39C758" }}
    >
      <div className="d-lg-flex justify-content-between text-white p-4" style={{margin:' 0 5%'}} >
        <h1 className="fw-bold">Farm Fresh Fiesta</h1>
        <ul
          className="d-lg-flex justify-content-between align-items-center fw-semibold"
          style={{ listStyle: "none" }}
        >
          <li className="mx-3"><Link to="/" style={{textDecoration:'none',color:'#fff'}}>Home</Link></li>
          <li className="mx-3"><Link to='/shop' style={{textDecoration:'none',color:'#fff'}}>Shop</Link></li>          
          <li className="mx-3"><Link to='/cart' style={{textDecoration:'none',color:'#fff'}}>Cart <small>{cartItems.length}</small></Link></li>
          <li className="mx-3"><Link to='/login' style={{textDecoration:'none',color:'#fff'}}>Login</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
