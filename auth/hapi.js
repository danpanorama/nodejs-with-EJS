const joi = require("@hapi/joi");

const productSchema = joi.object({
  itemName: joi.string().required().messages({
    "string.required": `"name"`,
  }),
  itemDiscript: joi.string().min(20).max(100).required().messages({
    "string.min": "discription is minimum 20 letters",
    "string.max": "discription is maximum 100 letters",
  }),
  itemPrice: joi.number().required().min(0).max(100000000).messages({
    "string.required": `"price'`,
    "string.min": `"you dont whant to loose money right?'`,
    "string.max": `"you will not get rich from selling one thing'`,

  }),
  itemTopic: joi.string().required().messages({
    "string.required": `"topic'`,
  }),
  file: joi.string(),
});

const createProductSchema = (data) => {
  return productSchema.validateAsync(data, { abortEarly: false });
};

module.exports.createProductSchema = createProductSchema;
