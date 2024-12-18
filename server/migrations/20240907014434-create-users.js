'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('User', {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validator: {
        isEmail: true
      },
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    profile_picture_url: {
      type: Sequelize.STRING,
      allowNull: true // Optional
    },
    bio: {
      type: Sequelize.TEXT,
      allowNull: true // Optional
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('User');
}