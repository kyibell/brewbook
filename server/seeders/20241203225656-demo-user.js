'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
      username: 'John Doe',
      email: 'JohnDoe@gmail.com',
      password: '1234', // temp, do bcrypt here
      profile_picture_url: null, // set null for now, until find image
      bio: null, // set null until I set a short bio for the user
      createdAt: new Date()

      },
  ]);
};

export async function down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
};
