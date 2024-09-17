const User = require('../schema/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const salt = 10;
// @desc get all users
// @route GET /users
// access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-hashedpwd').lean();
    if(!users?.length) {
        return res.status(200).json({ message: "No Users Found" });
    }
    return res.status(200).json({ message:"User list attached", data:users});
});

// @desc create new user
// @route POST /users
// access Public
const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body;
    if(!Array.isArray(roles) || !roles.length) {
        return res.status(200).json({ message: "Need Roles as array of string" });
    }
    if(!username) {
        return res.status(200).json({ message: "Need username" });
    }

    const duplicate = await User.findOne({ username }).lean().exec();

    if(duplicate) {
        return res.status(200).json({ message: "Duplicate User found" });
    }

    let userObject = null;
    let userRole = roles[0]; // PROBABLE BUG

    //User needs password
    if(userRole === 'User') {
        if(!password) {
            return res.status(200).json({ message: "Need password" });
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
        return res.status(200).json({ message: `Created new user: ${username}` });
    } else {
        return res.status(200).json({ mesage: "Error creating user" });
    }
});

// @desc update user details
// @route PATCH /users
// access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, roles, password } = req.body;

    if(!id || !username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(200).json({ message: "Need id, username, password and roles as array of string" });
    }

    const user = await User.findById({_id:id}).exec();

    if(!user) {
        return res.status(200).json({ message: "No user found" });
    }

    const duplicateUsername = await User.findOne({ username }).exec();
    
    if(duplicateUsername && duplicateUsername.id !== id) {
        return res.status(200).json({ message: `Duplicate username: ${username} found!` });
    }

    const exisitingRoles = user.roles

    if(bcrypt.compareSync(password, user.hashedpwd) && JSON.stringify(exisitingRoles) === JSON.stringify(roles) && username === user.username) {
        return res.status(200).json({ message: `No change for ${user.username}!` });
    }

    user.username = username;
    user.hashedpwd = await bcrypt.hash(password, 10);
    user.roles = roles;

    const updatedUser = await user.save();

    console.log(updatedUser);
    res.status(200).json({ message: `Updated user ${user.username}` });
});

// @desc delete user
// @route DELETE /users
// access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body;

    const user = await User.findById(id).exec();

    if(!user) {
        return res.status(200).json({ message: "User doesnt exist" });
    }

    const reply = `User ${user.username} deleted`;

    const deleteUser = await user.deleteOne();

    return res.status(200).json({ message: reply});
});

// @desc verify user
// @route PUT /users
// access Public
const verifyUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password) {
        return res.status(200).json({ message: `Need: ${username?"":"Username "}${password?"":"Password"}` });
    }

    const user = await User.findOne({ "username" : username }).exec();

    if(!user) {
        return res.status(200).json({ message: "Username not found" });
    }

    return res.status(200).json({ message: `${bcrypt.compareSync(password, user.hashedpwd)?"Authenticated":"Denied"}` });
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