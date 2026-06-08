import React, { useState } from 'react'
import axios from 'axios'
import Api from './Api';

const Auth = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(true); 

  const handleSignup = () => {
    setIsLoginVisible(!isLoginVisible);
  };

  const [form, setForm] = useState(
    {
      name: "",
      email: "",
      password: "",
    }
)
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  })


  const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = {};

  if (!isLoginVisible && !form.name.trim()) {
    newErrors.name = "Name is required";
  }

  if (!form.email.trim()) {
    newErrors.email = "Email is required";
  }

  if (!form.password.trim()) {
    newErrors.password = "Password is required";
  }

  if (form.password.length < 8) {
    newErrors.password = "Password must be at least 8 characters";
  }

  setErrors(newErrors);

  console.log(form);
  
}

  return (
    <> 
    <form className='login-Signup-form' onSubmit={handleSubmit}>
      {!isLoginVisible && 
      <div>
      <label htmlFor='userName'>Name</label>
        <br/>
      <input 
      type='text' 
      name='name' 
      id='userName' 
      placeholder='Your full Name' 
      value={form.name}
      onChange={handleChange}
      />
        <br/>
      {errors.name && <p className="error">{errors.name}</p>}
        <br/>
      </div>
      }
      <div>
      <label htmlFor="userMail">Email</label>
        <br/>
      <input 
      type="email" 
      name='email' 
      id='userMail' 
      placeholder='example@gmail.com' 
      value={form.email} 
      onChange={handleChange}/>
        <br/>
      {errors.email && <p className="error">{errors.email}</p>}
        <br/>
      </div>
      <div>
      <label htmlFor='userpwd'>Password</label>
        <br/>
      <input 
      type='password' 
      name='password' 
      id='userpwd' 
      placeholder='abc@1234' 
      value={form.password} 
      onChange={handleChange}/>
        <br/>
      {errors.password && <p className="error">{errors.password}</p>}
        <br/>
      </div>
      <button type="submit">Submit</button>
        <br /><br />
      <button onClick={handleSignup} type="button">{isLoginVisible ? "Create new user" : "Already a user"}</button>
    </form>
  </>  
  )
}

export default Auth
