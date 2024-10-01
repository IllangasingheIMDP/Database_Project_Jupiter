const db = require('../config/db');

// User model
const UserModel = {
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
    const query = 'SELECT * FROM user WHERE User_Name = ?';
    db.query(query, [username], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result[0]);
    });
  },

  //Create new user
  createNewUser: (userData, callback) => {
    const query = 'INSERT INTO user (`User_ID`, `User_Name`, `Password`, `Employee_ID`, `Auth_Level`) VALUE (?,?,?,?,?)';
    const queryParams = [
      userData.userId,
      userData.username,
      userData.password,
      userData.employeeId,
      userData.authLevel
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
