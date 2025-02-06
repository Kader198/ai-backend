'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    
    await queryInterface.bulkInsert('Events', [
      {
        id: '550e8400-e29b-41d4-a716-446655440008',
        title: 'Sprint Planning',
        description: 'Plan next sprint tasks and goals',
        start_date: now,
        end_date: new Date(Date.now() + 2 * 60 * 60 * 1000),
        type: 'meeting',
        location: 'Conference Room A',
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440009',
        title: 'Project Deadline',
        description: 'Project Alpha completion deadline',
        start_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        type: 'deadline',
        location: null,
        created_at: now,
        updated_at: now
      }
    ], {
      timestamps: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Events', null, {});
  }
}; 