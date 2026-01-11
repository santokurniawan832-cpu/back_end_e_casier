'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdditionRole extends Model {
    static associate(models) {
      // addition-role dimiliki oleh table roles
      models.AdditionRole.belongsTo(models.Role, {foreignKey: 'role_id', as: 'role'})
    }
  }
  AdditionRole.init({
    name: DataTypes.STRING,
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'roles',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'AdditionRole',
  });
  return AdditionRole;
};