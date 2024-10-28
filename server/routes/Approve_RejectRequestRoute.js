const express = require('express');
const router = express.Router();
const authMiddleware=require('../middleware/authMiddleware');
const LeaveRequestControllerr=require('../controllers/LeaveRequestController');


router.get('/manage_leaves', authMiddleware,LeaveRequestControllerr.getLeaveRequestbySupervisorId);
router.post('/update_status', authMiddleware,LeaveRequestControllerr.setRequestStatus);



module.exports = router;
