import React from 'react'
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate();
  return (
    <>
      <h2>Forgot Password</h2>

      <p>
        Enter your email and we'll send a password reset link.
      </p>

      <form>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
        />

        <button type="submit">
          Send Reset Link
        </button>
      </form>

      <div className="home-switch">
        Remember your password ?
        <span className="btnToLink" onClick={() => navigate("/")}>
          Back to Login
        </span>
      </div>
    </>
  );
};

export default ForgotPassword;

