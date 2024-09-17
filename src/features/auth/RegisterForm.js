import React from 'react'
import { RegisterEvent } from './scripts/LoginEvent'

const RegisterForm = ({ setShowForm }) => {
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
                className='Login__form__registerButton Login__form__item'
                type='submit'
                name='register'
                onClick={(event)=>{RegisterEvent(event); setShowForm('UserOptions')}}
                value='Register User'
            ></input>
        </form>
        <button 
        className='Login__Button --Back' 
        onClick={()=>setShowForm('UserOptions')}
        >Back</button>
    </>
  )
}

export default RegisterForm
