const Joi = require("joi");
require("dotenv").config();

const schema = Joi.object({
        NODE_ENV: Joi.string()
            .valid("development", "production", "test", "provision")
            .default("development"),
        PORT: Joi.number().required(),
        POSTGRES_URL: Joi.string().required()
    })
    .unknown()
    .required();

const { error, value: env } = schema.validate(process.env);

if (error) {
    console.error(`Config validation error: ${error.message}`);
    return;
}

const config = {
    env: env.NODE_ENV,
    POSTGRES_DB: env.POSTGRES_URL,
    port: env.PORT,
    secret: env.SECRET
};

module.exports = config;