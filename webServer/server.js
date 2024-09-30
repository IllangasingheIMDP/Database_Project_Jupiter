require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const path = require('path');
const http = require('http');
const app = express();
const bcrypt = require('bcrypt');

// Load environment variables from .env file
const HOST = process.env.HOST
const PORT = process.env.PORT;
const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT

const SECRET_KEY = process.env.SECRET_KEY
const TokenExpireTime = "15m";
const saltRounds = 10;

app.use(express.json());
app.use(express.static('public')); // Serve static files
app.use(cookieParser());

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/dist')));

function fetchDataFromServer(url) {
    return new Promise((resolve, reject) => {
      http.get(`http://${DB_HOST}:${DB_PORT}/${url}`, (res) => {
        let data = '';
  
        // Receive data in chunks
        res.on('data', (chunk) => {
          data += chunk;
        });
  
        // When the entire response is received
        res.on('end', () => {
          try {
            const parsedData = JSON.parse(data); // Parse JSON data
            resolve(parsedData); // Resolve the promise with the parsed data
          } catch (error) {
            reject(`Error parsing JSON: ${error.message}`);
          }
        });
      }).on('error', (error) => {
        reject(`Error fetching data: ${error.message}`);
      });
    });
}


// Hashing the password before storing it
async function hashPassword(plainPassword) {
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
}
// Verifying the password during login
async function verifyPassword(plainPassword, hashedPassword) {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
        console.error('Error comparing passwords:', error);
        return false;
    }
}


// Login route (POST)
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Check the user (this would be a DB query in a real app)
    const user = await fetchDataFromServer(`api/verify?username=${username}`);
    if (user.data && await verifyPassword(password, user.data.Password)) {
            // Create a JWT
            const token = jwt.sign({User_ID: user.data.User_ID, UserName: username, Employee_ID:user.data.Employee_ID, Auth_Level:user.data.Auth_Level}, SECRET_KEY, {expiresIn: TokenExpireTime});
            // Set the cookie with JWT
            res.cookie('token', token, {httpOnly: true, maxAge: 15 * 60 * 1000});
            _navigate = null;
            switch (user.data.Auth_Level) {
                case "Admin User": _navigate = "/admin-home"; break;
                case "HR Manager": _navigate = "/hr1-home"; break;
                case "Second Manager": _navigate = "/hr2-home"; break;
                case "Employee": _navigate = "/emp-home"; break;
                default: _navigate = null; break;
            }
            return res.status(200).json({ success: true, message: 'Logged in successfully', navigate:_navigate });
    }
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// Middleware to authenticate token
function authenticateToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        // If no token, redirect to login page
        return res.redirect('/');
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                // If token is expired, clear the cookie and redirect to login
                res.clearCookie('token');
                return res.status(200).json({ success: false, message: 'Token Expired' });
            }
            // For other errors, you can also handle differently if needed
            return res.redirect('/');
        }

        // If the token is valid, refresh it if it's about to expire
        const timeRemaining = user.exp * 1000 - Date.now();
        if (timeRemaining < 5 * 60 * 1000) {
            // If less than 5 minutes remain, issue a new token
            const newToken = jwt.sign({User_ID: user.User_ID, UserName: user.UserName, Employee_ID:user.Employee_ID, Auth_Level:user.Auth_Level}, SECRET_KEY, {expiresIn: TokenExpireTime});
            res.cookie('token', newToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });
        }

        // Attach the user object to the request for further use
        req.user = user;
        next(); // Proceed to the next middleware
    });
}

// Middleware to authorize pages
function authorizeRole(allowedRoles) {
    return (req, res, next) => {
        if (allowedRoles.includes(req.user.Auth_Level)) {
            next(); // User has permission, proceed to the next middleware/route handler
        } else {
            res.status(401).sendFile(path.join(__dirname, '/client/public', '401.html')); // Unauthorized
        }
    };
}

// Logout (POST)
app.post('/logout', (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logged out successfully' });
});

 // TEMPORY FUNCTION
async function run() {
    const hashed = await hashPassword('password123');
    console.log(hashed); 
}

app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //
//                                                                              PAGES                                                                                        //
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- //

// Login page
app.get('/', (req, res) => {
    const token = req.cookies.token;  // Get the token from cookies

    if (token) {
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                // If token is invalid or expired, show login page
                res.sendFile(path.join(__dirname , '/client/dist', 'index.html'));
            }
        });
    } else {
        // If no token, show the login page
        res.sendFile(path.join(__dirname , '/client/dist', 'index.html'));
    }
});


// Admin home
app.get('/admin-home', authenticateToken, authorizeRole('Admin User'), (req, res) => {
    res.sendFile(path.join(__dirname , '/client/dist', 'index.html'));
});

// HR Manager home
app.get('/hr1-home', authenticateToken, authorizeRole('HR Manager'), (req, res) => {
    res.sendFile(path.join(__dirname , '/client/dist', 'index.html'));
});

// Second Manager home
app.get('/hr2-home', authenticateToken, authorizeRole('Second Manager'), (req, res) => {
    res.sendFile(path.join(__dirname , '/client/dist', 'index.html'));
});

// Employee
app.get('/emp-home', authenticateToken, authorizeRole('Employee'), (req, res) => {
    res.sendFile(path.join(__dirname , '/client/dist', 'index.html'));
});


// Catchall handler: for any request that doesn’t match one above, send back 404.html
app.get('*', authenticateToken, (req, res) => {
    res.status(404).sendFile(path.join(__dirname , '/client/public', '404.html'));
});