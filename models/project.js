const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.ENUM('active', 'completed', 'on-hold'),
    defaultValue: 'active'
  },
  progress: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 100
    }
  },
  startDate: {
    type: DataTypes.DATE
  },
  endDate: {
    type: DataTypes.DATE
  }
});

// Define associations
Project.associate = (models) => {
  Project.belongsToMany(models.User, {
    through: 'ProjectMembers',
    as: 'members'
  });
  Project.hasMany(models.Task, {
    foreignKey: 'projectId',
    as: 'tasks'
  });
  Project.belongsTo(models.Team, {
    foreignKey: 'teamId',
    as: 'team'
  });
};

module.exports = Project; 