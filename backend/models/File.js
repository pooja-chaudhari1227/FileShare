const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

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
}, {
  timestamps: true,
});

File.associate = (models) => {
  File.belongsTo(models.User, {
    foreignKey: 'UserId',
    as: 'uploadedBy',
  });
};

module.exports = File;