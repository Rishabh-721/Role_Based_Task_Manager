import React from 'react'
import logo from "../assets/logo.png"
import "./Styles/logo.css";
import "./Styles/App.css";

const Logo = () => {
  return (
    <div className='logo'>
      <img src={logo} alt="logo" className='logoimage'/>
      <div className='intro'>
        <p className='heading'>Taskiqo</p>
        <span className='caption'><span className='purple'>Assign.</span> <span className='amber'>Track.</span> Compleate.</span>
      </div>
    </div>
  )
}

export default Logo
