const express = require('express');
const router = express.Router();
const authMiddleware=require('../middleware/authMiddleware');
const employeeController=require('../controllers/employeeController');

router.get('/all',authMiddleware,employeeController.getAllEmployee);
router.get('/',authMiddleware,employeeController.getEmployeebyId);
router.delete('/',authMiddleware,employeeController.deletemployeebyId);
router.put('/',authMiddleware,employeeController.updateEmployeeData);
router.post('/',authMiddleware,employeeController.createNewEmployee);

module.exports = router;

