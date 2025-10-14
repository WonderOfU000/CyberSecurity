# Remove database and logs
Remove-Item -Force lab.db -ErrorAction SilentlyContinue
Remove-Item -Force logs.txt -ErrorAction SilentlyContinue

# Reinitialize database
node scripts/init-db.js

Write-Host "Lab reset complete. Run 'npm start' to restart the server."