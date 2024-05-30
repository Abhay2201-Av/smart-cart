import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { addToCart } from "../redux/CartSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from 'react-hot-toast';
import './styles/style.css';
import { FaGripLines } from "react-icons/fa";

function Test() {
  const [user, setUser] = useState([]);
 
  // redux usedispatch

  const dispatch = useDispatch();

  const url = "https://fakestoreapi.com/products?limit=15";
  useEffect(() => {
    axios.get((url))
    .then((res) => setUser(res.data))
    .then((err) => console.log(err))
  }, []);
  
  return (
    <div className="App"> 
    <div className="slider-img" >
       <div className="header-container" data-aos="flip-left" data-aos-duration={1500}>
       <div className="hot-trend" style={{color:"#415a77"}}><FaGripLines /><p>Hot Trend</p></div>
       <span>
       <h1 style={{fontWeight:"600"}}>  Exceptional Products </h1>
       <h1 style={{fontWeight:"400"}}>Exclusive Deals</h1>
       <div style={{display:"inline-flex", gap:"2px"}}><a href="#" className="discover" style={{fontSize:"20px",cursor:"pointer"}}>Discover More</a></div>
       </span>
       </div>
       </div>

    <div className="logo-span">
                <span>
                  <h1 style={{textAlign:"center",padding:"50px 0px 0px 0px"}}>Explore Our Products </h1>
                </span>
    </div>
      <div className="home-container" key={url} data-aos="zoom-in-down" data-aos-duration={500}>
        {user.map((product) => {
            return (
              <>
                <div style={{textOverflow:"ellipsis" }} className="shop-card-home" product={product} key={product.id}>
                  <img src={product.image} alt="" />
                  <h1 >{product.title}</h1>
                  <p>
                    Rating: <span>{product.rating.rate}</span>
                  </p>
                  <p>Price: $ {product.price}</p>
                  <button className="btn" onClick={() => {dispatch(addToCart(product)); toast.success(`${product.title.slice(0,36)} added to cart`)}}>
                  <FontAwesomeIcon icon={faCartPlus}  /> &nbsp;Add to Cart
                  </button>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
}

export default Test;
