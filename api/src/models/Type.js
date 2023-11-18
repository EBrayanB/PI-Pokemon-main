const { DataTypes } = require("sequelize");


module.exports = (sequelize) => {
    sequelize.define("type", {
        ID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false;
        }
    });
};