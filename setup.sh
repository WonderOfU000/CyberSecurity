#!/bin/bash

echo "🚀 Setting up Vulnerable Web Lab..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Installing..."
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt-get install -y nodejs
    echo "✅ Node.js installed successfully!"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Initialize database
echo "🔧 Setting up database..."
node scripts/init-db.js

echo "
✨ Setup complete! ✨

To start the server:
  node server.js

To access the application:
  1. Open http://localhost:3000 in your browser
  2. Click 'Login to Admin Panel' or go to http://localhost:3000/login
  3. Use any of these credentials:
     - alice / alice123
     - bob / password
     - admin / letmein

To stop the server:
  Press Ctrl+C in the terminal running the server

To reset the database:
  ./scripts/reset.sh (Linux/Mac)
  .\\scripts\\reset.ps1 (Windows)
"