import React from 'react'
import '../styles/Login.css'
// import { parseJSON } from 'date-fns';

const Login = () => {

    const onLoginFormSubmit = (event) => {
        event.preventDefault();
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", "http://localhost:3501/users");
        xhr.setRequestHeader('Content-type', 'application/json');
        const userAuthObject = {
            "username": event.target.username.value,
            "password": event.target.password.value
        }
        console.log(JSON.stringify(userAuthObject));
        xhr.send(JSON.stringify(userAuthObject));
        xhr.onreadystatechange = (event) => {
            console.log(xhr.response);
        }
    } 

  return (
    <div className='Login'>
      <div className='Login__container'>
        <div className='Login__welcome Login__item'>
            <h1>Welcome!</h1>
        </div>
        <div className='Login__details Login__item'>
            <form 
                className='Login__form'
                onSubmit={(event) => onLoginFormSubmit(event)}
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
                    type='submit'
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
