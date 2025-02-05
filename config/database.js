const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const dbPath = path.join(__dirname, '../database.sqlite');

// Ensure the database directory has write permissions
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true, mode: 0o755 });
}

// If database exists, ensure it has write permissions
if (fs.existsSync(dbPath)) {
  fs.chmodSync(dbPath, 0o666);
}

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    timestamps: true,
    underscored: true
  },
  // Add SQLite-specific options
  dialectOptions: {
    // Enable foreign keys support
    foreignKeys: true
  }
});

// Remove the auto-authenticate to avoid double connection attempts
module.exports = sequelize; 