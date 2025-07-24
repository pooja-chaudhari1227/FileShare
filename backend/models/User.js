const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.associate = (models) => {
  User.hasMany(models.File, {
    foreignKey: 'UserId',
    as: 'files',
  });
};

module.exports = User;