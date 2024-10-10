const db = require('../config/db');

// pay grade model
const profileModel = {
  // Find all pay grade levels
  getAll: (employeeId,callback) => {
    const query = 'select(db_get_employee_details(?))';
    db.query(query, [employeeId],(err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  }

  
};

module.exports = profileModel;
