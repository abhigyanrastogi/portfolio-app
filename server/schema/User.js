const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    hashedpwd: {
        type: String
    },
    roles: [{
        type: String,
        default: "Guest"
    }]
});

module.exports = mongoose.model('User', userSchema);