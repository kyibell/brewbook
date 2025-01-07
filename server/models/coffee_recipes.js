'use strict';
import { Model } from 'sequelize';
import { Sequelize } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Coffee_Recipes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Coffee_Recipes.hasMany(models.Comment, {
        foreignKey: 'postId',
        as: 'comments',
        onDelete: 'CASCADE',
      });
      Coffee_Recipes.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'author',
        onDelete: 'CASCADE'
      });
    }
  }
  Coffee_Recipes.init({
    recipe_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
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
    author_id:{ 
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
    updatedAt:{
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  }, {
    sequelize,
    modelName: 'Coffee_Recipes',
  });
  return Coffee_Recipes;
};