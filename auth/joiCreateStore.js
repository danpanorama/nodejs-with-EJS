const joi = require("@hapi/joi");

const createSellerSchema = joi.object({ 
  store_name: joi.string().min(3).required().messages({
    "string.min": "username or password is unvalid",
  }),
  password: joi
    .string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
    .required()
    .messages({
      "string.pattern.base": "password must be min 8 max 30  and no simbuls",
    }),
  store_email: joi.string().email().required(),
  store_view: joi.string().required(),
  store_idcart: joi.number().required(),
  remember: joi.string(),
});
// function start
const createSellerSchemalogin = (data) => {
  return createSellerSchema.validateAsync(data, { abortEarly: false });
};

module.exports.createSellerSchemalogin = createSellerSchemalogin;
