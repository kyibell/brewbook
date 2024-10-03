'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
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
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      primaryKey: true
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'user_id'
      }
    },
    createdAt: {
      allownull: false,
      type: sequelize.DATE,
      defaultValue: sequelize.NOW
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};