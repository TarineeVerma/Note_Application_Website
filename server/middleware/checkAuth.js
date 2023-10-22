const jwt = require('jsonwebtoken');
const User = require('../models/User');

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token || typeof token !== 'string') {
      return res.redirect('/signin');
    }

    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    
    // Fetch user information from the database
    const user = await User.findById(verifyUser.userId);

    if (!user) {
      return res.redirect('/signin');
    }

    // Attach the user information to the request
    req.user = user;
    next();
  } catch (error) {
    return res.redirect('/signin');
  }
};

module.exports = isLoggedIn;
