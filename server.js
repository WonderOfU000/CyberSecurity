const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Logging middleware
app.use((req, res, next) => {
    const log = `${new Date().toISOString()} ${req.method} ${req.url}\n`;
    fs.appendFileSync('logs.txt', log);
    next();
});

// Database connection
const db = new sqlite3.Database('lab.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Vulnerable login endpoint - intentionally uses string concatenation for SQL
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // WARNING: This is intentionally vulnerable to SQL injection
    const query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
    
    db.get(query, (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        
        if (row) {
            res.sendFile(path.join(__dirname, 'public', 'admin.html'));
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});

app.get('/admin', (req, res) => {
    // Note: No real authentication check here
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Start server
app.listen(port, 'localhost', () => {
    console.log(`Vulnerable lab running at http://localhost:${port}`);
    console.log('WARNING: This is an intentionally vulnerable application. Run locally only!');
});