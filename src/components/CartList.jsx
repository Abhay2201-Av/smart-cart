import {useState,useEffect} from 'react';
import './styles/cart.css'
import './styles/style.css'
import { useSelector,useDispatch } from 'react-redux'; 
import { removeFromCart } from '../redux/CartSlice';
import toast from 'react-hot-toast';
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";


   function CartList  ()  {
    const cartItem = useSelector(state => state.cart.cart)
    const dispatch = useDispatch()
    const [total, setTotal] = useState();
    const [text] = useTypewriter({
      words:['empty...'],
      loop:{}
    })    

  useEffect(() => {
    setTotal(cartItem.reduce((acc, curr) => acc + Number(curr.price.toFixed()), 0));
  }, [cartItem]);
  if (total <= 0) {
   return <div className='cart-empty' >
   <span>
     <h1>Cart is <span style={{fontWeight:"bold",color:"#ff523b"}}>{text}</span><span style={{color:"#ff523b"}}><Cursor cursorStyle="|"/></span></h1>
   </span>

    <div className='cartemptybtn'><Link to="/"><button> Back to shopping</button></Link></div>
   </div>
  }else{
    return(<div><div key={cartItem} className='cartlist'>
    <div className='Cart-Logo'><h1>Cart Items</h1></div>
    {
       cartItem.map(item => {
           return(<div>
               <div className="cart-container">
               <div className='cart-items' key={item.id}>
                  <span><img src={item.image} width={"60px"} alt="" /></span> 
                    <span style={{textOverflow:"ellipsis",overflow: "hidden",whiteSpace: "nowrap"}}>{item.title.slice(0,36)}</span>
                    <span><p>{item.price}</p></span>
                    
                    <div className="cart-btn"><span ><button onClick={() => {dispatch(removeFromCart(item.id)); toast(`${item.title.slice(0,36)}Item is removed from cart `,{icon:"ℹ",
                    })}}><MdDelete style={{fontSize:"18px"}} /></button></span></div>
               </div>
               </div>
               </div>
           )
       })
    }
    <div className="cart-footer"  >
    <div className="total-price"><div></div><h3>Total Price: $ {total}</h3></div>
    <div className='checkoutbtn'><Link to='/checkout'> <span > Proceed to Checkout</span> </Link> </div>
    </div>
    </div>
    
   </div>)
  }
    
    

  }
export default CartList;
