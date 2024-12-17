'use strict';

import { QueryTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {

  const users = await queryInterface.sequelize.query(
    'SELECT user_id FROM "User";',
    { type: QueryTypes.SELECT,
});

  await queryInterface.bulkInsert('Comments', [{
      comment: 'This is a comment! I really like this recipe! This was very good when I had it this morning! <3',
      userId: users[0].user_id,
      createdAt: new Date()
    }
  ])
};


export async function down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete('Comments', null, {});
};
