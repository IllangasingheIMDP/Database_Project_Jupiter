const db = require('../config/db');


const notificationModel = {

  getNotificationsbyUserId: (userId, callback) => {
    const query = 'select(db_get_user_notification(?))';
    db.query(query, [userId], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },
  SetNotificationStats: (userId,datetime, callback) => {
    const query = 'select(db_update_user_notification(?,?))';
    db.query(query, [userId,datetime], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },

  createNotification: (userId,data, callback) => {
    const query = 'INSERT INTO job_title (Title_ID,Title) VALUES (?,?)';
    
    db.query(query, userId,data, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },


  deleteNotification: (userId,time, callback) => {
    const query = 'DELETE FROM job_title WHERE Title_ID = ?';
    db.query(query, [userId,time], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  }
};

module.exports = notificationModel;
