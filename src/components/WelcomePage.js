import React from 'react';
import '../styles/WelcomePage.css';
import { Link } from 'react-router-dom';
const WelcomePage = () => {
  return (
    <div className='Welcome_Page'>
      <header>
        <h1>Namaste!</h1>
        <h2>I am Abhigyan Chandra Rastogi</h2>
      </header>
      <main className='Welcome_Content'>
        <div className='Welcome__Used_Web_Tech'>
          <h3>Web technologies Ive used:</h3>
          <ul>
            <li>ReactJS</li>
            <li>MongoDB with Mongoose</li>
            <li>ExpressJS</li>
            <li>NodeJS</li>
          </ul>
        </div>
        <div className='Welcome__Know_Languages'>
          <h3>Languages i am familiar with:</h3>
          <ul>
            <li>Java</li>
            <li>Python</li>
            <li>C</li>
            <li>Javscript</li>
            <li>HTML</li>
            <li>CSS</li>
          </ul>
        </div>
        <div className='Welcome__Used_Sec_Tech'>
          <h3>Security Techniques used:</h3>
          <ul>
            <li>Authentication</li>
            <li>Authorization</li>
            <li>Web Appllication Firewall</li>
            <li>SSL</li>
          </ul>
        </div>
      </main>
      <footer>
        <p>Enter my website to see my projects :</p>
        <Link to='/login' className='link'>Enter</Link>
      </footer>
    </div>
  )
}

export default WelcomePage
