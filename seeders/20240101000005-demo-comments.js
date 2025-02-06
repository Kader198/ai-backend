'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    
    await queryInterface.bulkInsert('Comments', [
      {
        id: '550e8400-e29b-41d4-a716-446655440010',
        content: 'Initial setup completed',
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440011',
        content: 'Started working on features',
        created_at: now,
        updated_at: now
      }
    ], {
      timestamps: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {});
  }
}; 