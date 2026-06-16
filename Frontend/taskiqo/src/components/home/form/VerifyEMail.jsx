import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../Api';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");
  const [apiSucess, setApiSucess] = useState("");
  const [countdown, setContdown] = useState(5);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(!apiSucess) return;
    if(countdown === 0){navigate("/forgot-password")}
    const timer = setTimeout(() => {
    setContdown(prev => prev - 1);}, 1000);
        return () => clearTimeout(timer);}, 
        [apiSucess, countdown, navigate]);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError("");
    setApiError("");
    setApiSucess(false);
    setContdown(5);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(!email){
      setError("Email is required");
      return;
    }

    try {
      setLoading(true);
      const response = await authApi("POST", "getverified", {email})
      setApiSucess(true);
      
    } catch (err) {
      setApiError(err.response?.data?.message);
    }finally{
      setLoading(false);
    }
  }
  return (
    <>
      <h2>Verify Your Email</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={handleChange}
        />
        {error && <span className='error'>{error}</span>}
        <button type="submit" disabled={loading}>
          {loading ? "Sending Verification Mail...":"Send Verification Mail"}
        </button>
      </form>
      {apiError && <span className='apiError'>{apiError}</span>}
      {apiSucess && <span className='sucess'>Verification Mail has been sent sucessfully. <br />
        Redirecting in {countdown} seconds...</span>}
      <div className="home-switch">
         Email Verified ?
        <span className="btnToLink" onClick={() => navigate("/forgot-password")}>
          Back
        </span>
      </div>
    </>
  );
};

export default VerifyEmail;
