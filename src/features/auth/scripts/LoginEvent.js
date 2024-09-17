const USER_SERVER_ADDR = "http://localhost:3501/users";

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
        if(res.message === 'Authenticated')
            navigate('/dash');
    };
}
const RegisterEvent = (event) => {
    const xhr = new XMLHttpRequest();
    const userObject = { 
        username: event.target.form.username.value,
        password: event.target.form.password.value,
        roles: ["User"]
    };
    
    // verify if username and password are provided

    xhr.open("POST", USER_SERVER_ADDR);
    xhr.setRequestHeader('Content-type', 'application/json');
    
    // verify from server if the username exists, password is correct for username
    
    xhr.send(JSON.stringify(userObject));

    xhr.onload = () => {
        const res = JSON.parse(xhr.response);
        alert(res.message);
        //go to login page
    };
}
const ForgotEvent = (event) => {
    const xhr = new XMLHttpRequest();
    const userObject = { 
        username: event.target.form.username.value,
        password: event.target.form.password.value,
        roles: ["User"]
    };
    
    // verify if username and password are provided

    xhr.open("GET", USER_SERVER_ADDR);
    xhr.setRequestHeader('Content-type', 'application/json');
    
    // verify from server if the username exists and update password
    
    xhr.send();
    xhr.onload = () => {
        const res = JSON.parse(xhr.response);
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
            console.log("userObject : ", userObject);
            xhr.open("PATCH", USER_SERVER_ADDR);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(userObject));
            xhr.onload = () => {
                console.log(xhr.response);
            }

        }
    };
}
module.exports = {
    LoginEvent,
    RegisterEvent,
    ForgotEvent
};