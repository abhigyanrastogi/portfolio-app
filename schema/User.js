import mongoose from "mongoose";

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

const User = mongoose.model('User', userSchema);