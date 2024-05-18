import React,{ useState} from 'react'
import "./styles/regform.css"
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from './context/AuthContext';
import './styles/style.css'


function LogIn() {
  const [formData,setFormData] = useState({
    email:'',
    password:''
  })
  const [ errors, setErrors ] = useState({})
  const [ valid,setValid ] = useState(true)
  const { isLoggedIn,setIsLoggedIn} = useAuth();
  const navigate = useNavigate();

   const userName = JSON.parse(localStorage.getItem("user"))

  const handleSubmit = () =>{
    // console.log(formData);
    let isValid = true
    let validationErrors = {}
     JSON.parse(localStorage.getItem("user"));
    if( formData.email === "" || formData.email === null){
      isValid = false
      validationErrors.email = "Email is required"
    }

    if( formData.password === "" || formData.password === null){
    isValid = false
    validationErrors.password = "Password required"
    }else if(formData.password.length < 6){
     isValid = false;
     validationErrors.password = "Password length at least 6 char"
    }

    if(Object.keys(validationErrors).length === 0){
      // alert('Ragistration Successfully')
      axios.get("http://localhost:3000/users")
      .then((res) => {
        console.log("res",res);
        res.data.map(user => {
          if(user.email == formData.email && user.password == formData.password){
             toast.success('Login successfully')
             navigate("/")
             setIsLoggedIn(true) 
             localStorage.setItem("loggedin", true)
          }else{
            isValid = false;
            validationErrors.password = "Wrong Password"
          }
        })
        setErrors(validationErrors)
        setValid(isValid)
      })
      .catch(err => console.log(err,"err"))
   }
  }
  return (
    <div >
    <div class="from-container">   
    <div class="row">
      <div class="col-md-6 offset-md-3">
        {/* <!-- Login form --> */}
        <form class="Signup" onSubmit={(e)=>{ e.preventDefault(); handleSubmit()}}>
          <h3>Login</h3>
          <div class="form-group">
              <label for="email" style={{ padding:"20px"}}>Email</label>
              {valid ? <></> : <span className='text-denger'>{errors.email}</span>}
            <input type="text" class="form-control" placeholder="Enter Email" name="email"
            onChange={(e)=> setFormData({...formData, email: e.target.value})}   />
          </div>      
          <div class="form-group">
              <label for="psw" style={{ padding:"18px"}}>Password</label>
              {valid ? <></> : <span className='text-denger'>{errors.password}</span>}
            <input type="password" class="form-control" placeholder="Enter Password" name="psw" 
            onChange={(e)=> setFormData({...formData, password: e.target.value})} /> 
          </div>   
         <button type="submit" class="btn btn-success">Login</button>
          <hr style={{border: "1px solid #ddd"}} />
          <div class="form-group" style={{padding:'20px'}}>
            <p class="not-yet">If you have not account <Link to="/registration"><a> Register Now</a></Link></p>
          </div>
        </form>
      </div>
    </div>
  </div>
    </div>
  )
}

export default LogIn