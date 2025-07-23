// models/File.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const File = sequelize.define('File', {
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  originalName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mimetype: {
    type: DataTypes.STRING,
  },
  path: {
    type: DataTypes.STRING,
  },
});

// Relation: File belongs to User
File.belongsTo(User);
User.hasMany(File);

module.exports = File;
