'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Ratings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ratings.belongsTo(models.Coffee_Recipes, {
          foreignKey: 'recipe_id',
          as: 'recipe_rating',
          onDelete: 'CASCADE',
      });

      Ratings.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'rater',
        onDelete: 'CASCADE',

      });
    }
  }
  Ratings.init({
    rating_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    rating: {
       type: DataTypes.FLOAT,
       allowNull: true,
       validate: {
        min: 0.0,
        max: 5.0
       }
    }, 
    user_id: { 
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'user_id'
      },
      onDelete: 'CASCADE'
    },
    recipe_id: { 
      type: DataTypes.INTEGER,
      references: {
        model: 'Coffee_Recipes',
        key: 'recipe_id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Ratings',
    tableName: 'Ratings'
  });
  return Ratings;
};