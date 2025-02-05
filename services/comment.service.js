const { Comment, User } = require('../models');

class CommentService {
  async getCommentsByTaskId(taskId) {
    return Comment.findAll({
      where: { taskId },
      include: [
        { 
          model: User, 
          as: 'author',
          attributes: ['id', 'name', 'email'] 
        }
      ],
      order: [['createdAt', 'DESC']]
    });
  }

  async createComment(data, userId) {
    return Comment.create({
      ...data,
      userId
    });
  }

  async updateComment(id, content, userId) {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      throw new Error('Comment not found');
    }
    
    if (comment.userId !== userId) {
      throw new Error('Not authorized');
    }

    return comment.update({ content });
  }

  async deleteComment(id, userId) {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      throw new Error('Comment not found');
    }

    if (comment.userId !== userId) {
      throw new Error('Not authorized');
    }

    return comment.destroy();
  }
}

module.exports = new CommentService(); 