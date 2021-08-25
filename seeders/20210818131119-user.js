"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          first_name: "User",
          last_name: "user",
          email: "user@mawingunetworks.com",
          phone_number: "+254700000111",
          department_id: 1,
          createdAt: "2021-03-29T10:08:26.838",
          updatedAt: "2021-03-29T10:08:26.838",
          password:
            "$2a$12$kaBRf5leMRHFj5q.g6dE5ONSLTbdBepaYUEfCAkxP/ICNKgl1BQMe",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
