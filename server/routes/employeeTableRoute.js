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

router.get('/all',authMiddleware(['Admin User',"HR Manager","Second Manager"]),employeeController.getAllEmployee);
router.get('/',authMiddleware(['Admin User',"HR Manager","Second Manager"]),employeeController.getEmployeebyId);
router.delete('/',authMiddleware(['Admin User',"HR Manager"]),employeeController.deletemployeebyId);
router.put('/',authMiddleware(['Admin User',"HR Manager"]),employeeController.updateEmployeeData);
router.post('/',authMiddleware(['Admin User',"HR Manager"]),employeeController.createNewEmployee);

router.post('/add_employee',authMiddleware(['Admin User',"HR Manager"]), upload.single('picture'), employeeController.createNewEmployee);

router.get('/get_dropdown_options',authMiddleware(['Admin User',"HR Manager"]),employeeController.get_dropdown_options);

router.get('/get_available_custom_fields',authMiddleware(['Admin User',"HR Manager"]),employeeController.get_available_custom_fields);
router.post('/add_custom_field',authMiddleware(['Admin User']), employeeController.createNewCustomField);
router.post('/delete_custom_field',authMiddleware(['Admin User']),employeeController.deleteCustomField);

module.exports = router;


