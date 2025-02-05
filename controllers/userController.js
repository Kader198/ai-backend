const userService = require('../services/user.service');

const userController = {
  async getAll(req, res, next) {
    try {
      const users = await userService.getAllUsers(req.query);
      res.json(users);
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      // Remove password from response
      const { password, ...userWithoutPassword } = user.toJSON();
      res.json(userWithoutPassword);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      await userService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};

module.exports = userController; 