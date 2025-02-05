const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { taskValidation } = require('../validations');

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 *       401:
 *         description: Unauthorized
 */
router.get('/', auth, taskController.getAll);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [todo, in-progress, in-review, completed]
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', auth, validate(taskValidation.createTask), taskController.create);

router.use(auth); // Protect all task routes

router.get('/:id', taskController.getById);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.delete);

module.exports = router; 