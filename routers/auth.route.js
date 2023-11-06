const express = require('express');
const controler = require('../controllers/auth');
const validation = require('../middlewares/validationShema');
const router = express.Router();



//register
router.post('/register',validation.UsersRigister(),controler.register);



//login
router.post('/login',validation.UsersLogin(),controler.login);

module.exports = router;