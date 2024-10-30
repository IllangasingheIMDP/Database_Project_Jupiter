const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const generateReportController = require('../controllers/generateReportController');
const path = require('path');


router.get('/get_dropdown_options',authMiddleware(['Admin User',"HR Manager","Second Manager","Employee"]),generateReportController.get_dropdown_options);
router.post('/get_branch_details', authMiddleware(['Admin User',"HR Manager","Second Manager","Employee"]), generateReportController.get_branch_details);
router.post('/get_employee_details', authMiddleware(['Admin User',"HR Manager","Second Manager","Employee"]), generateReportController.get_employee_details);
router.post('/get_employee_detail_by_department', authMiddleware(['Admin User',"HR Manager","Second Manager","Employee"]), generateReportController.get_employee_detail_by_department);
router.post('/get_employee_detail_by_branch', authMiddleware(['Admin User',"HR Manager","Second Manager","Employee"]), generateReportController.get_employee_detail_by_branch);
router.post('/get_employee_detail_by_pay_grade', authMiddleware(['Admin User',"HR Manager","Second Manager","Employee"]), generateReportController.get_employee_detail_by_pay_grade);
router.post('/get_employee_detail_by_title', authMiddleware(['Admin User',"HR Manager","Second Manager","Employee"]), generateReportController.get_employee_detail_by_title);
router.post('/get_annual_leave_balance', authMiddleware(['Admin User',"HR Manager","Second Manager","Employee"]), generateReportController.get_annual_leave_balance);
router.post('/get_leave_request_details', authMiddleware(['Admin User',"HR Manager","Second Manager","Employee"]), generateReportController.get_leave_request_details);
router.post('/get_pending_leave_request_details', authMiddleware(['Admin User',"HR Manager","Second Manager","Employee"]), generateReportController.get_pending_leave_request_details);
router.post('/get_rejected_leave_request_details', authMiddleware(['Admin User',"HR Manager","Second Manager","Employee"]), generateReportController.get_rejected_leave_request_details);
router.post('/get_custom_field', authMiddleware(['Admin User',"HR Manager","Second Manager","Employee"]), generateReportController.get_custom_field);

module.exports = router;