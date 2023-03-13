'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('blog', [
      {
        key: 1,
        title: 'Title Blog',
        author: 'Author Blog',
        content: 'This is Blog Content',
        created_at: new Date(),
        updated_at: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('blog', { key: 1 });
  }
};
