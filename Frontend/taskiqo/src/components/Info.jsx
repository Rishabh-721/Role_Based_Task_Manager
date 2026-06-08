import React from 'react'
import Illustration from "../assets/illustration.jpg"
import Auth from './Auth'

const Info = () => {
  return (
    <>
    <section className="hero">

  <div className="hero-content">
    <h2 className='heading'>
      Manage tasks <br /> with
      <span className='blue'> confidence.</span>
    </h2>
    
    <p>
      Streamline task assignment, submissions,  <br />approvals, and collaboration.
    </p>
  </div>
  <hr />
  <div className="hero-loginsingup">
    <Auth/>
  </div>
  
</section>
    </>
  )
}

export default Info
