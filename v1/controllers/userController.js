const common = require("../../utils/common");
const statusCode = require("../../utils/statusCodes");
const messages = require("../../utils/messages");
const constants = require("../../utils/constants");
const sendRes = require("../../utils/response");
const { ValidationError } = require("../../middleware/errors/errors");
const userService = require("../services/userService");


async function login(req, res, next) {
  try {
    var sendObj = {};
    var user = await userService.search({
      email: req.body.email,
    });
    if (!user) throw new ValidationError(messages.INVALID_EMAIL_OR_PASSWORD);
    var loggedin = await common.comparePasswordHash(
      req.body.password,
      user.password
    );
    if (!loggedin) throw new ValidationError(messages.INVALID_EMAIL_OR_PASSWORD);
    var accesstoken = await common.jwtSign(user);
    sendObj.user = user;
    sendObj.accessToken = accesstoken;
    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.USER_SIGNED_IN_SUCCESSFULLY,
      sendObj
    );
  } catch (error) {
    next(error);
  }
    
}

async function register(req, res, next) {
  try {
    var sendObj = {};
    var exists = await userService.search({
      email: req.body.email,
    });
    if (exists) throw new ValidationError(messages.EMAIL_EXISTS);
    var password = await common.generatePasswordHash(req.body.password);
    req.body.password = password;
    var user = await userService.create(req.body);
    var accesstoken = await common.jwtSign(user);
    sendObj.user = user;
    sendObj.accessToken = accesstoken;
    sendRes(
      req,
      res,
      statusCode.SUCCESS,
      messages.USER_REGISTER_SUCCESSFULLY,
      sendObj
    );
  } catch (error) {
    next(error);
  }
}


module.exports.login = login;
module.exports.register = register;
