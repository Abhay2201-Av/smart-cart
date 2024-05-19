import { useEffect } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux'; 
import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Logo from "../utilitis/Logo.png"
import { useAuth } from './context/AuthContext'
import toast from 'react-hot-toast';
import { CgMenu } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiShoppingCart } from "react-icons/fi";
import MenuIcon from '@mui/icons-material/Menu';

import './styles/style.css'

function NavBar() {

  const [ show,setShow ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ sticky, setSticky ] = useState(false);

   const cartItem = useSelector(state => state.cart.cart)
 
    const {isLoggedIn,setIsLoggedIn} = useAuth()

      console.log(isLoggedIn,"show err");

      useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLoggedIn');
        setIsLoggedIn(loggedInStatus === 'true');
      }, []);

      const LogIn = () => {
        setIsLoading(true);
        setTimeout(() =>{
          localStorage.setItem('isLoggedIn', true);
          setIsLoggedIn(true);
          setIsLoading(false);
        },165000)
      }

      const LogOut = () => {
        setIsLoading(false)
        setTimeout(()=>{
          localStorage.setItem('isLoggedIn', false);
          setIsLoggedIn(false)
          // setAuthuser(null)
          toast.success('Logout Successfully')
        },1000)
      }
    
      useEffect(()=>{
        window.addEventListener('scroll',()=>{
          window.scrollY > 50 ? setSticky(true) : setSticky(false)
        })
      },[])
      

  return ( 
      
    <Navbar  className={`navbar ${sticky? 'dark-nav': ''}`}>
      <div className="navdiv" data-aos="fade-down" data-aos-duration={2000} >
        <div className="logo">
          <span>
            <Link to="/" className="logotext" ><img src={Logo} alt="" width={"100px"}/></Link>
          </span>
        </div>
        <div className={show ? "menubar" : "menu" }>
          <ul>
            <li>
              <NavLink to="/MenClothing" className="about" onClick={()=> setShow(false)}>
                Men's wear
              </NavLink>
            </li>
            <li>
              <NavLink to="/WomenClothing" className="contact" onClick={()=> setShow(false)}>
              Women's wear
              </NavLink>
            </li>
            <li>
              <NavLink to="/Jewellery" className="contact" onClick={()=> setShow(false)}>
              Jewellery
              </NavLink>
            </li>
            <li>
              <NavLink to="/Electronics" className="contact" onClick={()=> setShow(false)}>
              Electronics
              </NavLink>
            </li>
            <li>
            {
              isLoading ? <></>:
            isLoggedIn ? <div className="log-in" onClick={()=> setShow(false)}><NavLink onClick={(e)=> {LogOut(e)}} style={{color:"#333"}}>Logout </NavLink> </div> :
            <div id='login' className="log-in"  onClick={()=> setShow(false)}><NavLink onClick={(e)=> {LogIn(e)}  } to="/login" style={{color:"#333"}}>Login</NavLink></div>
          }
            </li>
          </ul>
        </div>
        
        <div className="side-btn">
        <div className="cart">
        <Link to="/CartList" style={{color:"#252422"}} ><sup style={{color:"#fff"}}>{cartItem.length}</sup> <FiShoppingCart className="cartpng" style={{fontSize: "30px"}}></FiShoppingCart>
        </Link>
        </div>

          {
            isLoggedIn ? <div className="login" style={{marginTop:"10px"}} ><button className='Log-In' onClick={(e)=> {LogOut(e)}} >  Logout </button> </div> :
            <div id='login' className="login" style={{marginTop:"10px"}} ><Link to="/login"><button className='Log-In' onClick={(e)=> {LogIn(e)}}> Log In</button></Link></div>
          } 

          <a className='nav-toggle' ><MenuIcon onClick={()=> setShow(!show)} /> </a>
          </div>
      </div>
    </Navbar>
    
  );
}

export default NavBar;
