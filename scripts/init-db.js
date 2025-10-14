const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Remove existing database if it exists
if (fs.existsSync('lab.db')) {
    fs.unlinkSync('lab.db');
}

// Create new database
const db = new sqlite3.Database('lab.db', (err) => {
    if (err) {
        console.error('Error creating database:', err);
        process.exit(1);
    }
    console.log('Created new database');
});

// Create users table and insert demo users
db.serialize(() => {
    db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )`, (err) => {
        if (err) {
            console.error('Error creating table:', err);
            process.exit(1);
        }
    });

    // Insert demo users
    const users = [
        ['alice', 'alice123'],
        ['bob', 'password'],
        ['admin', 'letmein']
    ];

    const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
    users.forEach(user => {
        stmt.run(user, (err) => {
            if (err) console.error('Error inserting user:', err);
        });
    });
    stmt.finalize();

    console.log('Database initialized with demo users');
});

db.close();