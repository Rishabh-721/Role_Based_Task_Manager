import React, { useState } from 'react'

const RightSide = () => {
    const [isLogin, setIsLogin] = useState(true);
    const toggleSectioin = () => {
        setIsLogin(!isLogin);
    }
  return (
    <div classNameName='home-right'>
        <div className="home-card">

            <h2>{isLogin ? "Welcome Back" : "Join Us"}</h2>

            <p>{isLogin ? "Sign in to continue managing your tasks." : "Join Us and connect with us"}</p>

            <form>
                {!isLogin && <input type="text" placeholder='Your Full Name'/>}

                <input type="email" placeholder="Email Address"/>

                <input type="password" placeholder="Password"/>

                {!isLogin && <input type="password" placeholder='Confirm Password'/>}

                <button type="submit"> {isLogin ? "Login" : "Sign Up"} </button>
            </form>
            <div className="home-switch">
                {isLogin ? "Don't have an account ?" : "Have an account ?"}
                <span className='btnToLink' onClick={toggleSectioin}> {isLogin ? "Sign Up" : "Login"}</span>
            </div> 
        </div>
    </div>
  )
}

export default RightSide
