const db = require('../config/db');

// pay grade model
const profileModel = {
  // Find all pay grade levels
  getAll: (employeeId, callback) => {
    const query = 'CALL db_get_employee_details(?, @result)';
    db.query(query, [employeeId], (err, results) => {
      if (err) {
        return callback(err);
      }
      
      // Fetch the result stored in @result
      const selectResultQuery = 'SELECT @result as result';
      db.query(selectResultQuery, (err, finalResult) => {
        if (err) {
          return callback(err);
        }
        
        // Parse the JSON result if needed
        const output = JSON.parse(finalResult[0].result);
        callback(null, output);
      });
    });
  }


  
};

module.exports = profileModel;
