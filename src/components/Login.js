import React from 'react'
import '../styles/Login.css'

const Login = () => {
  return (
    <div className='Login'>
      <div className='Login__container'>
        <div className='Login__welcome Login__item'>
            <h1>Welcome!</h1>
        </div>
        <div className='Login__details Login__item'>
            <form 
                className='Login__form'
                action='submit'
                method='GET'
            >
                <label
                    className='Login__form__label Login__form__item'
                    name='username'
                >Username : </label>
                <input
                    className='Login__form__textInput Login__form__item'
                    name='username'
                    type='text'
                ></input>
                <label
                    className='Login__form__label Login__form__item'
                    name='password'
                >Password : </label>
                <input
                    className='Login__form__textInput Login__form__item'
                    name='password'
                    type='password'
                ></input>
                <input
                    className='Login__form__submitButton Login__form__item'
                    type='button'
                    value='Log in'
                ></input>
                <input
                    className='Login__form__forgotButton Login__form__item'
                    type='button'
                    value='Forgot password'
                ></input>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login
