const db = require('../config/db');

// User model
const dependantInfoModel = {
  // Find all users
  
  
  //Create new user
  addDependant: (dependantData, callback) => {
    const query = 'select db_add_dependent(?,?,?)';
    const queryParams = [
        dependantData.dependentName,
        dependantData.employeeId,
        dependantData.relationship
    ];
    db.query(query, queryParams, (err, result) => {
      if (err) {
        return callback(err);
      }
      const key = Object.keys(result[0])[0]; // Getting the key like "db_add_dependent(...)"
      const dbResponse = result[0][key]; // Extract the response object
      
      const normalizedResult = {
        success: dbResponse.success === 1, // Normalize success flag
        data: dbResponse.data              // Extract the message
      };
      
      callback(null, normalizedResult);
    });
  }

  
};

module.exports = dependantInfoModel;
