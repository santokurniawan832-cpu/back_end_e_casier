'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // mendefinisikan nama relasi table users ke table roles
      models.Role.hasMany(models.User, { foreignKey: 'role_id' });
      
      
      // mendefinisikan nama relasi table users ke table roles
      models.User.belongsTo(models.Role, { foreignKey: 'role_id' });
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,  // karena role_id nullable
      references: {
        model: 'roles',
        key: 'id',
      },
    },
    invitation_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },


  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};