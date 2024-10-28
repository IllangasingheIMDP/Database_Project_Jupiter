const express = require('express');
const router = express.Router();
const authMiddleware=require('../middleware/authMiddleware');
const PayGradeController=require('../controllers/PayGradeController');


router.get('/', authMiddleware(['Admin User']),PayGradeController.getAllDetails);
router.put('/', authMiddleware(['Admin User']),PayGradeController.updateLeaveData);



module.exports = router;
