const db = require('../config/db');


const AdminModel = {
  // Load dropdown data
  get_tables: (callback) => {
    const query = 'SELECT JSON_EXTRACT(db_get_tables(), "$") AS result';
    db.query(query, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results[0].result);
    });
  },
  // Fetch table data based on table name
  get_table_data: (tableName, callback) => {
    const query = 'CALL GetTableData(?)'; // Call the stored procedure with the table name
    db.query(query, [tableName], (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  },

  // Update table row
  update_table_row: (Data, callback) => {
    const query = 'CALL UpdateTableRow(?, ?, @result)';
    const queryParams = [
        Data.tableName,
        Data.json,
    ];

    // First, call the stored procedure
    db.query(query, queryParams, (err) => {
      if (err) {
        return callback(err);
      }

      // Now, retrieve the result from the OUT parameter
      const resultQuery = 'SELECT @result AS result';
      db.query(resultQuery, (err, result) => {
        if (err) {
          return callback(err);
        }
        callback(null, JSON.parse(result[0].result));
      });
    });
  },

  // Delete table row
  delete_table_row: (Data, callback) => {
    const query = 'CALL DeleteTableRow(?, ?, @result)';
    const queryParams = [
        Data.tableName,
        Data.json,
    ];

    // First, call the stored procedure
    db.query(query, queryParams, (err) => {
      if (err) {
        return callback(err);
      }

      // Now, retrieve the result from the OUT parameter
      const resultQuery = 'SELECT @result AS result';
      db.query(resultQuery, (err, result) => {
        if (err) {
          return callback(err);
        }
        callback(null, JSON.parse(result[0].result));
      });
    });
  },
  // ADD table row
  add_table_row: (Data, callback) => {
    const query = 'CALL db_add_row_to_table(?, ?, @result)';
    const queryParams = [
        Data.tableName,
        Data.json,
    ];

    // First, call the stored procedure
    db.query(query, queryParams, (err) => {
      if (err) {
        return callback(err);
      }

      // Now, retrieve the result from the OUT parameter
      const resultQuery = 'SELECT @result AS result';
      db.query(resultQuery, (err, result) => {
        if (err) {
          return callback(err);
        }
        callback(null, JSON.parse(result[0].result));
      });
    });
  },
  
};

module.exports = AdminModel;
