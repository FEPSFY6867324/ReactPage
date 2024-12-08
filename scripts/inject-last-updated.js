const fs = require('fs');
const path = require('path');

const appJsPath = path.resolve(__dirname, '../src/App.js');
const envFilePath = path.resolve(__dirname, '../.env.local');

// Get the last modified time of App.js
const lastUpdated = fs.statSync(appJsPath).mtime.toISOString();

// Write the LAST_UPDATED environment variable to .env.local
fs.writeFileSync(envFilePath, `REACT_APP_LAST_UPDATED=${lastUpdated}\n`, { flag: 'w' });

console.log(`Last updated timestamp injected: ${lastUpdated}`);