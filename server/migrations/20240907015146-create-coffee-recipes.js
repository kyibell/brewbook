'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('Coffee_Recipes', {
    recipe_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    ingredients: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    instructions: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: true
    },
    coffeeTags: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true
    },
    servings: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    prepTime: {
      type: Sequelize.INTEGER,
    },
    rating: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    author_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'user_id'
      }
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('Coffee_Recipes');
}