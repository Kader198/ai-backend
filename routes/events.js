const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { eventValidation } = require('../validations');

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of events
 */
router.get('/', auth, eventController.getAll);

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
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
 *               - startDate
 *               - endDate
 *               - type
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               type:
 *                 type: string
 *                 enum: [meeting, deadline, reminder]
 *               location:
 *                 type: string
 *               attendees:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 */
router.post('/',  eventController.create);

router.get('/:id',  eventController.getById);
router.put('/:id',  eventController.update);
router.delete('/:id',  eventController.delete);

module.exports = router; 