import React from 'react'
import { GuestLoginEvent } from './scripts/LoginEvent'
import { useNavigate } from 'react-router-dom'

const GuestLoginForm = ({ setShowPage }) => {
    const navigate = useNavigate();
    return (
    <>
        <form 
            className='Login__form'
            onSubmit={(event) => event.preventDefault()}
        >
            <label
                className='Login__form__label Login__form__item'
                name='username'
            >Guest name : </label>
            <input
                className='Login__form__textInput Login__form__item'
                name='username'
                type='text'
            ></input>
            <input
                className='Login__form__loginButton Login__form__item'
                type='submit'
                onClick={(event)=>GuestLoginEvent(event, navigate)}
                value='Log in'
            ></input>
        </form>
        <button 
            className='Login__Button --Back' 
            onClick={()=>setShowPage('LoginPage')}
        >Back</button>
    </>
    )
}

export default GuestLoginForm
