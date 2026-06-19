import React from 'react'
import AuthPageLeft from './AuthPageLeft'
import AuthPageRight from './AuthPageRight'

const AuthPage = () => {
  return (
    <div className='auth'>
      <AuthPageLeft/>
      <AuthPageRight/>
    </div>
  )
}

export default AuthPage
