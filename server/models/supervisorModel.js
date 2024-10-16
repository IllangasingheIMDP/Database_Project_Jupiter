const db = require('../config/db');

// pay grade model
const supervisorModel = {
  // Find all pay grade levels
  getTeam: (employeeId, callback) => {
    const query = 'select(db_get_team(?))';
    db.query(query, [employeeId], (err, results) => {
      if (err) {
        return callback(err);
      }
      else{
        return callback(null,results);
      }
      
      
    });
  }


  
};

module.exports = supervisorModel;
