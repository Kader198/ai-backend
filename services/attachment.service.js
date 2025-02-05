const { Attachment, User } = require('../models');
const fs = require('fs').promises;
const path = require('path');

class AttachmentService {
  async getAttachmentsByTaskId(taskId) {
    return Attachment.findAll({
      where: { taskId },
      include: [
        { 
          model: User, 
          as: 'uploader',
          attributes: ['id', 'name', 'email'] 
        }
      ],
      order: [['createdAt', 'DESC']]
    });
  }

  async createAttachment(fileData, taskId, userId) {
    return Attachment.create({
      name: fileData.originalname,
      url: `/uploads/${fileData.filename}`,
      type: fileData.mimetype,
      size: fileData.size,
      taskId,
      uploadedBy: userId
    });
  }

  async deleteAttachment(id, userId) {
    const attachment = await Attachment.findByPk(id);
    if (!attachment) {
      throw new Error('Attachment not found');
    }

    if (attachment.uploadedBy !== userId) {
      throw new Error('Not authorized');
    }

    const filePath = path.join(__dirname, '..', attachment.url);
    await fs.unlink(filePath).catch(console.error);

    return attachment.destroy();
  }
}

module.exports = new AttachmentService(); 