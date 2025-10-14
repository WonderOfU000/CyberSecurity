# ⚠️ IMPORTANT: DO NOT HOST PUBLICLY ⚠️

This web application is intentionally vulnerable and must NEVER be hosted publicly (including GitHub Pages)!

## Why?
- The application contains intentional security vulnerabilities
- It requires a running Node.js server and SQLite database
- It's designed for local testing and learning only

## Correct Way to Use:
1. Clone the repository:
   ```bash
   git clone https://github.com/WonderOfU000/CyberSecurity.git
   cd CyberSecurity
   ```

2. Install and run locally:
   ```bash
   # Install dependencies and setup
   ./setup.sh
   npm install
   
   # Initialize database
   node scripts/init-db.js
   
   # Start server (using PM2 for continuous operation)
   pm2 start server.js --name vuln-lab
   ```

3. Access locally at: http://localhost:3000

## Remember:
- Only run this on your local machine
- Never expose this to the internet
- Use only for learning purposes
- Keep the vulnerabilities private

## Available Test Accounts:
- Username: alice / Password: alice123
- Username: bob / Password: password
- Username: admin / Password: letmein