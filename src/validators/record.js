const Joi = require("joi");

module.exports = {
    shape: Joi.string().required(),
    dimension: Joi.required(),
};