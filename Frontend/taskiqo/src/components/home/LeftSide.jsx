import React from 'react';
import Logo from "../Logo";

const LeftSide = ({isLogin}) => {
  return (
    <div className="home-left">
    <Logo />
    <p className='productInfo'>
        Manage tasks, teams and approvals
        from one collaborative workspace.
    </p>
    </div>
  )
}

export default LeftSide
