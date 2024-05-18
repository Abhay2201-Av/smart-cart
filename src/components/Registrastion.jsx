import React,{useState} from 'react'
import "./styles/regform.css"
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';
import './styles/style.css'

function Registrastion() {
  const [formData,setFormData] = useState({
    fullname:'',
    email:'',
    password:'',
    cpassword:''
  })
  const [ errors, setErrors ] = useState({})
  const [ valid,setValid ] = useState(true)
  const navigate = useNavigate();
  const handleSubmit = (e) =>{
    // console.log(formData);
    // e.preventDefault();
    localStorage.setItem("user", JSON.stringify(formData))
    let isValid = true
    let validationErrors = {}
    if( formData.fullname === "" || formData.fullname === null){
       isValid = false
       validationErrors.fullname = "Full name is required"
    }

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

    if( formData.cpassword !== formData.password){
    isValid = false
    validationErrors.cpassword = "c password not match"
    }
    setErrors(validationErrors)
    setValid(isValid)

    if(Object.keys(validationErrors).length === 0){
      // alert('Ragistration Successfully')
      axios.post("http://localhost:3000/users", formData)
      .then(() => {
        toast("Ragistration Successsfully",{icon:"ℹ"})
        navigate("/login")
      } )
      .catch(err => console.log(err))
   }
  }
  return (
    <div >
    <div class="from-container">   
    <div class="row">
      <div class="col-md-6 offset-md-3">
        {/* <!-- Registration form --> */}
        <form class="Signup" onSubmit={(e)=>{ e.preventDefault(); handleSubmit()}}>
          <h3>Create Your Account</h3>
          {/* {
            valid ? <></> : <span className='text-denger'>{errors.fullname}; {errors.email}; {errors.password}; {errors.cpassword} </span>
          } */}
          <div class="form-group">
              <label for="name">Full Name</label><br />
              {valid ? <></> : <span className='text-denger'>{errors.fullname}</span>}
            <input type="text" class="form-control" placeholder="Full Name" name="name"  
              onChange={(e)=> setFormData({...formData, fullname: e.target.value})}/>
          </div>
          <div class="form-group">
              <label for="email">Email</label><br />
              {valid ? <></> : <span className='text-denger'>{errors.email}</span>}
            <input type="text" class="form-control" placeholder="Enter Email" name="email" 
            onChange={(e)=> setFormData({...formData, email: e.target.value})} />
          </div>      
          <div class="form-group">
              <label for="psw">Password</label><br />
              {valid ? <></> : <span className='text-denger'>{errors.password}</span>}
            <input type="password" class="form-control" placeholder="Enter Password" name="psw"  
             onChange={(e)=> setFormData({...formData, password: e.target.value})} /> 
          </div>   
          <div class="form-group">
            <label for="psw-repeat">Confirm Password</label><br />
            {valid ? <></> : <span className='text-denger'>{errors.cpassword}</span>}
            <input type="password" class="form-control" placeholder="Confirm Password" name="psw-repeat"  
              onChange={(e)=> setFormData({...formData, cpassword: e.target.value})}/>
          </div>
          
          <button type="submit" class="btn btn-success">Signup</button>
          <hr style={{border: "1px solid #ddd"}} />
          <div class="form-group" style={{padding:'20px'}}>
            <p class="not-yet">Already have an account? <Link to="/login"> <a >Login</a> </Link></p>
          </div>
        </form>
      </div>
    </div>
  </div>
    </div>
  )
}

export default Registrastion