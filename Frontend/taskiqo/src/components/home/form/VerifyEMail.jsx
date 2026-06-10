import React from 'react'
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const navigate = useNavigate();
  return (
    <>
      <h2>Verify Your Email</h2>

      <form>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
        />

        <button type="submit">
          Send Verification Link
        </button>
      </form>
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
