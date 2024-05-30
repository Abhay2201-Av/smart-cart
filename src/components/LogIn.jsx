import React,{ useState} from 'react'
import "./styles/regform.css"
import { Link,useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { useAuth } from './context/AuthContext';
import './styles/style.css'


function LogIn() {
  const {isLoggedIn, setIsLoggedIn} = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    } else {
      newErrors.email = '';
    }

    // Validate password
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else {
      newErrors.password = '';
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.email === formData.email && user.password === formData.password) {
          setIsLoggedIn(true);
          toast.success('Login successful!');
          localStorage.setItem("isLoggedIn",true)          
          setTimeout(()=>{
            navigate("/")
          },1000)
        } else {
          toast('Invalid email or password',{icon: '⚠️'});
        }
      } else {
        toast('No user found',{icon: '⚠️'});
      }
    }};

  return (
    <div >
    <div class="from-container">   
    <div class="row">
      <div class="col-md-6 offset-md-3">
        {/* <!-- Login form --> */}
        <form class="Signup" onSubmit={handleSubmit}>
          <h3>Login</h3>
          <div class="form-group">
              <label for="email" style={{ padding:"20px"}}>Email</label>
              {errors.email && <div className="error">{errors.email}</div>}
            <input type="text" class="form-control" placeholder="Enter Email" name="email"
            value={formData.email} onChange={handleChange}   />
          </div>      
          <div class="form-group">
              <label for="psw" style={{ padding:"18px"}}>Password</label>
              {errors.password && <div className="error">{errors.password}</div>}
            <input type="password" class="form-control" placeholder="Enter Password" name="password" 
            value={formData.password} onChange={handleChange} /> 
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