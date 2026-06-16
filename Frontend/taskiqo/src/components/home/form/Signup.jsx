import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../Api';

const Signup = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({name: "",email: "",password: "", confirmPassword: ""});
    const [error, setError] = useState({name: "",email: "",password: "", confirmPassword: ""});
    const [apiError, setApiError] = useState("");
    const [apiSucess, setApiSucess] = useState(false);
    const [loading, setLoading] = useState(false);
    

    const handleChange = (e) => {
      setForm({...form,[e.target.name]: e.target.value});
      setError({...error,[e.target.name]: ""});
      setApiError("");
      setApiSucess(false);
    }

    const handleSubmit = async(e) => {
      e.preventDefault();
      const newError = {name: "", email: "", password: "", confirmPassword: ""};

      if(!form.name){
        newError.name = "Full Name is Required"
      }else if(form.name < 4){
        newError.name = "Full Name can't be less then 4 words"
      }
      
      if(!form.email){
        newError.email = "Email is required"
      }

      if(!form.password){
        newError.password = "Password is required"
      }else if(form.password < 8){
        newError.password =  "Password must be at least 8 characters"
      }

      if(!form.confirmPassword){
        newError.confirmPassword = "confirm Password is required"
      }else if(form.password !== form.confirmPassword){
        newError.confirmPassword = "password do not match"
        newError.password = "password do not match"
      }

      setError(newError);

      if(newError.name || newError.email || newError.confirmPassword){
        return;
      }

      try {
        const response = await authApi("POST", "signup", form)
        setLoading(true);
        setApiSucess(true);
      } catch (err) {
        setApiSucess(false);
        const message = err.response?.data?.message;
        setApiError(message)
      }finally{
        setLoading(false);
      }
    };
  return (
    <>
      <h2>Join Us</h2>

      <p>Create an account and start managing tasks.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />
        {error.name && <span className='error'>{error.name}</span>}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
        />
        {error.email && <span className='error'>{error.email}</span>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        {error.password && <span className='error'>{error.password}</span>}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {error.confirmPassword && <span className='error'>{error.confirmPassword}</span>}

        <button type="submit" disabled={loading}>
        {loading ? "Singing Up ..." : "Sign Up"}
        </button>
        {apiError && <span className='apiError'>{apiError}</span>}
        {apiSucess && <span className='sucess'>User Signup Sucessfully.</span>}
      </form>

      <div className="home-switch" >
        Already have an account ?
        <span className="btnToLink" onClick={() => navigate("/")}>
          Login
        </span>
      </div>
    </>
  );
};


export default Signup
