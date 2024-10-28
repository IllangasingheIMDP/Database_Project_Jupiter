const express = require('express');
const router = express.Router();
const authMiddleware=require('../middleware/authMiddleware');
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/getUserData',authMiddleware(['Admin User',"HR Manager","Second Manager","Employee"]),authController.authenticate);

module.exports = router;