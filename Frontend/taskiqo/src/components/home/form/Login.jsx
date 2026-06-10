import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
      email: "",
      password: "" 
    });
    
    const handleSubmit = () => {
      e.preventDefault();
      console.log(form);
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
          onChange={(e) => setForm({...form,email: e.target.value})}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({...form,password: e.target.value})}
        />

        <div className="form-links">
          <span className="btnToLink" onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </span>
        </div>

        <button type="submit">
          Login
        </button>
      </form>

      <div className="home-switch">
        Don't have an account ?
        <span className="btnToLink" onClick={() => navigate("/signup")}>
           Sign Up
        </span>
      </div>
    </>
  )
}

export default login
