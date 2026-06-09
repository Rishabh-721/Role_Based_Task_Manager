import React from 'react';
import Logo from "../Logo"
import "../../App.css"

const LeftSide = ({isLogin}) => {
  return (
    <div className="home-left">
    <Logo />
    <br /><br /><br />
    <p className='heading different'>{isLogin ? "Create New Account" : "Welcome Back"}</p>
    <p className='productInfo'>
        Manage tasks, teams and approvals
        from one collaborative workspace.
    </p>

    </div>
  )
}

export default LeftSide
