import React, { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { authApi } from '../Api';

const Verified = () => {
  const {token} = useParams();
  const [isVerified, setIsVerified] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSucess, setApiSucess] = useState(false);

  const userVerify = async() => {
    try {
      const response = await authApi("GET", `verify/${token}`);
      setApiSucess(true);
      setIsVerified(true);
    } catch (err) {
      setApiError(err.response?.data?.message);
      setIsVerified(true);
    }
  }
  const navigate = useNavigate();

  userVerify();
  return (
    <>
      {!isVerified ? 
      <>
      <h2>Verifying Your Email</h2>
      
      <p> Please wait while we verify your email address.</p>
      </>
     :

      apiSucess ? <>
        <h2>Email Verified Successfully 🎉</h2>
        <span className='sucess'> 
        Your email has been verified successfully.
        <br />
        You can now access all Taskiqo features and login to your account.</span>
      </> : 
      <>
      <h2>Email Verification Failed</h2>
      <span className='apiError'>{apiError}</span>      
      </>}

      <button
        type="button"
        onClick={() => navigate("/")}
      >
        Back to Login
      </button>
    </>
  );
};

export default Verified;

