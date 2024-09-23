const mongoose = require('mongoose');

const userSRPSchema = mongoose.Schema({
    username: String,
    salt: String,
    verifier: String
})

module.exports = mongoose.model('UserSRP', userSRPSchema);