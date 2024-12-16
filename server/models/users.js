'use strict';
import { Model } from 'sequelize';
import { Sequelize } from '.';
import { toDefaultValue } from 'sequelize/lib/utils';
export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //define associations here
      User.hasMany(models.CoffeeRecipes, {
        foreignKey: 'user_id',
        as: 'recipes',
        onDelete: 'CASCADE',
      });
      User.hasMany(models.Comment, {
        foreignKey: 'user_id',
        as: 'comments',
        onDelete: 'CASCADE',
      });
    } 
  }
  User.init({
    user_id: { 
      type: Sequelize.UUID,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    username: {
    type: Sequelize.STRING, 
    allowNull: false,
  },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      isEmail: true,
      validate: {
        isEmail: true
      }
    },
    password: { 
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [6,23]
      }
    },
    profile_picture_url: { 
     type: Sequelize.STRING,
     allowNull: true
    },
    bio: { 
      type: Sequelize.TEXT,
      allowNull: true
    },
    createdAt:{ 
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users'
  });
  return User;
};