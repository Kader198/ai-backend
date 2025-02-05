const { Attachment } = require('../models');
const fs = require('fs').promises;
const path = require('path');

const attachmentController = {
  async getByTaskId(req, res, next) {
    try {
      const attachments = await Attachment.findAll({
        where: { taskId: req.params.taskId },
        include: [
          { 
            model: User, 
            as: 'uploader',
            attributes: ['id', 'name', 'email'] 
          }
        ],
        order: [['createdAt', 'DESC']]
      });
      res.json(attachments);
    } catch (error) {
      next(error);
    }
  },

  async upload(req, res, next) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const attachment = await Attachment.create({
        name: req.file.originalname,
        url: `/uploads/${req.file.filename}`,
        type: req.file.mimetype,
        size: req.file.size,
        taskId: req.body.taskId,
        uploadedBy: req.user.id
      });

      res.status(201).json(attachment);
    } catch (error) {
      // Delete uploaded file if database operation fails
      if (req.file) {
        await fs.unlink(req.file.path).catch(console.error);
      }
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const attachment = await Attachment.findByPk(req.params.id);
      if (!attachment) {
        return res.status(404).json({ error: 'Attachment not found' });
      }

      // Only allow uploader to delete
      if (attachment.uploadedBy !== req.user.id) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      // Delete file from filesystem
      const filePath = path.join(__dirname, '..', attachment.url);
      await fs.unlink(filePath).catch(console.error);

      await attachment.destroy();
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};

module.exports = attachmentController; 