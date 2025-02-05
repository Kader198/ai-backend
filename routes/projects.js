const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { projectValidation } = require('../validations');

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of projects
 *       401:
 *         description: Unauthorized
 */
router.get('/', auth, projectController.getAll);

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [active, completed, on-hold]
 *     responses:
 *       201:
 *         description: Project created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', auth, validate(projectValidation.createProject), projectController.create);

router.get('/:id', auth, projectController.getById);
router.put('/:id', auth, validate(projectValidation.updateProject), projectController.update);
router.delete('/:id', auth, projectController.delete);

module.exports = router; 