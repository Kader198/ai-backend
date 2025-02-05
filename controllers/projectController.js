const projectService = require('../services/project.service');

const projectController = {
  async create(req, res, next) {
    try {
      const project = await projectService.createProject(req.body);
      res.status(201).json(project);
    } catch (error) {
      next(error);
    }
  },

  async getAll(req, res, next) {
    try {
      const projects = await projectService.getAllProjects(req.query);
      res.json(projects);
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const project = await projectService.getProjectById(req.params.id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.json(project);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const project = await projectService.updateProject(req.params.id, req.body);
      res.json(project);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      await projectService.deleteProject(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};

module.exports = projectController; 