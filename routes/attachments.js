const express = require('express');
const router = express.Router();
const attachmentController = require('../controllers/attachmentController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

/**
 * @swagger
 * /api/attachments/task/{taskId}:
 *   get:
 *     summary: Get all attachments for a task
 *     tags: [Attachments]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: List of attachments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                   name:
 *                     type: string
 *                   url:
 *                     type: string
 *                   type:
 *                     type: string
 *                   size:
 *                     type: number
 */
router.get('/task/:taskId', auth, attachmentController.getByTaskId);

/**
 * @swagger
 * /api/attachments:
 *   post:
 *     summary: Upload a new attachment
 *     tags: [Attachments]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *               - taskId
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               taskId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Attachment uploaded successfully
 *       400:
 *         description: Invalid input or file type
 */
router.post('/', auth, upload.single('file'), attachmentController.upload);

/**
 * @swagger
 * /api/attachments/{id}:
 *   delete:
 *     summary: Delete an attachment
 *     tags: [Attachments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Attachment deleted successfully
 *       404:
 *         description: Attachment not found
 */
router.delete('/:id', auth, attachmentController.delete);

module.exports = router; 