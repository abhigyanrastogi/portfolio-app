const makeResponse = require("./makeResponse");
const crypto = require("crypto");
// const bcrypt = require("bcrypt");
const User = require('../schema/User');
const Challenge = require('../schema/Challenge');
const expressAsyncHandler = require("express-async-handler");

const salt = 10;

// @desc send client a challenge
// @method GET /login/auth
// @access PUBLIC
const sendChallenge = expressAsyncHandler(async (req, res) => {
    const nonce = crypto.randomBytes(128).toString('hex');
    const challenge = await Challenge.create({ challenge:nonce });
    return makeResponse(res, "CHALLENGE", true, { challenge:nonce, salt:salt, challengeId: challenge._id });
});

// @desc check user sent reply to challenge and reply with a response to the challenge
// @method POST /login/auth
// @access PUBLIC
const checkChallengeAndReplyChallenge = expressAsyncHandler(async (req, res) => {
    // Expecting : username, hmac, challengeId
    // hmac => bcrypt.hash(username + bcrypt.hash(bcrypt.hash(password, salt) + challenge, salt), salt); {+ => concat}
    // hmac => bcrypt.hash(username + bcrypt.hash(challenge, salt), salt); {+ => concat}
    const { username, hmac, challengeId } = req.body;

    if(!username || !hmac || !challengeId) {
        return makeResponse(res, "NEED USERNAME AND HMAC AND CHALLENGE INDEX", false);
    }

    const challenge = await Challenge.findById(challengeId).exec();
    if(!challenge) {
        return makeResponse(res, "INVALID CHALLENGE", false);
    }

    const user = await User.findOne({ username }).lean().exec();
    if(!user) {
        return makeResponse(res, "USERNAME NOT FOUND", false);
    }

    challenge.user = user._id;

    // const hashedpwd = await bcrypt.hash(user.hashedpwd + challenge.challenge, salt);
    // const hashedpwd = await bcrypt.hash(challenge.challenge, salt);
    // const hmacServer = crypto.createHmac('sha256', challenge.challenge);
    // hmacServer.update(username).digest('hex');

    const auth = (
        bcrypt
        === hmac
    );
    //bcrypt.compareSync(username + hashedpwd, hmac);

    await challenge.deleteOne();

    if(!auth) {
        return makeResponse(res, "CHALLENGE FAILED", false);
    }


    return makeResponse(res, "CHALLENGE PASSED", true);
});

module.exports = {
    sendChallenge,
    checkChallengeAndReplyChallenge
};