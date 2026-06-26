import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FormInput from '../../05-Utils/FormInput';
import Btn from '../../05-Utils/Btn';
import API from '../../02-Api/API';


const ChangePwd = () => {
    const navigate = useNavigate();
    const {token} = useParams();
    const [form, setForm] = useState({newPassword : "", confirmPassword: ""});
    const [error, setError] = useState({newPassword: "", confirmPassword: ""});
    const [apiError, setApiError] = useState("");
    const [apiSucess, setApiSucess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({...form,[e.target.name]: e.target.value});
        setError({...error, [e.target.name]: ""});
        setApiError("");
        setApiSucess(false);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("Submit clicked");
        const newError = ({newPassword: "", confirmPassword: ""});
        if(form.newPassword.length < 8){
            newError.newPassword = "Password lenght must be atleast 8 latter"
        }

        if(!form.newPassword){
            newError.newPassword = "Password is required with new Error"
        }else if(!form.confirmPassword){
            newError.confirmPassword = "Password confirmation is required"
        }

        if(form.newPassword !== form.confirmPassword){
            newError.newPassword = "Password is not same in both field"
            newError.confirmPassword = "Password is not same in both field"
        }

        setError(newError);

        if(newError.newPassword || newError.confirmPassword){
            console.log("Validation failed");
            return;
        }

        try {
            setLoading(true);
            const response = await API({method: "POST", endpoint: `auth/changepassword/${token}`, data: form});
            setApiSucess(true);
        } catch (error) {
            const message = error.response?.data?.message;
            setApiError(message);
        }finally{
            setLoading(false);
        }
    }
  return (
    <>
      <h2>Change Password</h2>

      <p>Create a new Password for your account.</p>
      <form onSubmit={handleSubmit}>
        <FormInput type="password" name="newPassword" info="New Password" value={form.newPassword} onChange={handleChange}/>
        {error.newPassword && <span className="error">{error.newPassword}</span>}

        <FormInput type="text" name="confirmPassword" info="New Password" value={form.confirmPassword} onChange={handleChange}/>
        {error.confirmPassword && <span className="error">{error.confirmPassword}</span>}
        
        <Btn type="submit" text="Change Password" loadingText ="changing Password..." loading={loading} className="primary-btn" />
      </form>

      {apiError && (<span className="apiError">{apiError}</span>)}
      {apiSucess && (<span className="sucess">Sucess</span>)}

        <div className="auth-switch">
        Go Back to Login ?
        <span className="btnToLink" onClick={() => navigate("/")}>
           Login
        </span>
      </div>
    </>
  )
}

export default ChangePwd;
