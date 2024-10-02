const express = require('express');
const router = express.Router();
const authMiddleware=require('../middleware/authMiddleware')
const userController = require('../controllers/userController');

// User routes
router.post('/login', userController.login);            // GET /users hello - Get all users
router.post('/createnewuser',userController.createNewUser)
router.post('/getUserData',authMiddleware,userController.authController)
module.exports = router;
