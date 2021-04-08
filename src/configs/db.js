const { Sequelize } = require("sequelize");
const { POSTGRES_DB } = require("./env");

let sequelize;
(async() => {
    try {
        sequelize = new Sequelize(POSTGRES_DB);
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