const express = require('express');
const router = express.Router();
const authMiddleware=require('../middleware/authMiddleware');
const LeaveRequestControllerr=require('../controllers/LeaveRequestController');


router.get('/getLeave-requests', authMiddleware(['Admin User',"HR Manager","Second Manager","Employee"]),LeaveRequestControllerr.getLeaveRequestbyId);
router.post('/leave-requests',authMiddleware(['Admin User',"HR Manager","Second Manager","Employee"]),LeaveRequestControllerr.createNewLeaveRequest);


module.exports = router;
