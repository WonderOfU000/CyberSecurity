#!/bin/bash
echo "Resetting lab environment..."

# Remove database and logs
rm -f lab.db logs.txt

# Reinitialize database
node scripts/init-db.js

echo "Lab reset complete. Run 'npm start' to restart the server."