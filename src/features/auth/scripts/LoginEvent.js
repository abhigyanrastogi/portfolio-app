const USER_SERVER_ADDR = "http://localhost:3501/users";

const GuestLoginEvent = (event, navigate) => {
    const xhr = new XMLHttpRequest();
    const userObject = { 
        username: event.target.form.username.value,
        roles: ["Guest"]
    };
    
    // verify if username provided is not registered already

    xhr.open("POST", USER_SERVER_ADDR);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(userObject));

    xhr.onload = () => {
        const res = JSON.parse(xhr.response);
        alert(res.message);
        if(res.status === 'Accepted') {
            navigate('/dash', { state: { username: userObject.username } });
        }
    };
}
const LoginEvent = (event, navigate) => {
    const xhr = new XMLHttpRequest();
    const userObject = { 
        username: event.target.form.username.value,
        password: event.target.form.password.value,
        roles: ["User"]
    };
    
    // verify if username and password are provided

    xhr.open("PUT", USER_SERVER_ADDR);
    xhr.setRequestHeader('Content-type', 'application/json');
    
    // verify from server if the username exists, password is correct for username
    
    xhr.send(JSON.stringify(userObject));

    xhr.onload = () => {
        const res = JSON.parse(xhr.response);
        alert(res.message);
        if(res.status === 'Accepted') {
            console.log("logging in...");
            navigate('/dash', { state: { username: userObject.username } });
        }
    };
}
const RegisterEvent = (event, setShowForm) => {
    const xhr = new XMLHttpRequest();
    const userObject = { 
        username: event.target.form.username.value,
        password: event.target.form.password.value,
        roles: ["User"]
    };
    
    // verify if username and password are provided

    xhr.open("POST", USER_SERVER_ADDR);
    xhr.setRequestHeader('Content-type', 'application/json');
    
    // verify from server if the username is unique
    
    xhr.send(JSON.stringify(userObject));

    xhr.onload = () => {
        const res = JSON.parse(xhr.response);
        alert(res.message);
        if(res.status === 'Accepted')
            setShowForm('LoginForm');
    };
}
const ForgotEvent = (event, setShowForgotForm) => {
    //TODO server side handling of forgot form (looking for _id of username)
    const xhr = new XMLHttpRequest();
    const userObject = { 
        username: event.target.form.username.value,
        password: event.target.form.password.value,
        roles: ["User"]
    };

    const xhr2 = new XMLHttpRequest();
    xhr2.open("PATCH", USER_SERVER_ADDR);
    xhr2.setRequestHeader("Content-Type", "application/json");
    xhr2.onload = () => {
        const res = JSON.parse(xhr2.response);
        if(res.status === 'Accepted') {
            alert(res.message);
            setShowForgotForm(false);
        } else {
            alert(res.message);
        }
    }
    
    // verify if username and password are provided

    xhr.open("GET", USER_SERVER_ADDR);
    xhr.setRequestHeader('Content-type', 'application/json');
    
    // verify from server if the username exists and update password
    
    xhr.onload = () => {
        let res = JSON.parse(xhr.response);
        console.log(res.message, res.data);
        let i = 0;
        for(i = 0; i < res.data.length; i ++) {
            if(res.data[i].username === userObject.username) {
                break;
            }
        }
        if(i === res.data.length) {
            console.log("Did not find username, please register");
        } else {
            userObject.id = res.data[i]._id;
            userObject.roles = (res.data[i].roles)?res.data[i].roles:[""];
            xhr2.send(JSON.stringify(userObject));
        }
    }
    xhr.send();

}
module.exports = {
    GuestLoginEvent,
    LoginEvent,
    RegisterEvent,
    ForgotEvent
};