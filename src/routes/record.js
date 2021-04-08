const { Router } = require("express");
const { record } = require("../controllers");
const { validate, ensureLoggedInUser } = require("../middlewares");
const { records } = require("../validators");

const routes = Router();

routes.post("/calculate", ensureLoggedInUser, validate(records), record.calculate);

routes.get("/fetchRecords", ensureLoggedInUser, record.getRecords);

module.exports = routes;