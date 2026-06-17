import React, { useEffect, useState } from 'react'
import Logo from '../Logo'
import { authApi } from '../Api'

const Header = () => {
  const [user, setUser] = useState(null);
  const [apiError, setApiError] = useState("");

  const profile = async() => {
    try {
      const response = await authApi("GET", "profile");
      setUser(response.data.user);
      setApiError("")
      console.log(response);
    } catch (err) {
      const message = err.response?.data?.message;
      setApiError(message);
    }
  }

  

  const capitalize = (str) => {
    if(!str) return "";

    return str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
  };

  sessionStorage.setItem("User Name", capitalize(user?.name));
  sessionStorage.setItem("User Role", capitalize(user?.role));
  
  const getInitials = (str) => {
    if (!str) return "";

  return str.split(" ").map(word => word[0]).join("").toUpperCase();

  }

  useEffect(() => {
    profile();
    const interval = setInterval(profile, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [])

  const avatarClass = user?.role === "admin"
  ? "avatar admin"
  : user?.role === "super admin"
  ? "avatar super-admin"
  : "avatar emp";


  return (
    <header className='header'>
      <Logo />
      
      <div className='profile'>
        {user && 
        <>
        <div className={avatarClass}>
          {getInitials(user.name)}
        </div>
        <div className="profile-info">
        <h4>{capitalize(user?.name)}</h4>
        <p>{capitalize(user?.role)}</p>
        </div>
        </>}
        
      {apiError && <span>{apiError}</span>}
      </div>
    </header>
  )
}

export default Header
