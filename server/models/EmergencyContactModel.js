const db = require('../config/db');

// Emergency Contact model
const EmergencyContactModel = {
  // Find all Emergency Contacts
  findAll: (callback) => {
    const query = 'SELECT * FROM emergency_contact';
    db.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  },

  // Find Emergency Contact by ID
  findByEmergencyContactId: (ContactId, callback) => {
    const query = 'SELECT * FROM emergency_contact WHERE Contact_ID = ?';
    db.query(query, [ContactId], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result[0]);
    });
  },
  //Create new Emergency Contact
  createEmergencyContact: (ContactData, callback) => {
    const query = 'INSERT INTO emergency_contact (Contact_ID,Employee_ID,First_Name,Last_Name,Phone,Email,Address,Relationship) VALUES (?,?,?,?,?,?,?,?)';
    const queryParams = [
        ContactData.Contact_ID,
        ContactData.Employee_ID,
        ContactData.First_Name,
        ContactData.Last_Name,
        ContactData.Phone,
        ContactData.Email,
        ContactData.Address,
        ContactData.Relationship,
    ];
    db.query(query, queryParams, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },

  //Update Emergency Contact
  updateEmergencyConatct: (ContactId, userData, callback) => { //user data should be column value pairs like First_Name:"Dasun"
    const query = 'UPDATE emergency_contact SET ? WHERE Contact_ID = ?';
    db.query(query, [userData, ContactId], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },

  // Delete Emergency Contact
  deleteEmergencyContact: (ContactId, callback) => {
    const query = 'DELETE FROM emergency_contact WHERE Contact_ID = ?';
    db.query(query, [ContactId], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  }
};

module.exports = EmergencyContactModel;
