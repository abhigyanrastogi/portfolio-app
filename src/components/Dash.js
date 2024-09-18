import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Dash = () => {
  const location = useLocation();

  return (
    <div className='Dash'>
      <header>
        <h1 className=''>Hello {location.state.username}!</h1>
      </header>
      <footer>
        <Link to="/">Welcome page</Link>
        <Link to="/login">Log out</Link>
      </footer>
    </div>
  )
}

export default Dash
