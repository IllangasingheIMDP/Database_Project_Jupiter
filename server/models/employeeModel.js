const db = require('../config/db');

// User model
const EmployeeModel = {
  // Load dropdown data
  get_dropdown_options: (callback) => {
    const query = 'SELECT JSON_EXTRACT(db_get_employee_dropdown_options(), "$") AS result';
    db.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results[0].result);
    });
  },

  // Load available_custom_fields data
  get_available_custom_fields: (callback) => {
    const query = 'SELECT JSON_EXTRACT(db_get_available_custom_fields(), "$") AS result';
    db.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results[0].result);
    });
  },

  //Create new CustomField
  createNewCustomField: (Data, callback) => {
    const query = 'SELECT JSON_EXTRACT(db_createNewCustomField(?), "$") AS result';
    const queryParams = [
        Data.name,
    ];
    db.query(query, queryParams, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results[0].result);
    });
  },

  //Delete CustomField
  deleteCustomField: (Data, callback) => {
    const query = 'SELECT JSON_EXTRACT(db_deleteCustomField(?), "$") AS result';
    const queryParams = [
        Data.name,
    ];
    db.query(query, queryParams, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results[0].result);
    });
  },

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
  //Create new Employee
  createEmployee: (employeeData, callback) => {
    const query = 'SELECT add_employee(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    const queryParams = [
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
        employeeData.picturePath,
        employeeData.dept,
        employeeData.title,
        employeeData.paygrade,
        employeeData.employmentStat,
        employeeData.PFNumber,
        employeeData.supervisor,
        employeeData.dependent_info,
        employeeData.emergency_contacts_info,
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
