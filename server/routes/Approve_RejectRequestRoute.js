const express = require('express');
const router = express.Router();
const authMiddleware=require('../middleware/authMiddleware');
const LeaveRequestController=require('../controllers/LeaveRequestController');


router.post('/update_status', authMiddleware(["HR Manager","Second Manager","Employee"]),LeaveRequestController.setRequestStatus);
router.put('/approve', authMiddleware(["HR Manager","Second Manager","Employee"]),LeaveRequestController.setRequestStatusApprove);
router.post('/reject', authMiddleware(["HR Manager","Second Manager","Employee"]),LeaveRequestController.setRequestStatusReject);


module.exports = router;
