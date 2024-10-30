const express = require('express');
const router = express.Router();
const authMiddleware=require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

router.get('/getTables',authMiddleware(['Admin User']), adminController.get_tables);
router.get('/getTableData/:tableName', authMiddleware(['Admin User']), adminController.get_table_data);
router.put('/updateTableData/:tableName', authMiddleware(['Admin User']), adminController.update_table_row);
router.post('/deleteTableData/:tableName', authMiddleware(['Admin User']), adminController.delete_table_row);
router.post('/addTableData/:tableName', authMiddleware(['Admin User']), adminController.add_table_row);

module.exports = router;