import React, { useState } from 'react'
import logo from '../assets/logo.png';
import LeftSide from './home/LeftSide';
import RightSide from './home/RightSide';

const Home = () => {
  const [isLogin, setIsLogin] = useState(false); 
  return (
    <div className='home'>
      <LeftSide isLogin={isLogin}/>
      <RightSide />
    </div>
  )
}

export default Home

