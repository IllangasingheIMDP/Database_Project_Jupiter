const db = require('../config/db');

// User model
const EmployeeModel = {
  // Find all users
  findAll: (callback) => {
    const query = 'SELECT * FROM employee';
    db.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  },

  // Find user by ID
  findByEmployeeId: (employeeId, callback) => {
    const query = 'SELECT * FROM employee WHERE Employee_ID = ?';
    db.query(query, [employeeId], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result[0]);
    });
  },
  //Create new user
  createEmployee: (employeeData, callback) => {
    const query = 'INSERT INTO employee (Employee_ID, NIC, Initials, First_Name, Last_Name, Date_of_Birth, Gender, Marital_Status, Phone, Email_Work, Email_Private, Address, Pic_ID, Dept_ID, Title_ID, PayGrade_ID, Employment_Stat_ID, PF_Number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    const queryParams = [
        employeeData.employeeId,
        employeeData.nic,
        employeeData.initials,
        employeeData.firstName,
        employeeData.lastName,
        employeeData.dateOfBirth,
        employeeData.gender,
        employeeData.maritalStatus,
        employeeData.phone,
        employeeData.emailWork,
        employeeData.emailPrivate,
        employeeData.address,
        employeeData.picId,
        employeeData.deptId,
        employeeData.titleId,
        employeeData.paygradeId,
        employeeData.employmentStatId,
        employeeData.PFNumber,
    ];
    db.query(query, queryParams, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },

  //Update employee
  updateEmployee: (employeeId, userData, callback) => { //user data should be column value pairs like First_Name:"Dasun"
    const query = 'UPDATE employee SET ? WHERE Employee_ID = ?';
    db.query(query, [userData, employeeId], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },

  // Delete user
  deleteEmployee: (employeeId, callback) => {
    const query = 'DELETE FROM employee WHERE Employee_ID = ?';
    db.query(query, [employeeId], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  }
};

module.exports = EmployeeModel;
