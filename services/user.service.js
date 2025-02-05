const { User, Task, Project, Team } = require('../models');

class UserService {
  async getAllUsers(filters = {}) {
    return User.findAll({
      where: filters,
      attributes: { exclude: ['password'] },
      include: [
        { model: Task, as: 'assignedTasks' },
        { model: Project, as: 'projects' },
        { model: Team, as: 'teams' }
      ]
    });
  }

  async getUserById(id) {
    return User.findByPk(id, {
      attributes: { exclude: ['password'] },
      include: [
        { model: Task, as: 'assignedTasks' },
        { model: Project, as: 'projects' },
        { model: Team, as: 'teams' }
      ]
    });
  }

  async updateUser(id, updateData) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }

    // If password is being updated, hash it
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    return user.update(updateData);
  }

  async deleteUser(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user.destroy();
  }
}

module.exports = new UserService(); 