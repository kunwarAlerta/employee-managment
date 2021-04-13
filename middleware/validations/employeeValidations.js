const joi = require("joi");
const { ValidationError } = require("../errors/errors");

const validateCreateEmployee = async (req, res, next) => {
  try {
    let schema = joi.object().keys({
      name: joi.string().required(),
      email: joi.string().required(),
      password: joi.string().required(),
      jobDescription:joi.string().required(),
      city:joi.string().required(),
      country:joi.string().required(),
      weeklyPerformance:joi.number().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      throw new ValidationError(error.details ? error.details[0].message : "");
    }
    next();
  } catch (error) {
    next(error);
  }
};

const validateLoginEmployee = async (req, res, next) => {
  try {
    let schema = joi.object().keys({
      email: joi.string().required(),
      password: joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      throw new ValidationError(error.details ? error.details[0].message : "");
    }
    next();
  } catch (error) {
    next(error);
  }
};



module.exports = {
  validateCreateEmployee,
  validateLoginEmployee
};
