import React from 'react'
import ProfileInfo from './ProfileInfo'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-5">
      <div className="container-fluid">
        <h2 className="navbar-brand text-dark py-2">ResumeHub</h2>
      </div>
      <ProfileInfo />
    </nav>

  )
}

export default Navbar