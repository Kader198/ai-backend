const { Team, User, Project } = require('../models');

class TeamService {
  async createTeam(teamData) {
    const team = await Team.create(teamData);
    if (teamData.members) {
      await team.setMembers(teamData.members);
    }
    return team;
  }

  async getAllTeams(filters = {}) {
    return Team.findAll({
      where: filters,
      include: [
        { model: User, as: 'members', attributes: ['id', 'name', 'email'] },
        { model: Project, as: 'projects' }
      ]
    });
  }

  async getTeamById(id) {
    return Team.findByPk(id, {
      include: [
        { model: User, as: 'members', attributes: ['id', 'name', 'email'] },
        { model: Project, as: 'projects' }
      ]
    });
  }

  async updateTeam(id, updateData) {
    const team = await Team.findByPk(id);
    if (!team) {
      throw new Error('Team not found');
    }

    if (updateData.members) {
      await team.setMembers(updateData.members);
      delete updateData.members;
    }

    return team.update(updateData);
  }

  async deleteTeam(id) {
    const team = await Team.findByPk(id);
    if (!team) {
      throw new Error('Team not found');
    }
    return team.destroy();
  }

  async addMember(teamId, userId) {
    const team = await Team.findByPk(teamId);
    if (!team) {
      throw new Error('Team not found');
    }
    await team.addMember(userId);
    return team;
  }

  async removeMember(teamId, userId) {
    const team = await Team.findByPk(teamId);
    if (!team) {
      throw new Error('Team not found');
    }
    await team.removeMember(userId);
    return team;
  }
}

module.exports = new TeamService(); 