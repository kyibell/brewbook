'use strict';
import { Model } from 'sequelize';
import { Sequelize } from '.';
import { toDefaultValue } from 'sequelize/lib/utils';
import bcrypt, { compare } from 'bcrypt';
import { useReducer } from 'react';

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
    async comparePassword(tryPassword) {
      return await bcrypt.compare(tryPassword, this.dataValues.password); // Added for Authorization Later
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
    unique: true
  },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      isEmail: true,
      validate: {
        isEmail: true
      },
      unique: true
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

  User.beforeSave(async (user, options) => {
    if (!user.changed('password')) return
    
    try {
      const hash = await bcrypt.hash(user.dataValues.password, saltRounds)
      user.password = hash;
    } catch (error) {
      console.error(error);
    }
  });
  
  return User;
};