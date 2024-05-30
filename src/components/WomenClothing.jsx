import { useState,useEffect } from 'react';
import { addToCart } from "../redux/CartSlice";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import toast from 'react-hot-toast';
import './styles/style.css'

function WomenClothing() {
   
  const [user, setUser] = useState([]);
  const dispatch = useDispatch();
    // const [cart, setCart] = useState([]);
  
    // const handleClick = (product) => {
    //   setCart([...cart, product]);
    //   console.log(cart);
    // };
    useEffect(() => {
      fetch("https://fakestoreapi.com/products/category/women's%20clothing")
        .then((res) => res.json())
        .then((data) => setUser(data));
    }, []);


  return (
    
    <div className="App" >      
        <div className="clothcontainer" key={user} style={{marginTop:"7rem"}}>
          {user
            .map((product) => {
              return (
                <>
                  <div className="shop-card" product={product} key={product.id} id="shop-card" >
                    <img src={product.image} alt="" />
                    <h1>{product.title}</h1>
                    <p>
                      Rating: <span>{product.rating.rate}</span>
                    </p>
                    <p>Category: {product.category}</p>
                    <p>Price: $ {product.price}</p>
                    <span >
                    <button className="btn" onClick={() => {dispatch(addToCart(product)); toast.success(`${product.title.slice(0,36)} added to cart`)}}>
                  <FontAwesomeIcon icon={faCartPlus}  /> &nbsp;Add to Cart
                  </button>
                    </span>
                  </div>
                </>
              );
            })}
        </div>
      </div>
  )
}

export default WomenClothing;