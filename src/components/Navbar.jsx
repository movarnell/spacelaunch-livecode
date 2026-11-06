import { useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

function NavigationMenu() {
  const [expanded, setExpanded] = useState(false)
  const toggleRef = useRef(null)

  function handleKeyDown(event) {
    if (event.key === 'Escape' && expanded) {
      setExpanded(false)
      toggleRef.current?.focus()
    }
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" aria-label="Primary" onKeyDown={handleKeyDown}>
      <div className="container-fluid">
        <NavLink to="/" end className="navbar-brand">
          Rocket Addict
        </NavLink>
        <button
          ref={toggleRef}
          className="navbar-toggler"
          type="button"
          aria-label="Navigation menu"
          aria-controls="primary-navigation"
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
        >
          <span className="navbar-toggler-icon" aria-hidden="true" />
        </button>
        <div id="primary-navigation" className={`collapse navbar-collapse${expanded ? ' show' : ''}`}>
          <ul className="navbar-nav">
            {[
              ['/launches', 'Launches'],
              ['/wishlist', 'Wish List'],
              ['/about', 'About'],
            ].map(([path, label]) => (
              <li key={path} className="nav-item">
                <NavLink to={path} className="nav-link">
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default function Navbar() {
  const { pathname } = useLocation()
  return <NavigationMenu key={pathname} />
}
