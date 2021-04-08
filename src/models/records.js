const { DataTypes } = require("sequelize");

module.exports = (db) => {
    return db.define(
        "Scores", {
            id: { type: DataTypes.UUID, primaryKey: true },
            shape: { type: DataTypes.STRING, allowNull: false },
            result: { type: DataTypes.FLOAT, allowNull: false },
            createBy: { type: DataTypes.STRING, allowNull: false },
        }, {
            timestamps: true,
            tableName: "Scores",
        }
    );
};