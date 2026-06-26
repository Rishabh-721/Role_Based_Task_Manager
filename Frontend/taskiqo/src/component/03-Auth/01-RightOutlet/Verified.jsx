import React,{useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../02-Api/API';

const Verified = () => {
    const navigate = useNavigate();
    const {token} = useParams();
    const [isVerified, setIsVerified] = useState(false);
    const [apiError, setApiError] = useState("");
    const [apiSucess, setApiSucess] = useState(false);

    const userVerify = async() => {
        try {
            const response = await API({method: "GET", endpoint: `auth/verify/${token}`});
            setApiSucess(true);
            setIsVerified(true);
        } catch (error) {
            const message = error.response?.data?.message;
            setApiError(message);
        }
    }

    useEffect(() => {
        userVerify();
    }, [])
    

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

      <span
        type="button"
        onClick={() => navigate("/")}
      >
        Back to Login
      </span>      
    </>
  )
}

export default Verified
