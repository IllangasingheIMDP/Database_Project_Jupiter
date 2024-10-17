const express = require('express');
const router = express.Router();
const authMiddleware=require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

router.get('/getTables',authMiddleware, adminController.get_tables);
router.get('/getTableData/:tableName', authMiddleware, adminController.get_table_data);
router.put('/updateTableData/:tableName', authMiddleware, adminController.update_table_row);
router.post('/deleteTableData/:tableName', authMiddleware, adminController.delete_table_row);


module.exports = router;