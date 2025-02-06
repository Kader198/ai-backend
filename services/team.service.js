const { Team, User, Project } = require('../models');
const { Op } = require('sequelize');

class TeamService {
  async createTeam(teamData) {
    const team = await Team.create(teamData);
    if (teamData.members) {
      await team.setMembers(teamData.members);
    }
    return team;
  }

  async getAllTeams({ page = 1, pageSize = 10, search, filters = {} }) {
    try {
      let whereClause = { ...filters };

      // Add search functionality
      if (search) {
        whereClause = {
          ...whereClause,
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { description: { [Op.like]: `%${search}%` } }
          ]
        };
      }

      // Get total count for pagination
      const total = await Team.count({ where: whereClause });

      // Get paginated teams
      const teams = await Team.findAll({
        where: whereClause,
        include: [
          { 
            model: User, 
            as: 'members',
            attributes: ['id', 'name', 'email'],
            through: { attributes: [] }
          },
          { 
            model: Project, 
            as: 'projects',
            attributes: ['id', 'name', 'status']
          }
        ],
        order: [['createdAt', 'DESC']],
        limit: pageSize,
        offset: (page - 1) * pageSize
      });

      return {
        data: teams,
        total
      };
    } catch (error) {
      throw error;
    }
  }

  async getTeamById(id) {
    return Team.findByPk(id, {
      include: [
        { 
          model: User, 
          as: 'members',
          attributes: ['id', 'name', 'email'],
          through: { attributes: [] }
        },
        { 
          model: Project, 
          as: 'projects',
          attributes: ['id', 'name', 'status']
        }
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