const express = require('express');
const router = express.Router();
const authMiddleware=require('../middleware/authMiddleware');
const userController =require('../controllers/userController')
const notificationController=require('../controllers/notificationController');
const profileController = require('../controllers/profileController');
const supervisorController = require('../controllers/supervisorController');
router.get('/profile', authMiddleware,profileController.getProfileInfo);

// User routes
          // GET /users hello  hee- Get all users
router.get('/notification',authMiddleware,notificationController.getNotifications);
router.put('/notification',authMiddleware,notificationController.UpdateNotificationStats);
router.put('/password',authMiddleware,userController.changePassword);
router.get('/team',authMiddleware,supervisorController.getTeamInfo);

module.exports = router;
