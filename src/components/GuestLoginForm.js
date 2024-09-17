import React from 'react'

const GuestLoginForm = () => {

    const onLoginFormSubmit = (event) => {
        event.preventDefault();
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", "http://localhost:3501/users");
        xhr.setRequestHeader('Content-type', 'application/json');
        const userAuthObject = {
            "username": event.target.username.value,
            "role": ["Guest"]
        }
        console.log(JSON.stringify(userAuthObject));
        xhr.send(JSON.stringify(userAuthObject));
        xhr.onload = (event) => {
            const authStatus = JSON.parse(xhr.response).message;
            if(authStatus === "Authenticated") {
                //procedd to dash
                alert(authStatus);
            } else {
                alert(authStatus);
            }
        }
    }

  return (
    <form 
            className='Login__form'
            onSubmit={(event) => onLoginFormSubmit(event)}
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
                className='Login__form__submitButton Login__form__item'
                type='submit'
                value='Log in'
            ></input>
        </form>
  )
}

export default GuestLoginForm
