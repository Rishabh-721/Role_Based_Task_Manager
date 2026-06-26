import React, { useState } from 'react'
import API from '../../02-Api/API';
import { useNavigate } from 'react-router-dom';
import Btn from "../../05-Utils/Btn";
import FormInput from '../../05-Utils/FormInput';

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({email: "", password: ""});
  const [error, setError] = useState({email: "", password: ""});
  
  const [apiError, setApiError] = useState("");
  const [apiSucess, setApiSucess] = useState(false);

  const handleChange = (e) => {
    setForm({...form,[e.target.name]: e.target.value})
    setError({...error,[e.target.name]: ""});
    setApiSucess(false);
    setApiError("");
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    const newError = ({email: "", password: ""});
    if(!form.email){
      newError.email = "Email is required"
    }
    
    if(!form.password){
      newError.password = "Password is required"
    }
    setError(newError);

    if(newError.email || newError.password){
      return;
    }


    try {
      setLoading(true);
      const response = await API({method: "POST",endpoint: "auth/login",data: form});
      const message = response?.data?.message;
      setApiSucess(true);
      const token = response?.data?.token;
      localStorage.setItem("token", token);
      navigate("/main");
    } catch (error) {
      const message = error.response?.data?.message;
      setApiError(message);
    }finally{
      setLoading(false);
    }
  }
  
  return (
    <>
    <h2>Welcome Back</h2>
    <p>Sign in to continue managing your tasks.</p>
    <form onSubmit={handleSubmit}>

      <FormInput type="email" info="Email" name="email" value={form.value} onChange={handleChange} />
      {error.email && <span className="error">{error.email}</span>}

      <FormInput type="password" info="Password" name="password" value={form.value} onChange={handleChange} />
      {error.password && <span className="error">{error.password}</span>}

      <div className="form-links"><span className="btnToLink" onClick={() => navigate("/forgot-password")}>Forgot Password?</span></div>
    
      <Btn type="submit"  text="Login" loadingText="Logging In..." loading={loading} className="primary-btn"/>

    </form>

    {apiError && (<span className="apiError">{apiError}</span>)}
    {apiSucess && (<span className='sucess'>Sucess</span>)}

      <div className="auth-switch">
        Don't have an account ?
        <span className="btnToLink" onClick={() => navigate("/signup")}>
           Sign Up
        </span>
      </div>
      
    </>
  )
}

export default Login
