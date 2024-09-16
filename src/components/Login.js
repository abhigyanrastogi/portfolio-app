import React from 'react'
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
                <div className='Login__details Login__item'>
                    <p className='Login__Guest-Or-User p'>Enter the website as :</p>
                    {showPage === 'LoginPage' && <>
                        <button 
                            className='Login__Guest-or-User Login__Guest-Button'
                            onClick={() => setShowPage('GuestLoginPage')}
                        >Guest</button>
                        <button 
                            className='Login__Guest-or-User Login__User-Button'
                            onClick={() => setShowPage('UserLoginPage')}
                        >User</button>
                        </>
                    }
                    { showPage === 'GuestLoginPage' && <GuestLoginForm back={setShowPage}/> }
                    { showPage === 'UserLoginPage' && <UserLoginForm back={setShowPage}/> }
                    { showPage !== 'LoginPage' && <button 
                            className='Login__Guest-or-User Login__Back-Button'
                            onClick={() => { setShowPage('LoginPage') }}
                        >Back</button>
                    }
                </div>
            </div>
        </div>
    );
}

export default Login
