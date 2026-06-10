import React from 'react'

import { useNavigate } from "react-router-dom";

const Verified = () => {
  const navigate = useNavigate();

  return (
    <>
      <h2>Email Verified</h2>

      <p>
        Your email has been successfully verified.
        You can now log in to your account.
      </p>

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

