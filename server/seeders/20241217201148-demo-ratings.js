'use strict';
import { QueryTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  const recipes = await queryInterface.sequelize.query(
    'SELECT recipe_id FROM "Recipes";',
    { type: QueryTypes.SELECT,  
    });


  const users = await queryInterface.sequelize.query(
    'SELECT user_id FROM "Users";',
    { type: QueryTypes.SELECT, 
    });

    await queryInterface.bulkInsert('Ratings', [{
        rating: 3.5,
        user_id: users[0].user_id,
        recipe_id: recipes[0].recipe_id
    }
  ])
};

export async function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete('Ratings', null, {});
}
