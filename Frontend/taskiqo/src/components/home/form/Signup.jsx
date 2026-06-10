import React from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
  return (
    <>
      <h2>Join Us</h2>

      <p>Create an account and start managing tasks.</p>

      <form>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
        />

        <button type="submit">
          Sign Up
        </button>
      </form>

      <div className="home-switch">
        Already have an account ?
        <span className="btnToLink" onClick={() => navigate("/")}>
          Login
        </span>
      </div>
    </>
  );
};


export default Signup
