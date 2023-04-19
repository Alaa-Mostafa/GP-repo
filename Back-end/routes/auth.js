const { Router } = require('express');
const authController = require('../controllers/auth');
const stdValidator = require("../middleWares/studentValidMW")

const router = Router();


router.post('/signup',stdValidator, authController.signup);
router.post('/login', stdValidator,authController.login);

module.exports = router;