const Joi = require("joi");

const signup = {
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
};

const signin = {
    email: Joi.string().required(),
    password: Joi.string().required(),
};

module.exports = { signup, signin }