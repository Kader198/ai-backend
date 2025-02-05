const { Comment } = require('../models');

const commentController = {
  async getByTaskId(req, res, next) {
    try {
      const comments = await Comment.findAll({
        where: { taskId: req.params.taskId },
        include: [
          { 
            model: User, 
            as: 'author',
            attributes: ['id', 'name', 'email'] 
          }
        ],
        order: [['createdAt', 'DESC']]
      });
      res.json(comments);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
    try {
      const comment = await Comment.create({
        ...req.body,
        userId: req.user.id
      });
      res.status(201).json(comment);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const comment = await Comment.findByPk(req.params.id);
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      
      // Only allow comment author to update
      if (comment.userId !== req.user.id) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      await comment.update({ content: req.body.content });
      res.json(comment);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const comment = await Comment.findByPk(req.params.id);
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }

      // Only allow comment author to delete
      if (comment.userId !== req.user.id) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      await comment.destroy();
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};

module.exports = commentController; 