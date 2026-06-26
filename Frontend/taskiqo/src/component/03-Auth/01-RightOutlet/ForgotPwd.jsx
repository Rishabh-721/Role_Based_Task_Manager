import React, {useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormInput from '../../05-Utils/FormInput';
import Btn from '../../05-Utils/Btn';
import API from '../../02-Api/API';

const ForgotPwd = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [apiError, setApiError] = useState("");
    const [apiSucess, setApiSucess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isVerified, setIsVerified] = useState(true);
    const [countdown, setCountdown] = useState(0);
    const [halfCountdown, setHalfCountdown] = useState(false);
    
    const handleChange = (e) => {
        setEmail(e.target.value);
        setError("");
        setApiError("");
        setApiSucess(false);
    }

        useEffect(() => {
        if (countdown <= 0) return;
       
        const timer = setTimeout(() => {
            if(countdown === 1){
                setIsVerified(prev => !prev);
                setCountdown(0);
                setApiError("");
                setApiSucess(false);
                setHalfCountdown(false);
            }else {
                
            if(countdown === 6){
                setHalfCountdown(true);
            }
                setCountdown(prev => prev - 1);
            }
        },1000);

        return () => clearTimeout(timer);
    }, [countdown])

    const handleSubmit = async(e) => {
        e.preventDefault();
        setApiError("");
        setApiSucess(false);
        if(!email){
            setError("Please Provide Email")
            return
        }

        try {
            setLoading(true);
            let response;
            if (isVerified){
             response =await API({method: "POST", endpoint: "auth/forgotpassword", data: {email}});
            }else {
             response = await API({method: "POST", endpoint :"auth/getverified", data: {email}});
             setCountdown(8);
            }
            setApiSucess(true);
            const message = response?.data?.message;
        } catch (error) {
            const message = error.response?.data?.message;
            setApiError(message);
            if(message?.includes("not verified")){
                setCountdown(8);
            }
        }finally{
            setLoading(false)
        }
    } 
  return (
    <>
        <h2>{isVerified ? "Forgot Password" : "Verify Email"}</h2>
        <p>Enter your email and we'll send a {isVerified ? "password reset" : "Email Verification"} link.</p>
        <form onSubmit={handleSubmit}>
        
            <FormInput type="email" info="Email" name="email" value={email} onChange={handleChange} />
            {error && <span className="error">{error}</span>}

            <Btn type="submit" text="Send" loadingText="Sending..." loading={loading} className={!isVerified ? "greenBtn" : "primary-btn"}/>
        </form>
        {apiError && (<span className="apiError">{apiError}</span>)}
        {apiSucess && (<span className="sucess">Sucess</span>)}

         <div className="auth-switch">
        {isVerified ? "Wanna Login ?" : "Go To Forgot Password"}
        <span className="btnToLink" onClick={() => navigate(isVerified ? "/": "/forgot-password") }>
           {isVerified ? "Login" : "ForgotPassword"}
        </span>
      </div>
      {halfCountdown && (
  <div className="countdown-overlay">
    <div className="countdown-box">
      {isVerified ? 
      <>
      <h3>Email Verification Mail has been sent</h3>
      <p>Switing to forgot password page in {countdown}</p>
      </>
       :
      <>
        <h3>Email not verified</h3>
        <p>Switching to verification in {countdown}...</p>
      </>}
    </div>
  </div>
)}
    </>
  )
}

export default ForgotPwd
