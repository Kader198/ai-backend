'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const tasks = [
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        title: 'Setup Development Environment',
        description: 'Install and configure development tools',
        status: 'completed',
        priority: 'high',
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        tags: JSON.stringify(['setup', 'infrastructure']),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        title: 'Database Design',
        description: 'Create database schema and relationships',
        status: 'in-progress',
        priority: 'high',
        due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        tags: JSON.stringify(['database', 'design']),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440003',
        title: 'User Authentication System',
        description: 'Implement JWT authentication',
        status: 'todo',
        priority: 'high',
        due_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        tags: JSON.stringify(['security', 'auth']),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440004',
        title: 'API Documentation',
        description: 'Create Swagger documentation',
        status: 'todo',
        priority: 'medium',
        due_date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
        tags: JSON.stringify(['documentation', 'api']),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440005',
        title: 'Frontend Integration',
        description: 'Connect frontend with backend APIs',
        status: 'todo',
        priority: 'medium',
        due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        tags: JSON.stringify(['frontend', 'integration']),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440006',
        title: 'Unit Testing',
        description: 'Write unit tests for core functionality',
        status: 'todo',
        priority: 'high',
        due_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        tags: JSON.stringify(['testing', 'quality']),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440007',
        title: 'Performance Optimization',
        description: 'Optimize database queries and API responses',
        status: 'todo',
        priority: 'medium',
        due_date: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
        tags: JSON.stringify(['performance', 'optimization']),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440008',
        title: 'Security Audit',
        description: 'Conduct security assessment',
        status: 'todo',
        priority: 'high',
        due_date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        tags: JSON.stringify(['security', 'audit']),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440009',
        title: 'UI Design Implementation',
        description: 'Implement new UI design',
        status: 'in-progress',
        priority: 'medium',
        due_date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
        tags: JSON.stringify(['ui', 'design']),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440010',
        title: 'Mobile Responsiveness',
        description: 'Ensure mobile compatibility',
        status: 'todo',
        priority: 'high',
        due_date: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
        tags: JSON.stringify(['mobile', 'responsive']),
        created_at: now,
        updated_at: now
      },
      // Additional 10 tasks...
      {
        id: '550e8400-e29b-41d4-a716-446655440011',
        title: 'Email Notification System',
        description: 'Implement email notifications',
        status: 'todo',
        priority: 'medium',
        due_date: new Date(Date.now() + 22 * 24 * 60 * 60 * 1000),
        tags: JSON.stringify(['email', 'notifications']),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440012',
        title: 'File Upload Feature',
        description: 'Add file upload functionality',
        status: 'in-progress',
        priority: 'high',
        due_date: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000),
        tags: JSON.stringify(['upload', 'files']),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440013',
        title: 'User Dashboard',
        description: 'Create user dashboard interface',
        status: 'todo',
        priority: 'high',
        due_date: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000),
        tags: JSON.stringify(['dashboard', 'ui']),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440014',
        title: 'Data Export Feature',
        description: 'Add data export functionality',
        status: 'todo',
        priority: 'medium',
        due_date: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
        tags: JSON.stringify(['export', 'data']),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440015',
        title: 'Search Functionality',
        description: 'Implement search feature',
        status: 'todo',
        priority: 'high',
        due_date: new Date(Date.now() + 24 * 24 * 60 * 60 * 1000),
        tags: JSON.stringify(['search', 'feature']),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440016',
        title: 'Error Logging System',
        description: 'Set up error logging and monitoring',
        status: 'in-progress',
        priority: 'medium',
        due_date: new Date(Date.now() + 19 * 24 * 60 * 60 * 1000),
        tags: JSON.stringify(['logging', 'monitoring']),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440017',
        title: 'User Settings Page',
        description: 'Create user settings interface',
        status: 'todo',
        priority: 'medium',
        due_date: new Date(Date.now() + 26 * 24 * 60 * 60 * 1000),
        tags: JSON.stringify(['settings', 'ui']),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440018',
        title: 'API Rate Limiting',
        description: 'Implement API rate limiting',
        status: 'todo',
        priority: 'high',
        due_date: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000),
        tags: JSON.stringify(['api', 'security']),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440019',
        title: 'Data Backup System',
        description: 'Set up automated data backups',
        status: 'todo',
        priority: 'high',
        due_date: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000),
        tags: JSON.stringify(['backup', 'data']),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440020',
        title: 'Analytics Dashboard',
        description: 'Create analytics dashboard',
        status: 'todo',
        priority: 'medium',
        due_date: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
        tags: JSON.stringify(['analytics', 'dashboard']),
        created_at: now,
        updated_at: now
      }
    ];

    await queryInterface.bulkInsert('Tasks', tasks, {
      timestamps: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
  }
}; 