const joi = require("@hapi/joi");

// login validation
const loginschema = joi.object({
  userNameLogin: joi.string().min(4).required().messages({
    "string.pattern": "username  is unvalid",
    "string.min": "username  is short",
  }),
  passwordLogin: joi
    .string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
    .required()
    .messages({
      "string.pattern.base": "password  is unvalid to the ruls",
    }),
  remember: joi.string(),
});
// function start
const loginvalidation = (data) => {
  return loginschema.validateAsync(data, { abortEarly: false });
};

module.exports.loginvalidation = loginvalidation;

// error(() => new Error('email must be an email'))
