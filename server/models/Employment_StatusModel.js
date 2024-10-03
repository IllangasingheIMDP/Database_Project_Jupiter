const db = require('../config/db');

const Employee_StatusModel = {
  findAll: (callback) => {
    const query = 'SELECT * FROM employment_status';
    db.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  },

  // Find EmployeeStatus by ID
  findByEmployeeStatusById: (employeeStatusId, callback) => {
    const query = 'SELECT * FROM employment_status WHERE Employment_Stat_ID = ?';
    db.query(query, [employeeStatusId], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result[0]);
    });
  },
  //Create new Status
  createEmployeeStatus: (employeeStatusData, callback) => {
    const query = 'insert into employment_status (Employment_Stat_ID, Employment_Stat_Type) values (?,?)';
    const queryParams = [
        employeeStatusData.Employment_Stat_ID,
        employeeStatusData.Employment_Stat_Type,
    ];
    db.query(query, queryParams, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },

  //Update employeeStatus
  updateEmployeeStatus: (employeeStatusId, userData, callback) => { 
    const query = 'UPDATE employment_status SET ? WHERE Employment_Stat_ID= ?';
    db.query(query, [userData, employeeStatusId], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },

  // Delete Status
  deleteEmployeeStatus: (employeeStatusId, callback) => {
    const query = 'DELETE FROM employment_status WHERE Employment_Stat_ID = ?';
    db.query(query, [employeeStatusId], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  }
};

module.exports = Employee_StatusModel;
