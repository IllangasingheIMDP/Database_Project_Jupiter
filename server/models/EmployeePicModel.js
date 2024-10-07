const db = require('../config/db');

// Employee Pic model
const EmployeePicModel = {
  // Find all users
  findAll: (callback) => {
    const query = 'SELECT * FROM employee_pic';
    db.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  },

  // Find employee pic by ID
  findByEmployeePicId: (employeePicId, callback) => {
    const query = 'SELECT * FROM employee_pic WHERE Pic_ID = ?';
    db.query(query, [employeePicId], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result[0]);
    });
  },
  //Create new employee pic
  createEmployeePic: (employeePicData, callback) => {
    const query = 'INSERT INTO employee_pic (Pic_ID,Path) VALUES (?,?)';
    const queryParams = [
        employeePicData.Pic_Id,
        employeePicData.Path,
    ];
    db.query(query, queryParams, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },

  //Update employee Pic
  updateEmployeePic: (employeePicId, employeePicData, callback) => { //user data should be column value pairs like Path:"/images/employee.jpg"
    const query = 'UPDATE employee_pic SET ? WHERE Pic_ID = ?';
    db.query(query, [employeePicData, employeePicId], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },

  // Delete employee pic
  deleteEmployeePic: (employeePicId, callback) => {
    const query = 'DELETE FROM employee_pic WHERE Pic_ID = ?';
    db.query(query, [employeePicId], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  }
};

module.exports = EmployeePicModel;
