const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    hashedpwd: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "Guest"
    }
});

module.exports = mongoose.model('User', userSchema);