import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { authApi } from '../Api';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [apiError, setApiError] = useState("");
    const [apiSucess, setApiSucess] = useState(false);

    const handleChange = (e) => {
      setEmail(e.target.value)
      setError("");
      setApiError("");
      setApiSucess(false);
    }

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!email) {
        setError("Email is required");
        return;
      }

      try {
        const response = await authApi("POST", "forgotpassword", {email})
        setApiSucess(true);
        console.log(response);
      } catch (err) {
        setApiError(err.response?.data?.message);
      }
    
      console.log(email);
    };

  return (
    <>
      <h2>Forgot Password</h2>

      <p>
        Enter your email and we'll send a password reset link.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={handleChange}
        />
        {error && <span className='error'>{error}</span>}
        <button type="submit">
          Send Reset Link
        </button>
      </form>
      {apiError && <p className='apiError'>{apiError}</p>}
      {apiSucess && <p className='sucess'>Mail has been sent to your Email</p>}
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

