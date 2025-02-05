const { Project, User, Task, Team } = require('../models');

class ProjectService {
  async createProject(projectData) {
    return Project.create(projectData);
  }

  async getAllProjects(filters = {}) {
    return Project.findAll({
      where: filters,
      include: [
        { model: User, as: 'members', attributes: ['id', 'name', 'email'] },
        { model: Task, as: 'tasks' },
        { model: Team, as: 'team' }
      ]
    });
  }

  async getProjectById(id) {
    return Project.findByPk(id, {
      include: [
        { model: User, as: 'members', attributes: ['id', 'name', 'email'] },
        { model: Task, as: 'tasks' },
        { model: Team, as: 'team' }
      ]
    });
  }

  async updateProject(id, updateData) {
    const project = await Project.findByPk(id);
    if (!project) {
      throw new Error('Project not found');
    }
    return project.update(updateData);
  }

  async deleteProject(id) {
    const project = await Project.findByPk(id);
    if (!project) {
      throw new Error('Project not found');
    }
    return project.destroy();
  }
}

module.exports = new ProjectService(); 