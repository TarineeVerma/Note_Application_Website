
const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const singupController = require('../controllers/singupController');



// App Routes

router.get('/', mainController.homepage);
router.get('/about', mainController.about);
router.get('/features', mainController.features);
router.get('/FAQs', mainController.FAQs);
router.get('/signup', singupController.signup);
router.get('/signin', singupController.singin);

module.exports= router;