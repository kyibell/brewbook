'use strict';
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('User', [
      {
      username: 'John Doe',
      email: 'JohnDoe@demo.com',
      password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)), // temp, do bcrypt here
      profile_picture_url: null, // set null for now, until find image
      bio: null, // set null until I set a short bio for the user
      createdAt: new Date() // make a date timestamp for profile creation
      }, {
        username: 'Jane Doe',
        email: 'JaneDoe@demo.com',
        password: bcrypt.hashSync('password', bcrypt.genSaltSync(10)),
        profile_picture_url: null, // null for now until I find image
        bio: null,
        createdAt: new Date()
      }
  ]);
};

export async function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete('User', null, {});
};
