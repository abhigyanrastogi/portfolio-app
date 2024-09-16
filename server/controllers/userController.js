const User = require('../schema/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

// @desc get all users
// @route GET /users
// access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-hashedpwd').lean();
    if(!users?.length) {
        return res.status(400).json({ message: "No Users Found" });
    }
    return res.status(200).json(users);
});

// @desc create new user
// @route POST /users
// access Public
const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body;
    if(!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: "Need username, password and roles as array of string" });
    }

    const duplicate = await User.findOne({ username }).lean().exec();

    if(duplicate) {
        return res.status(400).json({ message: "Duplicate User found" });
    }

    const hashedpwd = bcrypt.hash(password, 10);

    const userObject = { username, "hashedpwd":hashedpwd, roles };

    const user = await User.create(userObject);

    if(user) {
        return res.status(200).json({ message: `Created new user: ${username}` });
    } else {
        return res.status(400).json({ mesage: "Error creating user" });
    }
});

// @desc update user details
// @route PATCH /users
// access Private
const updateUser = asyncHandler(async (req, res) => {
    const { _id, username, roles, password } = req.body;

    if(!_id || !username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: "Need id, username, password and roles as array of string" });
    }

    const user = await User.findById(_id).lean().exec();

    if(!user) {
        return res.status(400).json({ message: "No user found" });
    }

    const duplicateUsername = await User.findOne({ username }).lean().exec();

    if(duplicateUsername) {
        return res.status(400).json({ message: `Duplicate username:${username} found!` });
    }

    user.username = username;
    user.hashedpwd = bcrypt.hash(password, 10);
    user.roles = roles;

    const updatedUser = await user.save();

    res.status(200).json({ message: `Update user ${username}` });
});

// @desc delete user
// @route DELETE /users
// access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { _id } = req.body;

    const user = await User.findById(_id).exec();

    if(!user) {
        return res.status(400).json({ message: "User doesnt exist" });
    }

    const reply = `User ${user.username} deleted`;

    const deleteUser = await user.deletOne();

    return res.status(200).json({ message: reply});
});

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}