const db = require('../config/db');

// pay grade model
const PayGradeModel = {
  // Find all pay grade levels
  findAll: (callback) => {
    const query = 'SELECT db_getleave_data();';
    db.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  },

  // Find paygrade by ID
  findBypaygradeid: (GradeID, callback) => {
    const query = 'SELECT * FROM pay_grade WHERE PayGrade_Id = ?';
    db.query(query, [GradeID], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result[0]);
    }); 
  },
  //Create new paygrade
  createGrade: (GradeData, callback) => {
    const query = 'INSERT INTO pay_grade (PayGrade_Id, Pay_Grade_Level, Annual, Casual, Maternity, No-Pay) VALUES (?,?,?,?,?,?)';
    const queryParams = [
        GradeData.PayGrade_Id,
        GradeData.Pay_Grade_Level,
        GradeData.Annual,
        GradeData.Casual,
        GradeData.Maternity,
        GradeData.No-Pay,
    ];
    db.query(query, queryParams, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },

  //Update paygrade
  updateGrade: (PayGrade_ID, userData, callback) => {  // user data should be column value pairs like Pay_Grade_Level:":level-1"
    const query = 'UPDATE pay_grade SET ? WHERE PayGrade_ID = ?';
    db.query(query, [userData, PayGrade_ID], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },


  
  // Delete paygrade
  deleteGrade: (PayGrade_ID, callback) => {
    const query = 'DELETE FROM pay_grade WHERE PayGrade_ID = ?';
    db.query(query, [PayGrade_ID], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },
  updatedata: (PayGrade_ID,PayGrade_Data, callback) => {
    const query = 'select db_setleave_data(?, ?, ?, ?, ?)';
    db.query(query, [PayGrade_ID,PayGrade_Data.Annual,PayGrade_Data.Casual,PayGrade_Data.Maternity,PayGrade_Data.No_Pay], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },
  
};

module.exports = PayGradeModel;
