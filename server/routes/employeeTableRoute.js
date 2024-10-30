const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const employeeController = require('../controllers/employeeController');



router.get('/',authMiddleware(['Admin User',"HR Manager","Second Manager"]),employeeController.getEmployeebyId);
router.delete('/',authMiddleware(['Admin User',"HR Manager"]),employeeController.deletemployeebyId);
router.put('/',authMiddleware(['Admin User',"HR Manager"]),employeeController.updateEmployeeData);
router.post('/',authMiddleware(['Admin User',"HR Manager"]),employeeController.createNewEmployee);

router.post('/add_employee',authMiddleware(['Admin User',"HR Manager"]), employeeController.createNewEmployee);

router.get('/get_dropdown_options',authMiddleware(['Admin User',"HR Manager"]),employeeController.get_dropdown_options);
router.post('/delete_employee/:nic',authMiddleware(['Admin User',"HR Manager"]),employeeController.deleteEmployee);
router.get('/get_available_custom_fields',authMiddleware(['Admin User',"HR Manager"]),employeeController.get_available_custom_fields);
router.post('/add_custom_field',authMiddleware(['Admin User']), employeeController.createNewCustomField);
router.post('/delete_custom_field',authMiddleware(['Admin User']),employeeController.deleteCustomField);
router.get('/get_employees',authMiddleware(['Admin User',"HR Manager"]),employeeController.get_employees);

module.exports = router;


