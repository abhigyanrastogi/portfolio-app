const mongoose = require('mongoose');

const challengeSchema = mongoose.Schema({
    challenge: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }
});

module.exports = mongoose.model('Challenge', challengeSchema);