const {DataTypes, Model} = require('sequelize');
const {sequelize} = require('../db');

class Sauce extends Model {}

Sauce.init({ 
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    image: DataTypes.STRING,
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    timestamps: false
});

module.exports = {Sauce};