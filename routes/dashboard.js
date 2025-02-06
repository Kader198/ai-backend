const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * /api/dashboard/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalTasks:
 *                   type: number
 *                   description: Total number of tasks
 *                 teamMembers:
 *                   type: number
 *                   description: Total number of team members
 *                 hoursTracked:
 *                   type: number
 *                   description: Total hours tracked
 *                 activeProjects:
 *                   type: number
 *                   description: Number of active projects
 *                 tasksByStatus:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       status:
 *                         type: string
 *                         enum: [todo, in-progress, in-review, completed]
 *                       count:
 *                         type: number
 *                 projectProgress:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       project:
 *                         type: string
 *                       progress:
 *                         type: number
 *                         minimum: 0
 *                         maximum: 100
 *                 recentActivity:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                       type:
 *                         type: string
 *                         enum: [task, project]
 *                       user:
 *                         type: string
 *                       action:
 *                         type: string
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server Error
 */
router.get('/stats', auth, dashboardController.getStats);

router.post('/logout', dashboardController.logout);

module.exports = router; 