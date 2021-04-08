const { db: { sequelize } } = require("../configs")

module.exports = {
    Records: require("./records")(sequelize),
    Users: require("./user")(sequelize),
};