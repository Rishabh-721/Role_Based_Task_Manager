import React from 'react'
import logo from '../assets/logo.png';

const Home = () => {
  return (
    <>
      <div className='left-side'>
        <img src={logo} className="logo" alt="logo" width={"400px"}/>
        <h1 className='heading'>Taskiqo</h1>
      </div>
      <div className='right-side'></div>
    </>
  )
}

export default Home

