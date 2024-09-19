import React from 'react'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const UserLoginForm = ({ setShowPage }) => {
    const [ showForm, setShowForm ] = React.useState('UserOptions');
    // UserOptions, LoginForm, RegisterForm
    return (
        <>
        {showForm === 'UserOptions' &&
        <>
            <button
                className='Login__form__loginButton'
                onClick={()=>setShowForm('LoginForm')}
            >Login</button>
            <button
                className='Login__form__registerButton'
                onClick={()=>setShowForm('RegisterForm')}
            >Register</button>
            <button 
            className='Login__Button --Back' 
            onClick={()=>setShowPage('LoginPage')}
            >Back</button>
        </>
        }
        {showForm === 'LoginForm' && <LoginForm setShowForm={setShowForm} />}
        {showForm === 'RegisterForm' && <RegisterForm setShowForm={setShowForm} />}
        </>
    )
}

export default UserLoginForm
