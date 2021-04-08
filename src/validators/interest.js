const Joi = require("joi");

module.exports = {
    general: {
        title: Joi.string().required(),
        description: Joi.string().required(),
    },
};