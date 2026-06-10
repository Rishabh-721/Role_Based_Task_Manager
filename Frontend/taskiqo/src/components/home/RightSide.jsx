import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';

const RightSide = () => {
    
    
  return (
    <div className='home-right'>
        <div className="home-card">
              <Outlet />
        </div>
    </div>
  )
}

export default RightSide
