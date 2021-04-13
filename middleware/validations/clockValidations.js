const joi = require("joi");
const { ValidationError } = require("../errors/errors");

const validateAddClock = async (req, res, next) => {
  try {
    let schema = joi.object().keys({
        employee: joi.string().required(),
        isClockedIn: joi.boolean().required(),
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
    validateAddClock
};
