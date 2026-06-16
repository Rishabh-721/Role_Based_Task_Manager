import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { authApi } from '../../Api';

const ChangePassword = () => {
    const {token} = useParams();
    const navigate = useNavigate();
    const [apiError, setApiError] = useState("");
    const [form, setForm] = useState({newPassword: "",confirmPassword: "" });
    const [error, setError] = useState({newPassword: "",confirmPassword: ""});
    const [apiSucess, setApiSucess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
      setForm({...form,[e.target.name]: e.target.value});
      setError({...error,[e.target.name]: ""});
      setApiError("");
      setApiSucess(false);
    }

    const handleSubmit = async(e) => {
      e.preventDefault();

      const newError = {newPassword: "",confirmPassword: ""}

      if(!form.newPassword){
        newError.newPassword = "newPassword is required"
      }else if(form.newPassword.length < 8){
        newError.newPassword = "newPassword must be at least 8 characters"
      }

      if(!form.confirmPassword){
        newError.confirmPassword = "Confirm newPassword is required"
      }

      setError(newError);

      if(newError.newPassword || newError.confirmPassword){
        return;
      }

      try {
        const response = await authApi("POST",`changepassword/${token}`,form);
        setLoading(true);
        setApiSucess(true)
      } catch (err) {
        setApiError(err.response?.data?.message);
      }finally{
        setLoading(false);
      }
    }
  return (
    <>
      <h2>Change Password</h2>

      <p>Create a new Password for your account.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
        />

        {error.newPassword && <span className='error'> {error.newPassword}  </span>}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm newPassword"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        {error.confirmPassword && <span className='error'>{error.confirmPassword}</span>}

        <button type="submit" disabled={loading}>
          {isLoading ? "Changing Password...":"Change Password"}
        </button>
      </form>

      {apiError && <p className="apiError">{apiError}</p>}
      {apiSucess && <p className='sucess'>Password Changed Sucessfully</p>}

      <div className="home-switch">
        Back to Login ?
        <span className="btnToLink" onClick={() => navigate("/")}>
          Login
        </span>
      </div>
    </>
  );
};

export default ChangePassword;
