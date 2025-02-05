const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  taskId: {
    type: DataTypes.UUID,
    references: {
      model: 'Tasks',
      key: 'id'
    }
  }
});

// Define associations
Comment.associate = (models) => {
  Comment.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'author'
  });
  Comment.belongsTo(models.Task, {
    foreignKey: 'taskId',
    as: 'task'
  });
};

module.exports = Comment; 