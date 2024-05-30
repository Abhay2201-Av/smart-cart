import React,{useState} from 'react'
import "./styles/regform.css"
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast';
import './styles/style.css'


function Registrastion() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validate fullname
    if (!formData.fullname.trim()) {
      newErrors.fullname = 'fullname is required';
      isValid = false;
    } else {
      newErrors.fullname = '';
    }

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
    } else if (formData.password.trim().length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      isValid = false;
    } else {
      newErrors.password = '';
    }

    // Validate confirm password
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm password';
      isValid = false;
    } else if (formData.confirmPassword.trim() !== formData.password.trim()) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    } else {
      newErrors.confirmPassword = '';
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(e)) {
        e.preventDefault();
      // Store user data in local storage
      localStorage.setItem('user', JSON.stringify(formData));
      axios.post("http://localhost:3000/users", formData)
      .then(()=> toast.success('Registration successful!'));
      navigate("/login")
     toast.success('Registration successfully') 
    }
  };

  return (
    <div >
    <div class="from-container">   
    <div class="row">
      <div class="col-md-6 offset-md-3">
        {/* <!-- Registration form --> */}
        <form class="Signup" onSubmit={handleSubmit}>
          <h3>Create Your Account</h3>
        
          <div class="form-group">
              <label for="name">Full Name</label><br />
              {errors.fullname && <div className="error">{errors.fullname}</div>}
            <input type="text" class="form-control" placeholder="Full Name" name="fullname"  
            value={formData.fullname} onChange={handleChange}/>
          </div>
          <div class="form-group">
              <label for="email">Email</label><br />
              {errors.email && <div className="error">{errors.email}</div>}
            <input type="text" class="form-control" placeholder="Enter Email" name="email" 
            value={formData.email} onChange={handleChange} />
          </div>      
          <div class="form-group">
              <label for="psw">Password</label><br />
              {errors.password && <div className="error">{errors.password}</div>}
            <input type="password" class="form-control" placeholder="Enter Password" name="password"  
            value={formData.password} onChange={handleChange} /> 
          </div>   
          <div class="form-group">
            <label for="psw-repeat">Confirm Password</label><br />
            {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
            <input type="password" class="form-control" placeholder="Confirm Password" name="confirmPassword"  
              value={formData.confirmPassword} onChange={handleChange}/>
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