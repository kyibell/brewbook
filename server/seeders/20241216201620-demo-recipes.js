'use strict';
import { QueryTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {

  const users = await queryInterface.sequelize.query(
    'SELECT user_id FROM "User";',
    { type: QueryTypes.SELECT, 
    }); // Get the Foreign ID (User ID) from selection query

    await queryInterface.bulkInsert('Coffee_Recipes', [{
        name: 'Iced Vanilla Latte',
        ingredients: 'Torani Vanilla Syrup, 2 shots of espresso, milk, ice',
        instructions: '1.) Brew Espresso Shots\n 2.) Pour vanilla syrup into espresso shots and mix together. \n 3.) Pour amount of milk of choice into espresso shots \n 4.) Add ice to preference. ',
        imageUrl: null, // temp, waiting until I find a proper image to test
        coffeeTags: ['Vanilla', 'Latte', 'Quick & Easy'],
        servings: 1,
        prepTime: 5,
        rating: 0,
        author_id: users[0].user_id, // Dynamically call the user id for the recipe
        createdAt: new Date(),
        updatedAt: new Date()
    }
  ])
};

export async function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete('Coffee_Recipes', null, {});
}; 
