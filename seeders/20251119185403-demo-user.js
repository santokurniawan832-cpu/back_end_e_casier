'use strict';
// memanggil fungsi bcrpty untuk enkripsi password
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     return queryInterface.bulkInsert('users', [
      {
        name: 'John',
        email: 'example@example.com',
        password: await bcrypt.hash('password', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
