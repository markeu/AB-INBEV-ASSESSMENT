const { Router } = require("express");
const { user } = require("../controllers");
const { validate } = require("../middlewares");
const { users } = require("../validators");

const routes = Router();

routes.post("/signup", validate(users.signup), user.createUser);
routes.post("/login", validate(users.signin), user.login);

module.exports = routes;