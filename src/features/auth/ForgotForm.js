import React from 'react'
import { ForgotEvent } from './scripts/LoginEvent'
// TODO: find a way to authenticate the user without the password.
// a security question?
// OTP?
// face processing information?
const ForgotForm = ({ setShowForgotForm }) => {
  return (
    <>
        <form 
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
                className='Login__form__forgotButton Login__form__item'
                type='submit'
                name='forgot'
                onClick={(event)=>{ForgotEvent(event)}}
                value='Change Password'
            ></input>
        </form>
        <button 
        className='Login__Button --Back' 
        onClick={()=>setShowForgotForm(false)}
        >Back</button>
    </>
  )
}

export default ForgotForm
