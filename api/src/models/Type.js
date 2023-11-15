const { DataTypes } = require("sequelize");
const sequelize = require("../db");

module.exports = (sequelize) => {
    sequelize.define("type", {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};