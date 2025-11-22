'use strict';
const {  Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    // registrasi nama field model berdasarkan table 
    static associate(models) {
      // membuat relasi model Role ke model User
      Role.hasMany(models.User, {
        foreignKey: 'role_id',
        as: 'users'
      });

    }
  }
  Role.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'roles',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Role;
};