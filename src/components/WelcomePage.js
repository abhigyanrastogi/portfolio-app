import React from 'react';
import { Link } from 'react-router-dom';
const WelcomePage = () => {
  return (
    <div className='Welcome_Page'>
      <header>
        <h1>Namaste!</h1>
        <h2>I am Abhigyan Chandra Rastogi</h2>
      </header>
      <main>
        <div>
          <p>Enter my website</p>
          <Link to='/login'>Click here</Link>
        </div>
      </main>
      <div></div>
    </div>
  )
}

export default WelcomePage
