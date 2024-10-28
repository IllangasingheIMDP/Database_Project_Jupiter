const express = require('express');
const router = express.Router();
const authMiddleware=require('../middleware/authMiddleware');
const userController =require('../controllers/userController')
const notificationController=require('../controllers/notificationController');
const profileController = require('../controllers/profileController');
const supervisorController = require('../controllers/supervisorController');

router.get('/profile', authMiddleware(['Admin User',"HR Manager","Second Manager","Employee"]),profileController.getProfileInfo);

// User routes
          // GET /users hello  hee- Get all users
router.get('/notification',authMiddleware(['Admin User',"HR Manager","Second Manager","Employee"]),notificationController.getNotifications);
router.put('/notification',authMiddleware(['Admin User',"HR Manager","Second Manager","Employee"]),notificationController.UpdateNotificationStats);
router.put('/password',authMiddleware(['Admin User',"HR Manager","Second Manager","Employee"]),userController.changePassword);
router.get('/team',authMiddleware(['Admin User',"HR Manager","Second Manager","Employee"]),supervisorController.getTeamInfo);

router.post('/add-user',authMiddleware(['Admin User',"HR Manager","Second Manager"]),userController.createNewUser);
router.post('/delete-user/:nic',authMiddleware(['Admin User',"HR Manager","Second Manager"]),userController.deleteUser);
router.get('/get-users',authMiddleware(['Admin User',"HR Manager","Second Manager"]),userController.getUsers);

module.exports = router;
