import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'

const Sidebar = () => {
    const navigate = useNavigate();
  return (
  <aside className='sidebar'>
  <NavLink to="/main" end className={({ isActive }) => isActive ? "link active" : "link"}> Dashboard </NavLink>
  <NavLink to="/main/users" className={({ isActive }) => isActive ? "link active" : "link"}> Employee </NavLink>
  <NavLink to="/main/tasks" className={({ isActive }) => isActive ? "link active" : "link"}> Tasks </NavLink>
  </aside>
  )
}

export default Sidebar
