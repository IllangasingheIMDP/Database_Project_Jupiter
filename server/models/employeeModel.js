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

  // Load employees
  get_get_employees: (callback) => {
      const query = 'SELECT JSON_EXTRACT(db_get_employee_list(), "$") AS result';
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
  
  // Create new Employee
  createEmployee: (employeeData, callback) => {
    // First query to call the stored procedure
    const callProcedure = `CALL add_employee(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @result);`;
    // Second query to retrieve the OUT parameter result
    const getResult = `SELECT @result AS result;`;

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
      employeeData.custom_fields,
    ];

    // Execute the stored procedure first
    db.query(callProcedure, queryParams, (err) => {
      if (err) {
          return callback(err);
      }

      // After the procedure, execute the SELECT query to get the result
      db.query(getResult, (err, results) => {
          if (err) {
              return callback(err);
          }

          // The result will be available in the first row of results
          const result = results[0].result;
          callback(null, JSON.parse(result));
      });
    });
  },

  // Delete Employee
  deleteEmployee: (employeeData, callback) => {
    // First query to call the stored procedure
    const callProcedure = `CALL delete_employee(?, @result);`;
    // Second query to retrieve the OUT parameter result
    const getResult = `SELECT @result AS result;`;

    const queryParams = [
        employeeData.nic,
    ];

    // Execute the stored procedure first
    db.query(callProcedure, queryParams, (err) => {
        if (err) {
            return callback(err);
        }

        // After the procedure, execute the SELECT query to get the result
        db.query(getResult, (err, results) => {
            if (err) {
                return callback(err);
            }

            // The result will be available in the first row of results
            const result = results[0].result;
            callback(null, JSON.parse(result));
        });
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

};

module.exports = EmployeeModel;
