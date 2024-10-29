const express = require('express');
const router = express.Router();
const authMiddleware=require('../middleware/authMiddleware');
const LeaveRequestController=require('../controllers/LeaveRequestController');


router.get('/manage_leaves', authMiddleware(["HR Manager","Second Manager","Employee"]),LeaveRequestController.getLeaveRequestbySupervisorId);
router.post('/update_status', authMiddleware(["HR Manager","Second Manager","Employee"]),LeaveRequestController.setRequestStatus);
router.get('/getallleaves', authMiddleware(["HR Manager","Second Manager","Employee"]),LeaveRequestController.getallemployeeleaves);


module.exports = router;
