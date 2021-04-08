const Joi = require("joi");

require("dotenv").config();

const schema = Joi.object({
        NODE_ENV: Joi.string()
            .valid("development", "production", "test", "provision")
            .default("development"),
        PORT: Joi.number().required(),
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
    system_port: env.PORT,
    dbURL: env.DB_URL,
    host: env.HOST,
    port: env.DB_PORT,
    username: env.USERNAME,
    password: env.PASSWORD,
    database: env.DATABASE,
    secret: env.SECRET
};

module.exports = config;