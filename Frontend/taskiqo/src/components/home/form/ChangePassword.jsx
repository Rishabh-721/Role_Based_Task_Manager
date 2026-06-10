import React from 'react'
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const navigate = useNavigate();
  return (
    <>
      <h2>Change Password</h2>

      <p>Create a new password for your account.</p>

      <form>
        <input
          type="password"
          name="password"
          placeholder="New Password"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
        />

        <button type="submit">
          Change Password
        </button>
      </form>

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
