'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Ratings', {
    rating_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    rating: {
      type: Sequelize.FLOAT,
      allowNull: true,
      validator: {
        min: 0.0,
        max: 5.0
      }
    },
    user_id: {
      type: Sequelize.INTEGER,
      refernces: {
        model: 'User',
        key: 'user_id'
      },
      onDelete: 'CASCADE'
    },
    recipe_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Coffee_Recipes',
        key: 'recipe_id'
      },
      onDelete: 'CASCADE'
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Ratings');
}