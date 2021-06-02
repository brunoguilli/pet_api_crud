const tokenData = require('../data/tokenData');
const jwt = require('jsonwebtoken');

exports.getUserByLogin = function (login) {
    return tokenData.getUserByLogin(login);
}

exports.generateToken = async function (login) {
    const existingUser= await tokenData.getUserByLogin(login);
    if (!existingUser) throw new Error('User not found');
    const token = jwt.sign({userId: existingUser.id}, process.env.SECRET, {expiresIn: existingUser.token_expires })
    return token;
}

