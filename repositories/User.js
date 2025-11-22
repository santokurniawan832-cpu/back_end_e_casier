// memanggil class Data type untuk deklarasi dari field
const { DataTypes } = require("sequelize");

// memanggil class database.js
const sequelize = require('../config/database');

// mendefinisikan class User 
const User = sequelize.define(
    // User untuk nama class
    "User", { 
        // nama field yang dimiliki 
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
         password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
         role_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, 
    {
        tableName: "users", 
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscored: true
    }
)

// melakukan export modul class User
module.exports = User;