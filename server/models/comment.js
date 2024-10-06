'use strict';
import { Model } from 'sequelize';
import { Sequelize } from '.'
export default (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'author'
      });
      
      Comment.belongsTo(models.Coffee_Recipes, {
        foreignKey: 'postId',
        as: 'comment'
      });
    }
  }
  Comment.init({
    postId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    comment: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    userId: { 
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'user_id'
      }
    },
    createdAt: {
      allownull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};