const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = async (user) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId: user._id.toString()
        };

        jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' }, (error, token) => {
            if (error) {
                console.error('Error generating token:', error);
                reject('Error generating token');
            } else {
                // Save the user object to persist the token
                user.tokens.push({ token });
                user.save(); // Save the user after generating the token
                resolve(token);
            }
        });
    });
};

module.exports = {
    generateToken,
};
