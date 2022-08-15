const joi = require("@hapi/joi");

const creatschema = joi.object({
  store_name: joi
    .string()
    .min(4)
    .required()
    .pattern(new RegExp("^[a-z]"))
    .messages({
      "string.pattern.base": `"username" should be a type of 'text'`,
      "string.min": `"username" minimum 4 `,
    }),
  password: joi
    .string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
    .required()
    .messages({
      "string.pattern.base": `"password" minimum 8 max 30`,
      "any.required": `"password"  must be  `,
    }),
  store_email: joi.string().email().required().messages({
    "any.required": `"phon" must have`,
  }),
  store_view: joi.required(),
  store_idcart: joi.number().required().messages({
    "string.email": `"email" must be an email`,
  }),
  store_number: joi.number(),

  remember: joi.string(),
});
// function start
const CosAmaShelZa = (data) => {
  return creatschema.validateAsync(data, { abortEarly: false });
};

module.exports.CosAmaShelZa = CosAmaShelZa;
