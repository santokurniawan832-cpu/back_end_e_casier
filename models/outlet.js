'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Outlet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // outllets dimiliki oleh users
      models.Outlet.belongsTo(models.User, {  foreignKey: 'user_id',  as: 'user' });

    }
  }
  Outlet.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,  // karena outlet nullable
      references: {
        model: 'users',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Outlet',
  });
  return Outlet;
};