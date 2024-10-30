const db = require('../config/db');

// User model
const GenerateReportModel = {
  // Load dropdown data
  get_dropdown_options: (callback) => {
    const query = 'SELECT JSON_EXTRACT(db_get_dropdown_options(), "$") AS result';
    db.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results[0].result);
    });
  },
  get_employee_detail_by_department: (departmentID, statusID, titleID, callback) => {
    const callQuery = `CALL get_employee_detail_by_department(?, ?, ?, @result);`;
    const selectQuery = `SELECT @result AS result;`;
  
    db.query(callQuery, [departmentID, statusID, titleID], (err) => {
      if (err) {
        return callback(err);
      }
  
      db.query(selectQuery, (err, results) => {
        if (err) {
          return callback(err);
        }
  
        // Parse the JSON response from the stored procedure
        const result = JSON.parse(results[0].result);
  
        callback(null, result);
      });
    });
  },
  get_employee_detail_by_branch: (branchID, statusID, titleID, callback) => {
    const callQuery = `CALL get_employee_detail_by_branch(?, ?, ?, @result);`;
    const selectQuery = `SELECT @result AS result;`;
  
    db.query(callQuery, [branchID, statusID, titleID], (err) => {
      if (err) {
        return callback(err);
      }
  
      db.query(selectQuery, (err, results) => {
        if (err) {
          return callback(err);
        }
  
        // Parse the JSON response from the stored procedure
        const result = JSON.parse(results[0].result);
  
        callback(null, result);
      });
    });
  },
  get_annual_leave_balance: (departmentID, branchID, callback) => {
    const callQuery = `CALL get_annual_leave_balance_report(?, ?, @result);`;
    const selectQuery = `SELECT @result AS result;`;
  
    db.query(callQuery, [departmentID, branchID], (err) => {
      if (err) {
        return callback(err);
      }
  
      db.query(selectQuery, (err, results) => {
        if (err) {
          return callback(err);
        }
  
        // Parse the JSON response from the stored procedure
        const result = JSON.parse(results[0].result);
  
        callback(null, result);
      });
    });
  },
  get_leave_request_details: (departmentID, branchID, fromDate, toDate, callback) => {
    const callQuery = `CALL get_approve_leave_request_report(?, ?, ?, ?, @result);`;
    const selectQuery = `SELECT @result AS result;`;
  
    db.query(callQuery, [departmentID, branchID, fromDate, toDate], (err) => {
      if (err) {
        return callback(err);
      }
  
      db.query(selectQuery, (err, results) => {
        if (err) {
          return callback(err);
        }
  
        // Parse the JSON response from the stored procedure
        const result = JSON.parse(results[0].result);
  
        callback(null, result);
      });
    });
  },
  get_custom_field: (customFieldID, departmentID, branchID, callback) => {
    const callQuery = `CALL db_get_customfield_data(?, ?, ?, @result);`;
    const selectQuery = `SELECT @result AS result;`;
  
    db.query(callQuery, [customFieldID, departmentID, branchID], (err) => {
      if (err) {
        return callback(err);
      }
  
      db.query(selectQuery, (err, results) => {
        if (err) {
          return callback(err);
        }
  
        // Parse the JSON response from the stored procedure
        const result = JSON.parse(results[0].result);
  
        callback(null, result);
      });
    });
  },
}

module.exports = GenerateReportModel;