import React from 'react'

const GuestLoginForm = ({ setShowPage }) => {

    const onLoginFormSubmit = (event) => {
        event.preventDefault();
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3501/users");
        xhr.setRequestHeader('Content-type', 'application/json');
        const userAuthObject = {
            "username": event.target.username.value,
            "roles": ["Guest"]
        }
        console.log(JSON.stringify(userAuthObject));
        xhr.send(JSON.stringify(userAuthObject));
        xhr.onload = (event) => {
            const authStatus = JSON.parse(xhr.response).message;
            if(authStatus === "Authenticated") {
                //proceed to GUEST DASH
                alert(authStatus);
            } else {
                alert(authStatus);
            }
        }
    }

  return (
    <>
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
                className='Login__form__loginButton Login__form__item'
                type='submit'
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
