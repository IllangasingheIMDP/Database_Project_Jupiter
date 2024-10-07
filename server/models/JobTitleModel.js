const db = require('../config/db');

// job title model
const JobTitleModel = {
  // Find all job titles
  findAll: (callback) => {
    const query = 'SELECT * FROM job_title';
    db.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  },

  // Find job title by ID
  findByJobTitleId: (JobTitleId, callback) => {
    const query = 'SELECT * FROM job_title WHERE Title_ID = ?';
    db.query(query, [JobTitleId], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result[0]);
    });
  },
  //Create new job title
  createJobTitle: (TitleData, callback) => {
    const query = 'INSERT INTO job_title (Title_ID,Title) VALUES (?,?)';
    const queryParams = [
        TitleData.Title_ID,
        TitleData.Title,
    ];
    db.query(query, queryParams, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },

  //Update job title
  updateJobTitle: (JobTitleId, TitleData, callback) => { //user data should be column value pairs like Title:"HR Manager"
    const query = 'UPDATE job_title SET ? WHERE Title_ID = ?';
    db.query(query, [TitleData, JobTitleId], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },

  // Delete job title
  deleteJobTitle: (JobTitleId, callback) => {
    const query = 'DELETE FROM job_title WHERE Title_ID = ?';
    db.query(query, [JobTitleId], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  }
};

module.exports = JobTitleModel;
