'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('Roles', [
      {
        name: 'admin',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'teacher',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'student',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'parent',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'guest',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'customer',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
