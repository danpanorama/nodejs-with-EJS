const joi = require("@hapi/joi");

const creatschema = joi.object({
  client_fullName: joi
    .string()
    .min(4)
    .required()
    .pattern(new RegExp("^[a-z]"))
    .messages({
      "string.pattern.base": `"user name" must be a type of 'text'`,
      "string.min": `"user name " minimum 4  latters`,
    }),
  password: joi
    .string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
    .required()
    .messages({
      "string.pattern.base": `"password" minimum 8 max 30`,
      "any.required": `"password"  must have no symblus  `,
    }),
  client_phon: joi.number().required().messages({
    "any.required": `"phon" must have be type of number`,
  }),
  client_view: joi.required(),
  client_email: joi.string().email().required().messages({
    "string.email": `"email" must be an email`,
  }),
  remember: joi.string(),
});
// function start
const createAccount = (data) => {
  return creatschema.validateAsync(data, { abortEarly: false });
};

module.exports.createAccount = createAccount;
