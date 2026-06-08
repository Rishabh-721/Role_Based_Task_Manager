import React from 'react'
import logo from "../assets/logo.png"

const Header = () => {
  return (
    <header>
        <img src={logo} alt="logo" className='logo'/>
        <div className='intro'>
            <p className='title heading'>Taskiqo</p>
            <p className='caption'><span className='blue'>Assign.</span> <span className='amber'>Track.</span> <span className='white'>Deliver.</span>
            </p>
        </div>
    </header>   
  )
}

export default Header
