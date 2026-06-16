import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../Api';

const Login = () => {
    const navigate = useNavigate();
    const [apiError, setApiError] = useState("");
    const [form, setForm] = useState({email: "",password: "" });
    const [error, setError] = useState({email: "",password: ""});
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
      
      const newError = {email: "",password: ""}

      if(!form.email){
      newError.email = "Email is required";
      } 
      if(!form.password){
      newError.password = "Password is required"
      }else if(form.password.length < 8){
      newError.password = "Password must be at least 8 characters"
      }

      setError(newError);

      if(newError.password || newError.email){
        return;
      }

      try {
        setLoading(true)
        const response = await authApi("POST", "login", form)
        setApiSucess(true);
        
        console.log(response);
      } catch (err) {
        setApiError(err.response?.data?.message);
        
      }finally{
        setLoading(false)
      }
    }
  return (
    <>
      <h2>Welcome Back</h2>

      <p>Sign in to continue managing your tasks.</p>

      <form onSubmit={handleSubmit}>
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

        <div className="form-links">
          <span className="btnToLink" onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </span>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login" }
        </button>
      </form>

      {apiError && (<span className="apiError">{apiError}</span>)}
      {apiSucess && (<span className='sucess'>Sucess</span>)}

      <div className="home-switch">
        Don't have an account ?
        <span className="btnToLink" onClick={() => navigate("/signup")}>
           Sign Up
        </span>
      </div>
    </>
  )
}

export default Login
