import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthPageRight = () => {
  return (
    <div className='auth-right'>
            <div className="auth-card">
                  <Outlet />
            </div>
        </div>
  )
}

export default AuthPageRight
