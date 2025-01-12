'use strict';
import { Model, Sequelize, DataTypes } from 'sequelize'; // Combine imports
import bcrypt from 'bcrypt'; // Remove unused destructured `compare`


export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //define associations here
      User.hasMany(models.Coffee_Recipes, {
        foreignKey: 'user_id',
        as: 'recipes',
        onDelete: 'CASCADE', //  Updated in Supabase to change to Cascade
      });
      User.hasMany(models.Comment, {
        foreignKey: 'user_id',
        as: 'comments',
        onDelete: 'CASCADE',
      });
    } 
    async comparePassword(tryPassword) {
      return await bcrypt.compare(tryPassword, this.password); // Added for Authorization Later
    }
  }
  
  User.init({
    user_id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    username: {
    type: DataTypes.STRING, 
    allowNull: false,
    unique: true
  },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
      validate: {
        isEmail: true
      },
      unique: true
    },
    password: { 
      type: DataTypes.STRING,
      allowNull: false,
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
      defaultValue: Sequelize.NOW,
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'User',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: false,
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