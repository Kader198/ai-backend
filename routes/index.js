const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const taskRoutes = require('./tasks');
const projectRoutes = require('./projects');
const userRoutes = require('./users');
const eventRoutes = require('./events');
const teamRoutes = require('./teams');
const commentRoutes = require('./comments');
const attachmentRoutes = require('./attachments');

router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);
router.use('/projects', projectRoutes);
router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/teams', teamRoutes);
router.use('/comments', commentRoutes);
router.use('/attachments', attachmentRoutes);

module.exports = router; 