const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.ENUM('todo', 'in-progress', 'in-review', 'completed'),
    defaultValue: 'todo'
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high'),
    defaultValue: 'medium'
  },
  dueDate: {
    type: DataTypes.DATE
  },
  assigneeId: {
    type: DataTypes.UUID,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  projectId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Projects',
      key: 'id'
    }
  },
  tags: {
    type: DataTypes.TEXT,
    defaultValue: '[]',
    get() {
      const rawValue = this.getDataValue('tags');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('tags', JSON.stringify(value));
    }
  }
});

// Define associations in a separate function
Task.associate = (models) => {
  Task.belongsTo(models.User, { 
    foreignKey: 'assigneeId', 
    as: 'assignee' 
  });
  Task.belongsTo(models.Project, { 
    foreignKey: 'projectId', 
    as: 'project' 
  });
  Task.hasMany(models.Comment, { 
    foreignKey: 'taskId', 
    as: 'comments' 
  });
  Task.hasMany(models.Attachment, { 
    foreignKey: 'taskId', 
    as: 'attachments' 
  });
};

module.exports = Task; 