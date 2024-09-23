import React from 'react'
import { Link } from 'react-router-dom'

const DashFooter = () => {
  return (
    <footer>
        <Link to="/">Welcome page</Link>
        <Link to="/login">Log out</Link>
    </footer>
  )
}

export default DashFooter
