const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

router.route('/auth')
    .get(loginController.sendChallenge)
    .post(loginController.checkChallengeAndReplyChallenge)

module.exports = router;