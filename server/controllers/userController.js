const User = require('../schema/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const salt = 10;

const makeResponse = (res, message, status, data=null) => {
    if(data) {
        res.json({
            data: data
        });
    }
    return res.status(200).json({ 
        message: message,
        status: `${status?'Accepted':'Denied'}`
    })
}

// @desc get all users
// @route GET /users
// access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-hashedpwd').lean();
    if(!users?.length) {
        return makeResponse(res, "No Users Found", false);
    }
    return makeResponse(res, "User list attached", true, users);
});

// @desc create new user
// @route POST /users
// access Public
const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body;
    if(!Array.isArray(roles) || !roles.length) {
        return makeResponse(res, "Need Roles as array of string", false);
    }
    if(!username) {
        return makeResponse(res, "Need username", false);
    }

    const duplicate = await User.findOne({ username }).lean().exec();

    if(duplicate) {
        return makeResponse(res, "Duplicate User found", false);
    }

    let userObject = null;
    let userRole = roles[0]; // PROBABLE BUG

    //User needs password
    if(userRole === 'User') {
        if(!password) {
            return makeResponse(res, "Need password", false);
        }
        
        const hashedpwd = await bcrypt.hash(password, salt);
        
        userObject = { username, "hashedpwd":hashedpwd, roles };
    }

    //Guest doesnt need password
    if(userRole === 'Guest') {
        userObject = { username, roles };
    }

    const user = await User.create(userObject);

    if(user) {
        return makeResponse(res, `Created new user: ${username}`, true);
    } else {
        return makeResponse(res, "Error creating user", false);
    }
});

// @desc update user details
// @route PATCH /users
// access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, roles, password } = req.body;

    if(!id || !username || !password || !Array.isArray(roles) || !roles.length) {
        return makeResponse(res, "Need id, username, password and roles as array of string", false);
    }

    const user = await User.findById({_id:id}).exec();

    if(!user) {
        return makeResponse(res, "No user found");
    }

    const duplicateUsername = await User.findOne({ username }).exec();
    
    if(duplicateUsername && duplicateUsername.id !== id) {
        return makeResponse(res, `Duplicate username: ${username} found!`, false);
    }

    const exisitingRoles = user.roles

    if(bcrypt.compareSync(password, user.hashedpwd) && JSON.stringify(exisitingRoles) === JSON.stringify(roles) && username === user.username) {
        return makeResponse(res, `No change for ${user.username}!`, false);
    }

    user.username = username;
    user.hashedpwd = await bcrypt.hash(password, 10);
    user.roles = roles;

    const updatedUser = await user.save();

    console.log(updatedUser);
    return makeResponse(res, `Updated user ${user.username}`, true);
});

// @desc delete user
// @route DELETE /users
// access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body;

    const user = await User.findById(id).exec();

    if(!user) {
        return makeResponse(res, "User doesnt exist", false);
    }

    const reply = `User ${user.username} deleted`;

    const deleteUser = await user.deleteOne();

    return makeResponse(res, reply, true);
});

// @desc verify user
// @route PUT /users
// access Public
const verifyUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password) {
        return makeResponse(res, `Need: ${username?"":"Username "}${password?"":"Password"}`, false);
    }

    const user = await User.findOne({ "username" : username }).exec();

    if(!user) {
        return makeResponse(res, "Username not found", false);
    }

    return makeResponse(res, `${bcrypt.compareSync(password, user.hashedpwd)?"Authenticated":"Denied"}`, true);
});

// @desc handle preflight request
// @route OPTIONS /users
// access Public
const preflightResponse = asyncHandler(async (req, res) => {
    const req_headers = req.headers['access-control-allow-headers'];
    const req_methods = req.headers['access-control-allow-methods'];
    const req_origin = req.headers['origin'];

    res.set('Access-Control-Allow-Origin', req_origin);
    res.set('Access-Control-Allow-Methods', req_methods);
    res.set('Access-Control-Allow-Headers', req_headers);

    return res.status(200);
});



module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    verifyUser,
    preflightResponse
}