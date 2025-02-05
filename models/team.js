const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Team = sequelize.define('Team', {
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
    type: DataTypes.TEXT,
    allowNull: true
  }
});

// Define associations
Team.associate = (models) => {
  Team.belongsToMany(models.User, {
    through: 'TeamMembers',
    as: 'members',
    foreignKey: 'teamId'
  });
  Team.hasMany(models.Project, {
    foreignKey: 'teamId',
    as: 'projects'
  });
};

module.exports = Team; 