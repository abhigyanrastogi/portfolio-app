import React, { useEffect } from 'react'
import '../styles/Login.css'
import UserLoginForm from './UserLoginForm'
import GuestLoginForm from './GuestLoginForm';

const Login = () => {
    const [ showPage, setShowPage ] = React.useState('LoginPage');

    return (
        <div className='Login'>
        <div className='Login__container'>
        <div className='Login__welcome Login__item'>
            <h1>Welcome!</h1>
        </div>
        <div className={
                showPage === 'LoginPage' ? 'Login__details Login__item Login__details--Animate' :
                showPage === 'GuestLoginPage' ? 'Login__details Login__item GuestLoginPage--Animate' :
                showPage === 'UserLoginPage' ? 'Login__details Login__item UserLoginPage--Animate' : "Login__details Login__item"
            }>
        {/* <div className='Animate'> */}

            {showPage === 'LoginPage' && <div className='Login__Guest-Or-User'>
                <p>Enter the website as :</p>
                <button 
                    className='Login__Button --Guest'
                    onClick={() => setShowPage('GuestLoginPage')    }
                >Guest</button>
                <button 
                    className='Login__Button --User'
                    onClick={() => setShowPage('UserLoginPage')}
                >User</button>
                </div>
            }

            { showPage === 'GuestLoginPage' && <GuestLoginForm/> }

            { showPage === 'UserLoginPage' && <UserLoginForm/> }

            { showPage !== 'LoginPage' && <button 
                    className='Login__Button --Back'
                    onClick={() => { setShowPage('LoginPage') }}
                >Back</button>
            }
            
        {/* </div> */}
        </div>
        </div>
        </div>
    );
}

export default Login
