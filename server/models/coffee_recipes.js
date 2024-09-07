'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coffee_Recipes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Coffee_Recipes.init({
    recipe_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    ingredients: DataTypes.TEXT,
    instructions: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    coffeeTags: DataTypes.ARRAY,
    servings: DataTypes.INTEGER,
    prepTime: DataTypes.INTEGER,
    rating: DataTypes.FLOAT,
    author_id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Coffee_Recipes',
  });
  return Coffee_Recipes;
};