const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Attachment = sequelize.define('Attachment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING
  },
  size: {
    type: DataTypes.INTEGER
  },
  taskId: {
    type: DataTypes.UUID,
    references: {
      model: 'Tasks',
      key: 'id'
    }
  },
  uploadedBy: {
    type: DataTypes.UUID,
    references: {
      model: 'Users',
      key: 'id'
    }
  }
});

module.exports = Attachment; 