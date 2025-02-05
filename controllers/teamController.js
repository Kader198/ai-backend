const teamService = require('../services/team.service');

const teamController = {
  async create(req, res, next) {
    try {
      const team = await teamService.createTeam(req.body);
      res.status(201).json(team);
    } catch (error) {
      next(error);
    }
  },

  async getAll(req, res, next) {
    try {
      const teams = await teamService.getAllTeams(req.query);
      res.json(teams);
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const team = await teamService.getTeamById(req.params.id);
      if (!team) {
        return res.status(404).json({ error: 'Team not found' });
      }
      res.json(team);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const team = await teamService.updateTeam(req.params.id, req.body);
      res.json(team);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      await teamService.deleteTeam(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  async addMember(req, res, next) {
    try {
      const team = await teamService.addMember(req.params.id, req.body.userId);
      res.json(team);
    } catch (error) {
      next(error);
    }
  },

  async removeMember(req, res, next) {
    try {
      const team = await teamService.removeMember(req.params.id, req.params.userId);
      res.json(team);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = teamController; 