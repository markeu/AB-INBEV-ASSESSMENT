const { DataTypes } = require("sequelize");

module.exports = (db) => {
    return db.define(
        "Users", {
            id: { type: DataTypes.UUID, primaryKey: true },
            name: { type: DataTypes.STRING, allowNull: false },
            email: { type: DataTypes.STRING, allowNull: false, unique: true },
            password: { type: DataTypes.STRING, allowNull: false },
        }, {
            timestamps: true,
            tableName: "Users",
        }
    );
};