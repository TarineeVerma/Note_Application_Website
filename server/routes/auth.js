const express = require('express');
const { generateToken } = require('../config/authUtils');
const router = express.Router();
const signupController = require('../controllers/singupController');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const isLoggedIn  = require('../middleware/checkAuth');




// Function to generate a unique cookie (customize as needed)
// const generateCookie = (user) => {
//     return 'your_unique_cookie_value';
// };

router.get('/singin', signupController.singin);
router.post('/singin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            // req.flash('error', 'Incorrect email or password.');
            return res.send('<script>alert("Incorrect email or password."); window.history.back();</script>');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        const token = await generateToken(user);
        
        if (!passwordMatch) {
            // req.flash('error', 'Incorrect email or password.');
            return res.send('<script>alert("Incorrect email or password."); window.history.back();</script>');
        }

        // const cookie = generateCookie(user);
        res.cookie('jwt', token, { httpOnly: true });

        // console.log('Token set in the cookie:', token);
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).send('Error signing in. Please try again later.');
    }
});


router.get('/signup', signupController.signup);
router.post('/signup', async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.send('<script>alert("email is already exists."); window.history.back();</script>');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            username,
            password: hashedPassword,
        });

        const token = await generateToken(newUser);
        // const cookie = generateCookie(newUser);

        // Redirect to the dashboard after successful signup
        res.cookie('jwt', token, { httpOnly: true });

        // Respond with the token
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send('Error saving user');
    }
});




router.get('/logout', isLoggedIn, async (req, res) => {
    try {
        console.log(req.user);
        req.user.tokens = [];
        res.clearCookie("jwt");
        // console.log("logout success");
        await req.user.save();

        // Clear browser history using JavaScript (not a reliable approach)
        res.send('<script>window.location.replace("/"); window.history.replaceState(null, null, "/");</script>');
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router;



