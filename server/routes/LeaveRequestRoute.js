const express = require('express');
const router = express.Router();
const authMiddleware=require('../middleware/authMiddleware');
const LeaveRequestControllerr=require('../controllers/LeaveRequestController');


router.get('/getLeave-requests', authMiddleware,LeaveRequestControllerr.getLeaveRequestbyId);
router.post('/leaverequests',authMiddleware,LeaveRequestControllerr.createNewLeaveRequest);


module.exports = router;
