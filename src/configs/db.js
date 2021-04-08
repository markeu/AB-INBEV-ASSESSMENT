const { Sequelize } = require("sequelize");
const { host, port, username, password, database } = require("./env");

let sequelize;
(async() => {
    try {
        sequelize = new Sequelize("postgres://qsvpdsst:tWr2Ruq0TIyMqA-GeRdA4SfrTtRROg9l@drona.db.elephantsql.com:5432/qsvpdsst");
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");

        let schemas = require("../models");

        for (let schema in schemas) {
            schemas[schema].sync({ alter: true });
        }
        console.log("Models Migrated");
    } catch (error) {
        console.error("Unable to connect to the database" + error);
    }
})();


module.exports = { sequelize };