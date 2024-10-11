const db = require('../config/db');

// leave balance model
const LeaveDataBalanceModel = {
  // Find all leave balances
  findAll: (callback) => {
    const query = 'SELECT * FROM leave_data_balance';
    db.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  },

  // Find leave balance by ID
  findByleavebalance: (Employee_ID, callback) => {
    const query = 'SELECT * FROM leave_data_balance WHERE Employee_ID = ?';
    db.query(query, [Employee_ID], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result[0]);
    });
  },
  //Create new Emergency Contact
  createLeaveBalance: (LeaveBalanceData, callback) => {
    const query = 'INSERT INTO leave_data_balance (Employee_ID,Year,Annual,Casual,Maternity,No-Pay,Total_Leave_Count) VALUES (?,?,?,?,?,?,?)';
    const queryParams = [
        LeaveBalanceData.Employee_ID,
        LeaveBalanceData.Year,
        LeaveBalanceData.Annual,
        LeaveBalanceData.Casual,
        LeaveBalanceData.Maternity,
        LeaveBalanceData.No_Pay,
        LeaveBalanceData.Total_Leave_Count,
    ];
    db.query(query, queryParams, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },

  //Update leave balance data
  updateLeaveBalance: (Employee_ID, LeaveBalanceDataData, callback) => { 
    const query = 'UPDATE leave_data_balance SET ? WHERE Employee_ID = ?';
    db.query(query, [LeaveBalanceDataData, Employee_ID], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },

  // Delete leave balance data
  deleteLeaveBalance: (Employee_ID, callback) => {
    const query = 'DELETE FROM leave_data_balance WHERE Employee_ID = ?';
    db.query(query, [Employee_ID], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  }
};

module.exports = LeaveDataBalanceModel;
