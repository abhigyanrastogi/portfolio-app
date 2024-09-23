//implement srp registration, logging in and verification PROPERLY :D
const expressAsyncHandler = require('express-async-handler');
const UserSRP = require('../schema/UserSRP');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const makeResponse = require('./makeResponse');

// make a GET /login/srp/register for N, g, salt, k

// @desc register user's username and verifier
// @method POST /login/srp/register
// @access PUBLIC
const registerUser = expressAsyncHandler(async (req, res) => {
    const {username, salt, verifier} = req.body;
    if(!username || !salt || !verifier) {
        return makeResponse(res, "NEED USERNAME, SALT AND VERIFIER", false);
    }

    const user = await UserSRP.findOne({ username }).exec();
    if(user) {
        return makeResponse(res, "DUPLICATE USERNAME", false);
    }

    const newUser = await UserSRP.create({ 
        username,
        salt,
        verifier
    });
    if(!newUser) {
        return makeResponse(res, "ERROR WHILE CREATING USER", false);
    }
    return makeResponse(res, "USER CREATED", true);
})

// @desc login the user without getting the password
// @method POST /login/srp/login
// @access PUBLIC
const sendChallenge = (expressAsyncHandler(async (req, res) => {
    const { username, A } = req.body;
    if(!username || !A) {
        return makeResponse(res, "NEED USERNAME AND VALUE OF A", false);
    }

    const user = await UserSRP.findOne({ username }).exec();
    if(!user) {
        return makeResponse(res, "USERNAME NOT FOUND", false);
    }

    const { salt, verifier } = user;
    const randomNumber = crypto.randomBytes(128);

}));