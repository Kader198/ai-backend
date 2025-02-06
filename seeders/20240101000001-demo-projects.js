'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const projects = [
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        name: 'E-commerce Platform',
        description: 'Online shopping platform development',
        status: 'active',
        start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        end_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        name: 'CRM System',
        description: 'Customer relationship management system',
        status: 'active',
        start_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        end_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440003',
        name: 'Mobile App',
        description: 'Cross-platform mobile application',
        status: 'active',
        start_date: now,
        end_date: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440004',
        name: 'Analytics Dashboard',
        description: 'Real-time analytics platform',
        status: 'active',
        start_date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
        end_date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440005',
        name: 'Content Management System',
        description: 'Enterprise CMS development',
        status: 'active',
        start_date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440006',
        name: 'Payment Gateway Integration',
        description: 'Payment processing system',
        status: 'completed',
        start_date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        end_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440007',
        name: 'API Gateway',
        description: 'Microservices API gateway',
        status: 'active',
        start_date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        end_date: new Date(Date.now() + 70 * 24 * 60 * 60 * 1000),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440008',
        name: 'Authentication Service',
        description: 'OAuth2 authentication service',
        status: 'active',
        start_date: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000),
        end_date: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440009',
        name: 'Search Engine',
        description: 'Enterprise search solution',
        status: 'on-hold',
        start_date: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000),
        end_date: new Date(Date.now() + 100 * 24 * 60 * 60 * 1000),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440010',
        name: 'Notification System',
        description: 'Real-time notification service',
        status: 'active',
        start_date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
        end_date: new Date(Date.now() + 65 * 24 * 60 * 60 * 1000),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440011',
        name: 'Data Migration Tool',
        description: 'Database migration utility',
        status: 'active',
        start_date: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
        end_date: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440012',
        name: 'Reporting Module',
        description: 'Business intelligence reports',
        status: 'active',
        start_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        end_date: new Date(Date.now() + 80 * 24 * 60 * 60 * 1000),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440013',
        name: 'Chatbot Integration',
        description: 'AI-powered customer support',
        status: 'cancelled',
        start_date: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000),
        end_date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440014',
        name: 'Document Management',
        description: 'Document storage and versioning',
        status: 'active',
        start_date: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000),
        end_date: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440015',
        name: 'Workflow Automation',
        description: 'Business process automation',
        status: 'active',
        start_date: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000),
        end_date: new Date(Date.now() + 55 * 24 * 60 * 60 * 1000),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440016',
        name: 'Calendar Integration',
        description: 'Scheduling and calendar sync',
        status: 'active',
        start_date: new Date(Date.now() - 65 * 24 * 60 * 60 * 1000),
        end_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440017',
        name: 'Mobile Backend',
        description: 'Backend services for mobile app',
        status: 'active',
        start_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        end_date: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440018',
        name: 'Data Visualization',
        description: 'Interactive data visualizations',
        status: 'active',
        start_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        end_date: new Date(Date.now() + 85 * 24 * 60 * 60 * 1000),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440019',
        name: 'User Activity Tracking',
        description: 'User behavior analytics',
        status: 'active',
        start_date: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000),
        end_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440020',
        name: 'Performance Monitoring',
        description: 'System performance tracking',
        status: 'active',
        start_date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
        end_date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        created_at: now,
        updated_at: now
      }
    ];

    await queryInterface.bulkInsert('Projects', projects, {
      timestamps: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Projects', null, {});
  }
}; 