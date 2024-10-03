const express = require('express');
const router = express.Router();
const authMiddleware=require('../middleware/authMiddleware')
const userController = require('../controllers/userController');

// User routes
          // GET /users hello  hee- Get all users
router.post('/createnewuser',userController.createNewUser)

module.exports = router;
