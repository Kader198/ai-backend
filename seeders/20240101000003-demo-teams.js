'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const teams = [
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        name: 'Frontend Development',
        description: 'Core frontend development team',
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        name: 'Backend Development',
        description: 'Core backend development team',
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440003',
        name: 'UI/UX Design',
        description: 'User interface and experience design team',
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440004',
        name: 'Quality Assurance',
        description: 'Testing and quality assurance team',
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440005',
        name: 'DevOps',
        description: 'Infrastructure and deployment team',
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440006',
        name: 'Security',
        description: 'Application security team',
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440007',
        name: 'Data Science',
        description: 'Data analysis and machine learning team',
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440008',
        name: 'Mobile Development',
        description: 'Mobile app development team',
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440009',
        name: 'Product Management',
        description: 'Product strategy and management team',
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440010',
        name: 'Customer Support',
        description: 'Technical support and customer service team',
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440011',
        name: 'Documentation',
        description: 'Technical documentation team',
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440012',
        name: 'API Integration',
        description: 'API development and integration team',
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440013',
        name: 'Database Administration',
        description: 'Database management and optimization team',
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440014',
        name: 'Cloud Infrastructure',
        description: 'Cloud services and infrastructure team',
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440015',
        name: 'Performance Optimization',
        description: 'Application performance team',
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440016',
        name: 'Automation',
        description: 'Test automation and CI/CD team',
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440017',
        name: 'Research & Development',
        description: 'Innovation and research team',
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440018',
        name: 'Content Management',
        description: 'Content strategy and management team',
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440019',
        name: 'Analytics',
        description: 'Business analytics and reporting team',
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440020',
        name: 'Architecture',
        description: 'System architecture and design team',
        created_at: now,
        updated_at: now
      }
    ];

    await queryInterface.bulkInsert('Teams', teams, {
      timestamps: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Teams', null, {});
  }
}; 