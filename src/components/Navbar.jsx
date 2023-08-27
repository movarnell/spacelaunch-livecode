import React from 'react'
import {Link} from 'react-router-dom'

export default function Navbar() {
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
   <Link to='/' className='navbar-brand'>
    Rocket Addict</Link>
   
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
      <li className="nav-item">
          <Link to="/launches" className='nav-link'>Launches</Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">About</a>
        </li>
      
      </ul>
    </div>
  </div>
</nav>
    
    </>
  )
}
