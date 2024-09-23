import React from 'react'

const DashHeader = ({ username, roles }) => {
  return (
    <header>
        <h1>Hello {username}!</h1>
        <h2>You are logged in as a {roles}</h2>
    </header>
  )
}

export default DashHeader
