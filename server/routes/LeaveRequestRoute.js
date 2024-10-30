const express = require('express');
const router = express.Router();
const authMiddleware=require('../middleware/authMiddleware');
const LeaveRequestControllerr=require('../controllers/LeaveRequestController');


router.get('/getLeave-requests', authMiddleware(['Admin User',"HR Manager","Second Manager","Employee"]),LeaveRequestControllerr.getLeaveRequestbyId);
router.post('/leave-requests',authMiddleware(['Admin User',"HR Manager","Second Manager","Employee"]),LeaveRequestControllerr.createNewLeaveRequest);
router.get('/apprejmail',authMiddleware(['Admin User',"HR Manager","Second Manager","Employee"]),LeaveRequestControllerr.getAppRejMail);
router.post('/supervisorMail',authMiddleware(['Admin User',"HR Manager","Second Manager","Employee"]),LeaveRequestControllerr.sendSupervisorMail);




module.exports = router;
