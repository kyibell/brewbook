'use strict';
import { QueryTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {

  const user = await queryInterface.Sequelize.query(
    'SELECT user_id FROM "Users";',
    { type: QueryTypes.SELECT, 
    });

    await queryInterface.bulkInsert('Coffee_Recipes', [{
        name: 'Iced Vanilla Latte',
        ingredients: 'Torani Vanilla Syrup, 2 shots of espresso, milk, ice',
        instructions: '1.) Brew Espresso Shots\n 2.) Pour vanilla syrup into espresso shots and mix together. \n 3.) Pour amount of milk of choice into espresso shots \n 4.) Add ice to preference. ',
        imageUrl: null, // temp, waiting until I find a proper image to test
        coffeeTags: ['Vanilla', 'Latte', 'Quick & Easy'],
        servings: 1,
        prepTime: 5,
        rating: 0,
        author_id: user[0].user_id,
        createdAt: new Date(),
        updatedAt: new Date()
    }
  ])
};

export async function down(queryInterface, Sequelize) {
  
  return queryInterface.bulkDelete('Coffee_Recipes', null, {});
};
