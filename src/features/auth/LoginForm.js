import React from 'react'
import { LoginEvent } from './scripts/LoginEvent'
import ForgotForm from './ForgotForm';

const LoginForm = ({ setShowForm }) => {
    const [ showForgotForm, setShowForgotForm ] = React.useState(false);
    return (
        <>
            {showForgotForm && <ForgotForm setShowForgotForm={setShowForgotForm}/>}
            {!showForgotForm && <form 
                className='Login__form' 
                onSubmit={(e)=>{e.preventDefault()}}>
                <label
                    className='Login__form__label Login__form__item'
                    name='username__label'
                >User name : </label>
                <input
                    className='Login__form__textInput Login__form__item'
                    name='username'
                    type='text'
                ></input>
                <label
                    className='Login__form__label Login__form__item'
                    name='password__label'
                >Password : </label>
                <input
                    className='Login__form__textInput Login__form__item'
                    name='password'
                    type='password'
                ></input>
                <input
                    className='Login__form__loginButton Login__form__item'
                    type='submit'
                    name='submit'
                    onClick={(event)=>{LoginEvent(event)}}
                    value='Log in'
                ></input>
                <button
                    className='Login__form__forgotButton'
                    onClick={()=>setShowForgotForm(true)}
                >Forgot Password</button>
            </form>
            }
            <button 
            className='Login__Button --Back' 
            onClick={()=>setShowForm('UserOptions')}
            >Back</button>
        </>
    )
}

export default LoginForm
