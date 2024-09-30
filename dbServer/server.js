require('dotenv').config();
const mysql = require('mysql2/promise');    
const express = require('express');
const app = express();

// Load environment variables from .env file
const PORT = process.env.DB_SERVER_PORT;

// Middleware to parse JSON body from POST requests
app.use(express.json());

// SQL Handler function
async function SQL_query_handler(query, params=[]) {
    try {
        // Create a connection to the database
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            connectTimeout: 1000  // 1 seconds

        });

        // Execute the query
        const [rows] = await connection.execute(query, params);

        // Close the connection
        await connection.end();

        // Return the query result
        return { success: true, data: rows };

    } catch (error) {
        // Handle any errors during the process
        console.error('Database query error:', error);
        return { success: false, error: error.message };
    }
}

// Server Status
app.get('/', async (req, res) => {res.status(200).json('true');});
app.get('/api/', async (req, res) => {res.status(200).json('true');});

// API verify user (PARAM username)
app.get('/api/verify', async (req, res) => {
    const result = await SQL_query_handler('SELECT User_ID, Password, Employee_ID, Auth_Level FROM hrms.user WHERE User_Name = ?', [req.query.username]);
    res.json({"success":result["success"], "data": result["data"][0]});// Send the result to the client
});

// API get_employee_info (PARAM employee_id)
app.get('/api/get_employee_info', async (req, res) => {
    const result = await SQL_query_handler("CALL GetEmployeeDetails(?)", [req.query.employee_id]);
    // Send the result to the client
    if (result["success"]){
        res.json({"success":result["success"], "data": result["data"][0]});
    } else {
        res.json(result["success"]);
    }
});

// API get_user_notifications (PARAM user_id)
app.get('/api/get_user_notifications', async (req, res) => {
    const result = await SQL_query_handler("CALL GetUserNotifications(?)", [req.query.user_id]);
    // Send the result to the client
    if (result["success"]){
        res.json({"success":result["success"], "data": result["data"][0]});
    } else {
        res.json({"success":result["success"]});
    }
});


// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});