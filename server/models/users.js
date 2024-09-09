'use strict';
const {
  Model
} = require('sequelize');
const { Sequelize } = require('.');
const { toDefaultValue } = require('sequelize/lib/utils');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    user_id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
    type: DataTypes.STRING, 
    allowNull: false
  },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    profile_picture_url: { 
     type: DataTypes.STRING,
     allowNull: true
    },
    bio: { 
      type: DataTypes.TEXT,
      allowNull: true
    },
    createdAt:{ 
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};