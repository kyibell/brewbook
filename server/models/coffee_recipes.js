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
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },

    name: { 
      type: DataTypes.STRING,
      allowNull: false
    
    },

    ingredients: { 
      type: DataTypes.TEXT,
      allowNull: false
    },

    instructions: { 
      type: DataTypes.TEXT,
      allowNull: false
    },

    imageUrl: { 
      type: DataTypes.STRING,
      allowNull: true
    },

    coffeeTags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    servings: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    prepTime: { 
      type: DataTypes.INTEGER,
    },
    rating: { 
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    author_id:{ 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'user_id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW 
    },
    updatedAt:{
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW
    }
  }, {
    sequelize,
    modelName: 'Coffee_Recipes',
  });
  return Coffee_Recipes;
};