const express = require('express');
const router = express.Router();
const authMiddleware=require('../middleware/authMiddleware');
const LeaveRequestController=require('../controllers/LeaveRequestController');


router.get('/manage_leaves', authMiddleware(["HR Manager","Second Manager","Employee"]),LeaveRequestController.getLeaveRequestbySupervisorId);
router.put('/approve', authMiddleware(["HR Manager","Second Manager","Employee"]),LeaveRequestController.setRequestStatusApprove);
router.post('/reject', authMiddleware(["HR Manager","Second Manager","Employee"]),LeaveRequestController.setRequestStatusReject);
router.get('/getallleaves', authMiddleware(["HR Manager","Second Manager","Employee"]),LeaveRequestController.getallemployeeleaves);


module.exports = router;
