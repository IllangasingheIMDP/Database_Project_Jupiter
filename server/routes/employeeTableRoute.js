const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const employeeController = require('../controllers/employeeController');
const multer = require('multer');  // Import multer
const { v4: uuidv4 } = require('uuid');  // Import uuid for unique image names
const path = require('path');

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save images to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    const uniqueName = uuidv4(); // Generate a unique 36-character name
    const ext = path.extname(file.originalname); // Get file extension
    cb(null, `${uniqueName}${ext}`); // Save the file with the unique name + original extension
  },
});

const upload = multer({ storage: storage });  // Define upload using multer

router.get('/all',authMiddleware,employeeController.getAllEmployee);
router.get('/',authMiddleware,employeeController.getEmployeebyId);
router.delete('/',authMiddleware,employeeController.deletemployeebyId);
router.put('/',authMiddleware,employeeController.updateEmployeeData);
router.post('/',authMiddleware,employeeController.createNewEmployee);

router.post('/add_employee',authMiddleware, upload.single('picture'), employeeController.createNewEmployee);

router.get('/get_dropdown_options',authMiddleware,employeeController.get_dropdown_options);

router.get('/get_available_custom_fields',authMiddleware,employeeController.get_available_custom_fields);
router.post('/add_custom_field',authMiddleware, employeeController.createNewCustomField);
router.post('/delete_custom_field',authMiddleware,employeeController.deleteCustomField);

module.exports = router;


