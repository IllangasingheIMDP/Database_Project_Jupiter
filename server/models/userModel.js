const db = require('../config/db');

// User model
const UserModel = {
  getUsers: (callback) => {
    const query = 'SELECT JSON_EXTRACT(db_get_user_dropdown_options(), "$") AS result';
    db.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results[0].result);
    });
  },

  // Find all users
  findAll: (callback) => {
    const query = 'SELECT * FROM user';
    db.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  },

  // Find user by ID
  findByUserName: (username, callback) => {
    const query = 'SELECT db_login_data(?)';
    db.query(query, [username], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result[0]);
    });
  },

  //Create new user
  createNewUser: (Data, callback) => {
    // First query to call the stored procedure
    const callProcedure = `CALL add_user(?, ?, ?, ?, @result);`;
    // Second query to retrieve the OUT parameter result
    const getResult = `SELECT @result AS result;`;

    const queryParams = [
      Data.employee_nic,
      Data.username,
      Data.password,
      Data.authLevel,
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

  // Delete User
  deleteUser: (employeeData, callback) => {
    // First query to call the stored procedure
    const callProcedure = `CALL delete_user(?, @result);`;
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
  updatePassword: (userData, callback) => {
    const query = 'select db_change_password(?,?)';
    const queryParams = [
      userData.userId,
      userData.password
    ];
    db.query(query, queryParams, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },

  // Update user
  // update: (id, userData, callback) => {
  //   const query = 'UPDATE users SET ? WHERE id = ?';
  //   db.query(query, [userData, id], (err, result) => {
  //     if (err) {
  //       return callback(err);
  //     }
  //     callback(null, result);
  //   });
  // },

  // Delete user
//   delete: (id, callback) => {
//     const query = 'DELETE FROM users WHERE id = ?';
//     db.query(query, [id], (err, result) => {
//       if (err) {
//         return callback(err);
//       }
//       callback(null, result);
//     });
//   }
};

module.exports = UserModel;
