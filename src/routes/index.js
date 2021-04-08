const { Router } = require("express");
const { response } = require("../helpers");
const interestRoutes = require("./record");
const userInterestRoutes = require('./user');

const routes = Router();

routes.use("/", interestRoutes);
routes.use("/", userInterestRoutes);

routes.use((_, res) => {
    response(res, { status: false, message: "Route not found" }, 404);
});

module.exports = routes;