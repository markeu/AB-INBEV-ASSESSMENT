const Joi = require("joi");

const { response } = require("../helpers");

module.exports = (obj) => {
  return (req, res, next) => {
    const schema = Joi.object().keys(obj).required().unknown(false);
    const value = req.method == "GET" ? req.query : req.body;
    const { error, value: vars } = schema.validate(value);

    if (error) {
      return response(res, { status: false, message: error.message });
    }

    req.form = vars;
    next();
  };
};
