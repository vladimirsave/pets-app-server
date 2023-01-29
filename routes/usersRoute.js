const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/usersController')
const {passwordsMatch, isNewUser, hashPwd, doesUserExist, auth} = require('../middleware/usersMiddleware')
 

router.get('/all', UsersController.getAllUsers);
router.post('/signup', hashPwd, UsersController.signup);

router.post('/login', doesUserExist,  UsersController.login);


module.exports = router;


 

 
