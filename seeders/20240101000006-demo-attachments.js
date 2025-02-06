'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    
    await queryInterface.bulkInsert('Attachments', [
      {
        id: '550e8400-e29b-41d4-a716-446655440012',
        name: 'setup-guide.pdf',
        url: '/uploads/setup-guide.pdf',
        type: 'application/pdf',
        size: 1024 * 1024,
        created_at: now,
        updated_at: now
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440013',
        name: 'feature-spec.docx',
        url: '/uploads/feature-spec.docx',
        type: 'application/msword',
        size: 512 * 1024,
        created_at: now,
        updated_at: now
      }
    ], {
      timestamps: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Attachments', null, {});
  }
}; 