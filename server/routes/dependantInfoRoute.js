const express = require('express');
const router = express.Router();
const authMiddleware=require('../middleware/authMiddleware');
const dependantInfoController=require('../controllers/dependantInfoController');

router.post('/',authMiddleware(["HR Manager","Second Manager","Employee"]),dependantInfoController.addDependant);


module.exports = router;

