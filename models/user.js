const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    defaultValue: 'user'
  }
}, {
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

User.prototype.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Define associations
User.associate = (models) => {
  User.hasMany(models.Task, { 
    foreignKey: 'assigneeId', 
    as: 'assignedTasks' 
  });
  User.belongsToMany(models.Project, { 
    through: 'ProjectMembers', 
    as: 'projects',
    foreignKey: 'userId'
  });
  User.belongsToMany(models.Team, { 
    through: 'TeamMembers', 
    as: 'teams',
    foreignKey: 'userId'
  });
  User.hasMany(models.Comment, { 
    foreignKey: 'userId',
    as: 'comments' 
  });
  User.belongsToMany(models.Event, { 
    through: 'EventAttendees', 
    as: 'events',
    foreignKey: 'userId'
  });
  User.hasMany(models.Event, {
    foreignKey: 'createdBy',
    as: 'createdEvents'
  });
};

module.exports = User; 